# Revopix Backend Documentation

This document describes the current backend implementation in the `server` folder.

## Overview

The backend is an Express.js API using MongoDB through Mongoose. It handles:

- User registration, email verification, login, and credit lookup
- Razorpay order creation and payment verification
- Text-to-image generation through Clipdrop
- Image background removal through Clipdrop

Default local port: `4000`

Base URL in local development:

```text
http://localhost:4000
```

## Project Structure

```text
server/
  config/
    mongodb.js
  controllers/
    imageController.js
    userController.js
  middlewares/
    auth.js
  models/
    transactionModel.js
    userModel.js
  routes/
    imageRoutes.js
    userRoutes.js
  package.json
  server.js
```

## Run Commands

Install dependencies:

```bash
npm install
```

Start production server:

```bash
npm start
```

Start development server with nodemon:

```bash
npm run server
```

## Environment Variables

The backend reads these variables from `.env` through `dotenv/config`:

| Variable | Purpose |
| --- | --- |
| `PORT` | Optional server port. Defaults to `4000`. |
| `MONGODB_URL` | MongoDB connection base URL. The app appends `/RevoPix`. |
| `JWT_SECRET` | Secret used to sign and verify JWT tokens. |
| `EMAIL_USER` | Gmail address used by Nodemailer for verification emails. |
| `EMAIL_PASS` | Gmail app password or SMTP password used by Nodemailer. |
| `RAZORPAY_KEY_ID` | Razorpay API key ID. |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret. |
| `CURRENCY` | Currency used for Razorpay orders, for example `INR`. |
| `CLIPDROP_API` | Clipdrop API key used for image generation and background removal. |

## Server Setup

Defined in `server.js`.

- Uses `express.json()` for JSON request bodies.
- Uses `cors()` with default settings.
- Connects to MongoDB before registering middleware.
- Sets DNS servers to `1.1.1.1` and `8.8.8.8`.
- Mounts user routes at `/api/user`.
- Mounts image routes at `/api/image`.

Health/root endpoint:

```http
GET /
```

Response:

```text
ApI Working
```

## Authentication

Protected routes use `middlewares/auth.js`.

Clients must send the JWT token in a custom request header named `token`.

Example:

```http
token: <jwt>
```

The middleware verifies the token using `JWT_SECRET`. If valid, it injects the decoded user id into:

```js
req.body.userId
```

Auth failure responses:

```json
{ "success": false, "message": "Please first login" }
```

```json
{ "success": false, "message": "No authorized login again" }
```

```json
{ "success": false, "message": "<jwt error message>" }
```

## Data Models

### User

Mongoose model: `user`

Source: `models/userModel.js`

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | String | Yes | - | User full name. |
| `email` | String | Yes | - | Unique email address. |
| `password` | String | Yes | - | Stored as bcrypt hash. |
| `creditBalance` | Number | No | `5` | Credits available for image operations. |
| `isVerified` | Boolean | No | `false` | Email verification status. |
| `verificationToken` | String | No | - | JWT token used for email verification. |

### Transaction

Mongoose model: `transaction`

Source: `models/transactionModel.js`

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | String | Yes | - | User id as a string. |
| `plan` | String | Yes | - | Selected plan name. |
| `amount` | Number | Yes | - | Amount before multiplying by 100 for Razorpay. |
| `credits` | Number | Yes | - | Credits to add after successful payment. |
| `payment` | Boolean | No | `false` | Set to `true` after payment verification. |
| `date` | Number | No | - | `Date.now()` timestamp. |

## API Routes

### Register User

```http
POST /api/user/register
```

Creates a user, stores a hashed password, generates a 1-day email verification token, saves the user, and sends a verification email.

Request body:

```json
{
  "name": "Gaurav",
  "email": "gaurav@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "success": true,
  "message": "Verification email sent. Please check your inbox."
}
```

Possible failure responses:

```json
{ "message": "Please fill in all fields" }
```

```json
{ "success": false, "message": "User already exists" }
```

```json
{ "success": false, "message": "Something went wrong" }
```

Notes:

- The verification email currently points to `https://revopix-backend.onrender.com/api/user/verify/:token`.
- This endpoint does not currently return a login token, even though the frontend signup flow appears to expect one.

### Verify User Email

```http
GET /api/user/verify/:token
```

Verifies an email verification token. If valid, it marks the user as verified and clears `verificationToken`.

Path params:

| Param | Description |
| --- | --- |
| `token` | Verification JWT generated during registration. |

Success response:

```json
{
  "success": true,
  "message": "Email verified successfully. You can now log in."
}
```

Possible failure responses:

```json
{ "message": "Invalid token" }
```

```json
{ "success": false, "message": "Invalid or expired token" }
```

### Login User

```http
POST /api/user/login
```

Logs in a verified user and returns a JWT token.

Request body:

```json
{
  "email": "gaurav@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "success": true,
  "token": "<jwt>",
  "name": "Gaurav"
}
```

Possible failure responses:

```json
{
  "success": false,
  "message": "Please verify your email before logging in."
}
```

```json
{ "success": false, "message": "Invalid credentials" }
```

```json
{ "success": false, "message": "<error message>" }
```

Notes:

- The token payload is `{ id: user._id }`.
- If no user exists for the supplied email, the current code can throw before password comparison because it reads `user.isVerified`.

### Get User Credits

```http
GET /api/user/credits
```

Protected: yes

Returns the authenticated user's credit balance and name.

Headers:

