const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imgUrl: Sequelize.STRING,
    clientName: Sequelize.STRING,
    clientPhone: Sequelize.STRING,
    address: Sequelize.STRING,
    comment: Sequelize.STRING,
    product: Sequelize.STRING,
    orderTotal: Sequelize.INTEGER,
    paymentMethod: Sequelize.STRING,
    status: Sequelize.STRING,
    date: Sequelize.DATE
});

module.exports = Order;