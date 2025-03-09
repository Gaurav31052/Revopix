import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {type:S}
})

const transactionModel = mongoose.model.transaction || mongoose.model("transaction", transactionSchema)

export default transactionModel;