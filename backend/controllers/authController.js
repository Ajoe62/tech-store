const { User } = require('../models');
const bcrypt = require('bcrypt');
const redisClient = require('../utils/redis');
const { generateToken } = require('../utils/validator');

exports.register = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || 'user',
    });

    const token = generateToken(user);
    if (role === 'admin') {
      return res.status(201).json({ token, role });
    }
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    if (user.role === 'admin') {
      return res.status(200).json({ token, role: user.role });
    }
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `user:${userId}:profile`;

    console.log(`Attemping to get profile for user${userId}`);

    // getting user profile from cache
    const cachedProfile = await redisClient.get(cacheKey);
    if (cachedProfile) {
      return res.status(200).json(JSON.parse(cachedProfile));
    }

    console.log(`Cache miss for user ${userId}, fetching from database`);

    // If not in cache, fetch from database
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cache the user profile
    await redisClient.set(cacheKey, JSON.stringify(user), 300); // Cache for 5 minutes
    console.log(`Cached profile for user ${userId}`);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(200).json({ error: 'Server error' });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, address } = req.body;
    const cacheKey = `user:${userId}:profile`;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user in database
    await user.update({ name, email, address });

    // Invalidate cache
    await redisClient.del(cacheKey);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
