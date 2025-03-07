const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Add items to cart
router.post("/", async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.body.user_id });

    if (cart) {
      cart.items.push(...req.body.items);
    } else {
      cart = new Cart(req.body);
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cart by user ID
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.userId }).populate("items.designedproduct_id");
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart (modify items)
router.put("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cartId, req.body, { new: true });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove an item from cart
router.put("/:cartId/remove", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(item => item.designedproduct_id.toString() !== req.body.designedproduct_id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete cart
router.delete("/:cartId", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
