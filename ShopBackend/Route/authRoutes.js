const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../Controller/authController');
const { authMiddleware } = require('../Middleware/authMiddleware.js');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;