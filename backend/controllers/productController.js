const { Product, Category } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: Category,
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stockQuantity, categoryId, imageUrl } =
      req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      imageUrl,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stockQuantity, categoryId, imageUrl } =
      req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update({
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      imageUrl,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
