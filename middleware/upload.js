const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdfs/"); // Save PDFs in 'uploads/pdfs'
    } else {
      cb(null, "uploads/products/"); // Save images in 'uploads/products'
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
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
