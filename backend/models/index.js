const sequelize = require('../config/database');
const UserModel = require('./user');
const ProductModel = require('./product');
const CategoryModel = require('./category');
const OrderModel = require('./order');

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Category = CategoryModel(sequelize);
const Order = OrderModel(sequelize);

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Order, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

sequelize.sync();

module.exports = {
  User,
  Product,
  Category,
  Order,
};
