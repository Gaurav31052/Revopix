import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {type:String, required: true},
    userId: {type:String, required: true},
})

const transactionModel = mongoose.model.transaction || mongoose.model("transaction", transactionSchema)

export default transactionModel;