const express = require('express');
const app = express();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { authenticate } = require('./middleware/authMiddleware');
const redisClient = require('./utils/redis');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3000;

//app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Move CORS middleware to the top
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Adding Redis health check
app.get('/api/health', (req, res) => {
  res.json({
    database: sequelize.authenticate().then(() => true).catch(() => false),
    redis: redisClient.isAlive()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', authenticate, orderRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  async function startServer() {
    try {
      await redisClient.connect();
      console.log('Redis connection established');
  
      const pingResponse = await redisClient.ping();
      console.log('Redis ping response:', pingResponse);
  
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      process.exit(1);
    }
  }
  
  startServer();
