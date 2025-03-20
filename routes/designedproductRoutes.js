const express = require("express");
const router = express.Router();
const DesignedProduct = require("../models/DesignedProduct");

router.post("/", async (req, res) => {
  try {
    const { design_id, product_id, isPublic } = req.body;

    if (!design_id || !product_id) {
      return res.status(400).json({ error: "design_id and product_id are required" });
    }

    const newDesignedProduct = new DesignedProduct({ design_id, product_id, isPublic });
    await newDesignedProduct.save();
    res.status(201).json(newDesignedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const designedProducts = await DesignedProduct.find().populate("design_id product_id");
    res.json(designedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const designedProducts = await DesignedProduct.find()
      .populate({
        path: "design_id",
        match: { name: { $regex: query, $options: "i" } },
      })
      .populate("product_id")
      .lean();

    const filteredProducts = designedProducts.filter(dp => dp.design_id);

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error searching designs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const designedProduct = await DesignedProduct.findById(req.params.id).populate("design_id product_id");
    if (!designedProduct) return res.status(404).json({ error: "DesignedProduct not found" });

    res.json(designedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedDesignedProduct = await DesignedProduct.findByIdAndDelete(req.params.id);
    if (!deletedDesignedProduct) return res.status(404).json({ error: "DesignedProduct not found" });

    res.json({ message: "DesignedProduct deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const { design_id, product_id } = req.body;
  
      if (!design_id || !product_id) {
        return res.status(400).json({ error: "design_id and product_id are required" });
      }
  
      const updatedDesignedProduct = await DesignedProduct.findByIdAndUpdate(
        req.params.id,
        { design_id, product_id },
        { new: true, runValidators: true }
      ).populate("design_id product_id");
  
      if (!updatedDesignedProduct) {
        return res.status(404).json({ error: "DesignedProduct not found" });
      }
  
      res.json(updatedDesignedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
