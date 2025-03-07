const express = require("express");
const router = express.Router();
const DesignedProduct = require("../models/DesignedProduct");

// ✅ Create a new DesignedProduct
router.post("/", async (req, res) => {
  try {
    const { design_id, product_id } = req.body;

    if (!design_id || !product_id) {
      return res.status(400).json({ error: "design_id and product_id are required" });
    }

    const newDesignedProduct = new DesignedProduct({ design_id, product_id });
    await newDesignedProduct.save();

    res.status(201).json(newDesignedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all DesignedProducts
router.get("/", async (req, res) => {
  try {
    const designedProducts = await DesignedProduct.find().populate("design_id product_id");
    res.json(designedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single DesignedProduct by ID
router.get("/:id", async (req, res) => {
  try {
    const designedProduct = await DesignedProduct.findById(req.params.id).populate("design_id product_id");
    if (!designedProduct) return res.status(404).json({ error: "DesignedProduct not found" });

    res.json(designedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a DesignedProduct by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDesignedProduct = await DesignedProduct.findByIdAndDelete(req.params.id);
    if (!deletedDesignedProduct) return res.status(404).json({ error: "DesignedProduct not found" });

    res.json({ message: "DesignedProduct deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
