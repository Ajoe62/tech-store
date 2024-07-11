const { Order, Product, User } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const order = await Order.create({ totalAmount, userId: req.user.id });
    await order.addProducts(products.map((id) => ({ id })));
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: Product,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Product, User],
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
