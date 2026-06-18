import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import dns from 'dns'

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

const PORT = process.env.PORT || 4000
const app = express()
await connectDB();



app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res)=> res.send("ApI Working"))

app.listen(PORT, ()=> console.log("server running on PORT " + PORT))