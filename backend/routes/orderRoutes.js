const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getUserOrders);
router.get('/:id', authenticate, getOrderById);
router.get('/admin/all', authenticate, isAdmin, getAllOrders);
router.put('/admin/:id', authenticate, isAdmin, updateOrderStatus);

module.exports = router;
