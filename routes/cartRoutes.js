const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Add items to cart
router.post("/", async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.body.user_id });

    if (cart) {
      req.body.items.forEach(newItem => {
        const existingItem = cart.items.find(item => 
          item.designedproduct_id.toString() === newItem.designedproduct_id
        );

        if (existingItem) {
          existingItem.amount += newItem.amount; // Update quantity
        } else {
          cart.items.push(newItem); // Add new item
        }
      });
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
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    req.body.items.forEach(updatedItem => {
      const item = cart.items.find(i => i.designedproduct_id.toString() === updatedItem.designedproduct_id);
      if (item) {
        item.amount = updatedItem.amount; // Only update amount
      }
    });

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Remove an item from cart
router.delete("/:cartId/item/:productId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(item => item.designedproduct_id.toString() !== req.params.productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete cart
router.delete("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.cartId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
