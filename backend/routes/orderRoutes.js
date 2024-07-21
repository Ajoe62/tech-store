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
const cache = require('../middleware/cacheMiddleware');

router.post('/', authenticate, createOrder);
router.get('/', cache(300), authenticate, getUserOrders);
router.get('/:id', cache(300), authenticate, getOrderById);
router.get('/admin/all', cache(300), authenticate, isAdmin, getAllOrders);
router.put('/admin/:id', authenticate, isAdmin, updateOrderStatus);

module.exports = router;
