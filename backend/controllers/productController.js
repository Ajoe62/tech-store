const { Product, Category } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: Category }] });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stockQuantity, categoryId, imageUrl } =
    req.body;

  try {
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
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stockQuantity, categoryId, imageUrl } =
    req.body;

  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stockQuantity = stockQuantity;
    product.categoryId = categoryId;
    product.imageUrl = imageUrl;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status500().json({ error: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
