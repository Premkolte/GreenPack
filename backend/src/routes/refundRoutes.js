const express = require("express");
const { calculateRefund, initiateRefund, getRefundHistory } = require("../controllers/refundController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/calculate", authMiddleware, calculateRefund);
router.post("/initiate", authMiddleware, initiateRefund);
router.get("/history/:userId", authMiddleware, getRefundHistory);

module.exports = router;
