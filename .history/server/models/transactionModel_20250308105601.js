import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    
})

const transactionModel = mongoose.model.transaction || mongoose.model("transaction", transactionSchema)

export default transactionModel;