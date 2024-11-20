const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const { log } = require('console');
const image = require('./models/images.models.js')
const imageUploader = require('./controller/imageUpload.js')
dotenv.config()
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8000;

if (!uri) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});

// Use the imageUploader router for /imageupload endpoint
app.use('/imageupload', imageUploader);

// Route to get image by count
app.get('/getimage/:count', async (req, res) => {
  try {
    const count = parseInt(req.params.count, 10);
    const image = await Image.findOne({ count: count });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    res.status(200).json({
      success: true,
      data: image
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching image",
      error: error.message
    });
  }
});

module.exports = app;