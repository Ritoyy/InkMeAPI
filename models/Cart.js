const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      designedproduct_id: { type: mongoose.Schema.Types.ObjectId, ref: "DesignedProduct" },
      amount: Number,
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);