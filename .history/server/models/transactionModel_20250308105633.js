import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user
})

const transactionModel = mongoose.model.transaction || mongoose.model("transaction", transactionSchema)

export default transactionModel;