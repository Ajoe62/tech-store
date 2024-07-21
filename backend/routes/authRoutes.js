const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const cache = require('../middleware/cacheMiddleware');
const redisClient = require('../utils/redis');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticate, cache(500), authController.getProfile);

router.put('/profile', authenticate, async (req, res) => {
  try {
    await authController.updateProfile(req, res);
    const userId = req.user.id;
    const cacheKey = `user:${userId}:profile`;
    await redisClient.del(cacheKey);
    res.json({ message: 'Profile updated and cache cleared' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating profile' });
  }
});

router.get('/test-cache', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `user:${userId}:profile`;
    
    const cachedValue = await redisClient.get(cacheKey);
    if (cachedValue) {
      res.json({ message: 'Data from cache', data: JSON.parse(cachedValue) });
    } else {
      res.json({ message: 'No cached data found' });
    }
  } catch (error) {
    console.error('Error in test-cache route:', error);
    res.status(500).json({ error: 'An error occurred while testing cache' });
  }
});

router.get('/test-redis-set', async (req, res) => {
    console.log('Test Redis Set route called')
    try {
      await redisClient.set('test-key', 'test-value', 'EX', 60); // Set for 60 seconds
      console.log('Test key set in Redis');
      const keys = await redisClient.keys('*');
      console.log('All keys in Redis:', keys);
      res.json({ message: 'Test key set in Redis', keys });
    } catch (error) {
      console.error('Error setting test key in Redis:', error);
      res.status(500).json({ error: 'Failed to set test key in Redis' });
    }
  });

router.post('/clear-cache', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `user:${userId}:profile`;
    await redisClient.del(cacheKey);
    res.json({ message: 'Cache cleared successfully' });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({ error: 'An error occurred while clearing cache' });
  }
});

module.exports = router