const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { uploadImage } = require('../controllers/imageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/upload", authMiddleware,upload.single('image'), uploadImage);

module.exports = router;
