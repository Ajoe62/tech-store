const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Product = require('./product')(sequelize, Sequelize);
const Category = require('./category')(sequelize, Sequelize);
const Order = require('./order')(sequelize, Sequelize);

User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Order.belongsToMany(Product, { through: 'OrderProducts' });
Product.belongsToMany(Order, { through: 'OrderProducts' });

sequelize.sync();

module.exports = {
  User,
  Product,
  Category,
  Order,
  sequelize,
};
