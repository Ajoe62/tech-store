const { Category } = require('../models');
const { getAsync, setAsync } = require('../utils/redis');
const category = require('../models/category');

exports.getAllCategories = async (req, res) => {
  const key = req.originalUrl;
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const categories = await Category.findAll();

  await setAsync(key, JSON.stringify(categories), 'EX', 300);
  res.status(200).json(categories);
};

exports.getCategoryById = async (req, res) => {
  const key = req.originalUrl;
  const cachedData = await getAsync(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  await setAsync(key, JSON.stringify(category), 'EX', 300);
  res.status(200).json(category);
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).json({ error: 'Name and description are required' });
  if (await Category.findOne({ where: { name } }))
    return res.status(400).json({ error: 'Category already exists' });

  try {
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).json({ error: 'Name and description are required' });

  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;
    category.description = description;
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
