const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary.js");
const upload = require("../middleware/multer.js");
const Image = require('../models/images.models.js');
const imagecount = 0;
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new image document with the secure_url
    const newImage = new Image({
        imageUrl: result.secure_url,
        count: imagecount
    });
    

    // Save the image document to the database
    await newImage.save();
    imagecount++;

    res.status(200).json({
      success: true,
      message: "Uploaded and saved to database!",
      data: newImage
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: "Error uploading to Cloudinary",
      error: error.message
    });
  }
});

module.exports = router;