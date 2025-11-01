const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../Controller/productController');
const { authMiddleware, adminMiddleware } = require('../Middleware/authMiddleware');

// GET /api/products - Get all products (public)
router.get('/', getAllProducts);

// GET /api/products/:id - Get single product (public)
router.get('/:id', getProductById);

// POST /api/products - Create product (admin only)
router.post('/', authMiddleware, adminMiddleware, createProduct);

// PUT /api/products/:id - Update product (admin only)
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);

// DELETE /api/products/:id - Delete product (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;