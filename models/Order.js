const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    clientName: Sequelize.STRING,
    clientPhone: Sequelize.STRING,
    orderTotal: Sequelize.INTEGER,
    status: Sequelize.STRING,
});

module.exports = Order;