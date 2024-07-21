const { Product, Category } = require('../models');
const upload = require('../config/multerConfig').single('imageUrl');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: Category }] });
    console.log(products);
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
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Multer error: ' + err.message });
    }

    const { name, description, price, stockQuantity, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Received data:', {
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      imageUrl,
    });

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
  const { name, description, price, stockQuantity, categoryId, imageUrl } =
    req.body;

  try {
    const product = await Product.findByPk(req.params.id);

    if (
      !name ||
      !description ||
      !price ||
      !stockQuantity ||
      !categoryId ||
      !imageUrl
    )
      return res.status(400).json({ error: 'All fields are required' });

    if (await Product.findOne({ where: { name } }))
      return res.status(400).json({ error: 'Product already exists' });

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
