const mongoose = require("mongoose");

const designedproductSchema = new mongoose.Schema({
  design_id: { type: mongoose.Schema.Types.ObjectId, ref: "Design" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("DesignedProduct", designedproductSchema);