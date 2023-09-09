import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    amount: { type: Number, required: true, unique: true },
    walletAddress: { type: String, required: true },
    status: { type: String, default: "Pending", required: false },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
