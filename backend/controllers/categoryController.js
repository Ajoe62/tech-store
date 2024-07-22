const { Category } = require('../models');
const category = require('../models/category');
const upload = require('../config/multerConfig').single('image');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.findAll();

  res.status(200).json(categories);
};

exports.getCategoryById = async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.status(200).json(category);
};

exports.createCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Multer error: ' + err.message });
    }
  });

  const { name, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingCategory = await Category.findOne({ where: { name } });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await Category.create({ name, description, image });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Multer error: ' + err.message });
    }
  });

  const { name, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;
    category.description = description;
    category.image = image;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
