const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
  name: Sequelize.STRING,
  imgUrl: Sequelize.STRING,
  sku: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER
});

module.exports = Product;