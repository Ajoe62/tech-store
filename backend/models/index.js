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

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

Order.belongsToMany(Product, {
  through: 'OrderProducts',
  foreignKey: 'orderId',
});
Product.belongsToMany(Order, {
  through: 'OrderProducts',
  foreignKey: 'productId',
});

sequelize.sync();

module.exports = {
  User,
  Product,
  Category,
  Order,
};
