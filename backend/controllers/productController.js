const { Product, Category } = require('../models');
const upload = require('../config/multerConfig').single('imageUrl');
const { getAsync, setAsync, delAsync } = require('../utils/redis');

exports.getAllProducts = async (req, res) => {
  const key = req.originalUrl;
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const products = await Product.findAll({
    include: [{ model: Category }],
  });

  await setAsync(key, JSON.stringify(products), 'EX', 300);
  res.status(200).json(products);
};

exports.getProductById = async (req, res) => {
  const key = req.originalUrl;
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const product = await Product.findByPk(req.params.id, {
    include: [{ model: Category }],
  });

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  await setAsync(key, JSON.stringify(product), 'EX', 300);
  res.status(200).json(product);
};

exports.createProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Multer error: ' + err.message });
    }

    const { name, description, price, stockQuantity, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (
      !name ||
      !description ||
      !price ||
      !stockQuantity ||
      !categoryId ||
      !imageUrl
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        console.error('Category not found:', categoryId);
        return res.status(404).json({ error: 'Category not found' });
      }

      const existingProduct = await Product.findOne({ where: { name } });
      if (existingProduct) {
        console.error('Product already exists:', name);
        return res.status(400).json({ error: 'Product already exists' });
      }

      const product = await Product.create({
        name,
        description,
        price,
        stockQuantity,
        imageUrl,
        categoryId,
      });

      res.status(201).json(product);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error: ' + error.message });
    }
  });
};

exports.updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Multer error: ' + err.message });
    }

    const { name, description, price, stockQuantity, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description || !price || !stockQuantity || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        console.error('Product not found:', req.params.id);
        return res.status(404).json({ error: 'Product not found' });
      }

      const category = await Category.findByPk(categoryId);

      if (!category) {
        console.error('Category not found:', categoryId);
        return res.status(404).json({ error: 'Category not found' });
      }

      await product.update({
        name,
        description,
        price,
        stockQuantity,
        imageUrl,
        categoryId,
      });

      await delAsync(req.originalUrl);
      res.status(200).json(product);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error: ' + error.message });
    }
  });
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      console.error('Product not found:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    await delAsync(req.originalUrl);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};
