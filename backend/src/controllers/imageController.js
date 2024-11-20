const path = require("path");
const { spawn } = require("child_process");

const uploadImage = async (req, res) => {
  const { qrCode } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const imagePath = path.join(__dirname, '..', 'uploads', file.filename);

    
    const pythonProcess = spawn('python', ['src/scripts/conditionScoring.py', imagePath]);

    pythonProcess.stdout.on('data', (data) => {
      const score = data.toString().trim();
      res.status(200).json({
        qrCode,
        score: parseInt(score, 10),
        message: 'Condition scoring completed',
      });
    });

    pythonProcess.stderr.on('data', (error) => {
      console.error('Error from Python script:', error.toString());
      res.status(500).json({ message: 'Error in condition scoring', error: error.toString() });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
};

module.exports = { uploadImage };
