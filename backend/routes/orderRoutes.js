const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getUserOrders);
router.get('/:id', authenticate, getOrderById);

module.exports = router;
