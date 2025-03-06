const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      amount: Number,
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);