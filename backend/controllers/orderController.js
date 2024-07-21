const { Order, Product, User } = require('../models');
const { getAsync, setAsync, delAsync } = require('../utils/redis');

exports.createOrder = async (req, res) => {
  const userId = req.user.id;
  const { products } = req.body;

  try {
    const order = await Order.create({ userId });

    for (const product of products) {
      const productInstance = await Product.findByPk(product.id);

      if (!productInstance) {
        return res.status(400).json({ error: 'Product not found' });
      }

      await order.addProduct(productInstance, {
        through: { quantity: product.quantity },
      });
    }

    await delAsync('GET /api/orders');
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;
  const key = `GET /api/orders/user/${userId}`;
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: Product,
    });

    await setAsync(key, JSON.stringify(orders), 'EX', 300);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  const key = `GET /api/orders/${orderId}`;
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  try {
    const order = await Order.findByPk(orderId, {
      include: [Product, User],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await setAsync(key, JSON.stringify(order), 'EX', 300);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  const key = 'GET /api/orders';
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  try {
    const orders = await Order.findAll({
      include: [Product, User],
    });

    await setAsync(key, JSON.stringify(orders), 'EX', 300);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();
    await delAsync('GET /api/orders');
    res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
