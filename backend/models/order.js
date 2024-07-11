const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Order', {
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
