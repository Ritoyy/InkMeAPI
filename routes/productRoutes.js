const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, description, lvl1_price, lvl2_price, lvl3_price, color, category } = req.body; 
    const file = req.file ? req.file.path : null; // Cloudinary URL

    const newProduct = new Product({
      name,
      description,
      lvl1_price,
      lvl2_price,
      lvl3_price,
      color,
      category,
      file, // Store Cloudinary URL
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET - Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get a product by ID
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update a product by ID
router.put("/:productId", upload.single("file"), async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) updatedData.file = req.file.filename;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, updatedData, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Remove a product by ID
router.delete("/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
