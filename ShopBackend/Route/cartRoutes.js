const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../Controller/cartController');
const { authMiddleware } = require('../Middleware/authMiddleware');

// All cart routes require authentication
router.use(authMiddleware);

// GET /api/cart - Get user's cart
router.get('/', getCart);

// POST /api/cart/add - Add item to cart
router.post('/add', addToCart);

// PUT /api/cart/update/:productId - Update item quantity
router.put('/update/:productId', updateCartItem);

// DELETE /api/cart/remove/:productId - Remove item from cart
router.delete('/remove/:productId', removeFromCart);

// DELETE /api/cart/clear - Clear cart
router.delete('/clear', clearCart);

module.exports = router;