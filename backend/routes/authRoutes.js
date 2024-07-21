const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const cache = require('../middleware/cacheMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticate, cache(500), authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);

module.exports = router;
