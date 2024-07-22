const { Order, Product, User } = require('../models');

exports.createOrder = async (req, res) => {
  const userId = req.user.id;
  const { totalAmount, quantity, productId } = req.body;

  try {
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
    const orders = await Order.findAll({
      where: { userId },
      include: Product,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId, {
      include: [Product, User],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Product, User],
    });

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
    res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
