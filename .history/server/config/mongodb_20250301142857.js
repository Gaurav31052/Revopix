import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.
    await mongoose.connect(`${process.env.MONGODB_URL}/RevoPix`)
}