```http
token: <jwt>
```

Success response:

```json
{
  "success": true,
  "credits": 5,
  "name": "Gaurav"
}
```

Possible failure response:

```json
{ "success": false, "message": "<error message>" }
```

### Create Razorpay Order

```http
POST /api/user/pay-razor
```

Protected: yes

Creates a local transaction record and a Razorpay order.

Headers:

```http
token: <jwt>
```

Request body:

```json
{
  "planId": "Basic"
}
```

Supported plans:

| `planId` | Credits | Amount |
| --- | ---: | ---: |
| `Basic` | 20 | 10 |
| `Advanced` | 110 | 50 |
| `Business` | 300 | 100 |

Success response:

```json
{
  "success": true,
  "order": {
    "id": "order_xxxxx",
    "entity": "order",
    "amount": 1000,
    "amount_paid": 0,
    "amount_due": 1000,
    "currency": "INR",
    "receipt": "<transactionId>",
    "status": "created"
  }
}
```

The exact `order` object is returned by Razorpay and may include more fields.

Possible failure responses:

```json
{ "success": false, "message": "Missing Details" }
```

```json
{ "success": false, "message": "Plan not found" }
```

```json
{ "success": false, "message": "<razorpay error>" }
```

```json
{ "success": false, "message": "<error message>" }
```

Notes:

- `userId` is injected by auth middleware.
- The `amount` sent to Razorpay is `amount * 100`.
- The Razorpay order `receipt` is the MongoDB transaction id.

### Verify Razorpay Payment

```http
POST /api/user/verify-razor
```

Protected: yes

Fetches the Razorpay order and, if it is paid, adds credits to the user and marks the transaction as paid.

Headers:

```http
token: <jwt>
```

Request body:

```json
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature"
}
```

Only `razorpay_order_id` is used by the current backend code.

Success response:

```json
{
  "success": true,
  "message": "Credits Added"
}
```

Possible failure responses:

```json
{ "success": false, "message": "Payment Failed" }
```

```json
{ "success": false, "message": "<error message>" }
```

Notes:

- The code checks `orderInfo.status === "paid"`.
- The code does not currently verify `razorpay_signature`.
- If the transaction is already marked as paid, it returns `Payment Failed`.

### Generate Image

```http
POST /api/image/generate-image
```

Protected: yes

Generates an image from a text prompt using Clipdrop's text-to-image API. On success, deducts 1 credit.

Headers:

```http
token: <jwt>
Content-Type: application/json
```

Request body:

```json
{
  "prompt": "A futuristic city at sunset"
}
```

Success response:

```json
{
  "success": true,
  "message": "Image Generated",
  "creditBalance": 4,
  "resultImage": "data:image/png;base64,<base64 image>"
}
```

Possible failure responses:

```json
{ "success": false, "message": "missing details" }
```

```json
{
  "success": false,
  "message": "insufficient credit balance",
  "creditBalance": 0
}
```

```json
{ "success": false, "message": "<error message>" }
```

Notes:

- External API: `https://clipdrop-api.co/text-to-image/v1`
- The prompt is sent as multipart form data to Clipdrop.
- The response image is converted to a PNG data URL.

### Remove Image Background

```http
POST /api/image/remove-background
```

Protected: yes

Removes the background from an uploaded image using Clipdrop. On success, deducts 1 credit.

Headers:

```http
token: <jwt>
Content-Type: multipart/form-data
```

Form data:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | File | Yes | Image file to process. |

Success response:

```json
{
  "success": true,
  "message": "Background Removed",
  "creditBalance": 4,
  "resultImage": "data:image/png;base64,<base64 image>"
}
```

Possible failure responses:

```json
{ "success": false, "message": "missing details" }
```

```json
{
  "success": false,
  "message": "insufficient credit balance",
  "creditBalance": 0
}
```

```json
{ "success": false, "message": "<error message>" }
```

Notes:

- External API: `https://clipdrop-api.co/remove-background/v1`
- Upload middleware: `multer.memoryStorage()`
- The backend expects the uploaded file at `req.file`.
- The file is forwarded to Clipdrop as `image_file`.
- The response image is converted to a PNG data URL.

## External Services

### MongoDB

Connection is defined in `config/mongodb.js`.

```js
mongoose.connect(`${process.env.MONGODB_URL}/RevoPix`)
```

The database name is fixed as `RevoPix`.

### Gmail / Nodemailer

Registration sends a verification email using Gmail service auth.

Required variables:

- `EMAIL_USER`
- `EMAIL_PASS`

### Razorpay

Used for credit purchases.

Required variables:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `CURRENCY`

### Clipdrop

Used for image generation and background removal.

Required variable:

- `CLIPDROP_API`

## Current Behavior Notes

- Most error responses return HTTP 200 with `success: false`; `verify/:token` can return HTTP 400 for an invalid token, and `remove-background` returns HTTP 400 in its catch block.
- Protected routes require a custom `token` header instead of the standard `Authorization: Bearer <token>` format.
- Auth middleware writes `userId` into `req.body`, including for `GET /api/user/credits`.
- `POST /api/user/register` sends an email verification message and does not return a JWT token.
- `POST /api/user/login` may throw if the email does not match a user because it checks `user.isVerified` before confirming `user` exists.
- `POST /api/user/verify-razor` does not currently validate the Razorpay signature.
- `POST /api/image/remove-background` logs the uploaded image buffer to the console.
- `@imagekit/nodejs` is installed but is not used in the current server source.

