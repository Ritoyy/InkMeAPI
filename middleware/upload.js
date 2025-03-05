const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config(); // Load environment variables
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});


// File filter for images & PDFs
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") || // Allow images
    file.mimetype === "application/pdf" // Allow PDFs
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files and PDFs are allowed!"), false);
  }
};

// Create upload middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
