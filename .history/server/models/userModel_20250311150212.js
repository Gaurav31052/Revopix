import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true},
    creditBalance: {type: Number, default:5},
    isVerified: { type: Boolean, default: false },  // New field
    verificationToken: { type: String },  // New field
})

const userModel = mongoose.model.user || mongoose.model("user", userSchema)

export default userModel;