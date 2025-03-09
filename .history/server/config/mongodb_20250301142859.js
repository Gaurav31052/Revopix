import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.conn
    await mongoose.connect(`${process.env.MONGODB_URL}/RevoPix`)
}