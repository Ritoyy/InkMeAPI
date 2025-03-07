const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  lvl1_price: Number,
  lvl2_price: Number,
  lvl3_price: Number,
  color: String,
  category: String ,
  file: String, // Stores the image filename
});

module.exports = mongoose.model("Product", productSchema);
