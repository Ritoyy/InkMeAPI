const express = require("express");
const DesignedProduct = require("../models/DesignedProduct");

const router = express.Router();

// Create a new designed product
router.post("/", async (req, res) => {
    try {
      const designedProduct = new DesignedProduct(req.body);
      await designedProduct.save();
      res.status(201).json(designedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get a designed product by ID
router.get("/:designedProductId", async (req, res) => {
    try {
      const designedProduct = await DesignedProduct.findById(req.params.designedProductId).populate("design_id").populate("product_id");
      if (!designedProduct) return res.status(404).json({ error: "Designed product not found" });
      res.json(designedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update a designed product by ID
router.put("/:designedProductId", async (req, res) => {
    try {
      const updatedDesignedProduct = await DesignedProduct.findByIdAndUpdate(req.params.designedProductId, req.body, { new: true });
      if (!updatedDesignedProduct) return res.status(404).json({ error: "Designed product not found" });
      res.json(updatedDesignedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a designed product by ID
router.delete("/:designedProductId", async (req, res) => {
    try {
      const deletedDesignedProduct = await DesignedProduct.findByIdAndDelete(req.params.designedProductId);
      if (!deletedDesignedProduct) return res.status(404).json({ error: "Designed product not found" });
      res.json({ message: "Designed product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all designed products
router.get("/", async (req, res) => {
    try {
      const designedProducts = await DesignedProduct.find().populate("design_id").populate("product_id");
      res.json(designedProducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;