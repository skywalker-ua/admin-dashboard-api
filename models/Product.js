const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
  name: Sequelize.STRING,
  sku: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.INTEGER
});

module.exports = Product;