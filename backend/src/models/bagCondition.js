const mongoose = require("mongoose");

const bagConditionSchema = new mongoose.Schema({
  qrCode: { type: String, required: true, unique: true },
  score: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Reusable', 'Not Reusable', 'Refunded'], default: 'Reusable' },
  createdAt: { type: Date, default: Date.now }
});

const BagCondition = mongoose.model('BagCondition', bagConditionSchema);

module.exports = BagCondition;
