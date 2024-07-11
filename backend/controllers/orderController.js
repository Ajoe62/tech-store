const { Order, Product, User } = require('../models');

exports.createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;

  try {
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
    });

    await order.addProducts(products);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: Product,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: Product,
    });

    if (!order || order.userId !== req.user.id) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
