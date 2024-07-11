const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findByPk(decoded.id);
    if (!req.user) throw new Error();
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
