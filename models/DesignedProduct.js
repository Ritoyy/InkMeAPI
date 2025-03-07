const mongoose = require("mongoose");

const DesignedProductSchema = new mongoose.Schema({
  design_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Design", // Reference to the Design model
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model("DesignedProduct", DesignedProductSchema);
