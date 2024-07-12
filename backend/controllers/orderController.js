const { Order, Product, User } = require('../models');

exports.createOrder = async (req, res) => {
  const { totalAmount, quantity, productId } = req.body;
  const userId = req.user.id;

  if (!totalAmount || !quantity || !productId)
    return res.status(400).json({ error: 'All fields are required' });

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const order = await Order.create({
      totalAmount,
      quantity,
      productId,
      userId,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.findAll({ where: { userId }, include: Product });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  const userId = req.user.id;

  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId },
      include: Product,
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
