const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bagId: { type: mongoose.Schema.Types.ObjectId, ref: "Bag", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Processed", "Failed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Refund = mongoose.model("Refund", refundSchema);
module.exports = Refund;
