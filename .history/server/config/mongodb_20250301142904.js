import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.connection.o
    await mongoose.connect(`${process.env.MONGODB_URL}/RevoPix`)
}