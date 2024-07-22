const sequelize = require('../config/database');
const UserModel = require('./user');
const ProductModel = require('./product');
const CategoryModel = require('./category');
const OrderModel = require('./order');
const OrderProductModel = require('./orderProduct');

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Category = CategoryModel(sequelize);
const Order = OrderModel(sequelize);
const OrderProduct = OrderProductModel(sequelize);

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

sequelize.sync();

module.exports = {
  User,
  Product,
  Category,
  Order,
  OrderProduct,
};
