const express = require("express");
const Design = require("../models/Design");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { user_id, name, isApproved, text, text_color } = req.body;
    const file = req.file ? req.file.path : null; // Cloudinary URL

    const newDesign = new Design({
      user_id,
      name,
      isApproved: isApproved || false,
      file, // Store Cloudinary URL
      text,
      text_color
    });

    await newDesign.save();
    res.status(201).json(newDesign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all designs
router.get("/", async (req, res) => {
    try {
      const designs = await Design.find().populate("user_id");
      res.json(designs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a design by ID
  router.get("/:designId", async (req, res) => {
    try {
      const design = await Design.findById(req.params.designId).populate("user_id");
      if (!design) return res.status(404).json({ error: "Design not found" });
      res.json(design);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a design by ID
  router.put("/:designId", async (req, res) => {
    try {
      const updatedDesign = await Design.findByIdAndUpdate(req.params.designId, req.body, { new: true });
      if (!updatedDesign) return res.status(404).json({ error: "Design not found" });
      res.json(updatedDesign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a design by ID
  router.delete("/:designId", async (req, res) => {
    try {
      const deletedDesign = await Design.findByIdAndDelete(req.params.designId);
      if (!deletedDesign) return res.status(404).json({ error: "Design not found" });
      res.json({ message: "Design deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
