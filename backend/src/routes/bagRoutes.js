const express = require("express");
const { addBag, updateBagStatus, getBagLifecycle, addLifecycleEvent } = require("../controllers/bagController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/add",authMiddleware,addBag);
router.put("/update",authMiddleware,updateBagStatus);
router.post("/lifecycle/add",authMiddleware,addLifecycleEvent);
router.get("/:qrcode/lifecycle",authMiddleware,getBagLifecycle);

module.exports = router;