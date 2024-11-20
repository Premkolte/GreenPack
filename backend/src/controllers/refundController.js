const Refund = require("../models/refund");
const Bag = require("../models/bag");
const User = require("../models/user");

const calculateRefund = async (req, res) => {
  const { qrcode } = req.body;

  try {
    const bag = await Bag.findOne({ qrcode });
    if (!bag) {
      return res.status(404).json({ message: "Bag not found" });
    }

    const baseRefundAmount = 100; // Set base amount for a perfect condition bag.
    const deductionPerConditionPoint = 1; // Deduction per condition point lost.
    const refundAmount = Math.max(baseRefundAmount - (100 - bag.conditionScore) * deductionPerConditionPoint, 0);

    res.status(200).json({ qrcode, refundAmount, message: "Refund calculated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error calculating refund", error });
  }
};

const initiateRefund = async (req, res) => {
  const { qrcode, userId } = req.body;

  try {
    const bag = await Bag.findOne({ qrcode });
    if (!bag) {
      return res.status(404).json({ message: "Bag not found" });
    }

    const refund = await Refund.create({
      userId,
      bagId: bag._id,
      amount: Math.max(100 - (100 - bag.conditionScore), 0), // Adjusted refund logic,
    });

    res.status(201).json({ message: "Refund initiated successfully", refund });
  } catch (error) {
    res.status(500).json({ message: "Error initiating refund", error });
  }
};


const getRefundHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const refunds = await Refund.find({ userId }).populate("bagId", "qrcode").sort({ createdAt: -1 });
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching refund history", error });
  }
};

module.exports = { calculateRefund, initiateRefund, getRefundHistory };
