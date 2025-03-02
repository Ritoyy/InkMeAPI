const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      amount: Number,
    }
  ],
  total: Number,
  deliveryCost: Number,
  deliveryAddress: Object,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" }
});

module.exports = mongoose.model("Order", orderSchema);
