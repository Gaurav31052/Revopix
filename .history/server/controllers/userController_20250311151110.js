import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const registerUser = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({message: "Please fill in all fields"});
        }
        // const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,10)

         // Generate verification token
         const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

         const userData = new userModel({
             name,
             email,
             password: hashedPassword,
             verificationToken,
         });

        const newUser = new userModel(userData);
        const user = await newUser.save()

        const verificationLink = `http://localhost:5000/api/user/verify/${verificationToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `<h2>Hello ${name},</h2>
                   <p>Click the link below to verify your email:</p>
                   <a href="${verificationLink}">Verify Email</a>`,
        });


        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success: true, token , user: {name: user.name}, message: "Verification email sent. Please check your inbox."})

    } catch(error){
        console.log(error);
        res.json({success: false, message: "User already exist"})
    }
}

const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ email: decoded.email });
        if (!user) return res.status(400).json({ message: "Invalid token" });

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.json({ success: true, message: "Email verified successfully. You can now log in." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid or expired token" });
    }
};


const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if (!user.isVerified) {
            return res.json({ success: false, message: "Please verify your email before logging in." });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success: true, token: token , name: user.name})
        }
        else{
            return res.json({success: false, message: 'Invalid credentials'})
        }


    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const userCredits = async (req, res)=>{
    try {
        const {userId} = req.body

        const user = await userModel.findById(userId)
        res.json({success : true, credits: user.creditBalance, name: user.name})


    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET

});


const paymentRazorpay = async(req,res)=>{
    try {
        const {userId, planId} = req.body;
        const userData = await userModel.findById(userId);
        
        if(!userId || !planId){
            return res.json({success:false, message:"Missing Details"})
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 20
                amount = 10
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits = 110
                amount = 50
                break;
            case 'Business':
                plan = 'Business'
                credits = 300
                amount = 100
                break;
                
                
        
            default:
                return res.json({success: false, message: "Plan not found"});
        }

        date = Date.now();

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        })


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const verifyRazorPay = async(req,res)=>{
    try {
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success:false, message: 'Payment Failed'})
        }
        const userData = await userModel.findById(transactionData.userId)

        const creditBalance = userData.creditBalance + transactionData.credits
        await userModel.findByIdAndUpdate(userData._id, {creditBalance})

        await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})

        res.json({success: true, message: 'Credits Added'})
    }
        else{
            res.json({success: false, message: 'Payment Failed'})
        }
    }
     catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}




export {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorPay, verifyUser}