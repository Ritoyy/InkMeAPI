const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  type: String,
  name: String,
  lvl1_price: Number,
  lvl2_price: Number,
  lvl3_price: Number,
  color: String,
  text: String,
  text_color: String,
  category: String,
  id_design: { type: mongoose.Schema.Types.ObjectId, ref: "Design" },
  file: String, // Stores the image filename
});

module.exports = mongoose.model("Product", productSchema);
