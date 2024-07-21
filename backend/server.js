const express = require('express');
const app = express();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { authenticate } = require('./middleware/authMiddleware');
const { initRedisClient } = require('./utils/redis');

const path = require('path');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Initialize Redis client
initRedisClient();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', authenticate, orderRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
