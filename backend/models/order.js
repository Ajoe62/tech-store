module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
      defaultValue: 'pending',
    },
  });

  return Order;
};
