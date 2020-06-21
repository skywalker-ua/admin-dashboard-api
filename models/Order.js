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
    clientSurname: Sequelize.STRING,
    product: Sequelize.DataTypes.JSON,
    qty: Sequelize.STRING,
    clientPhone: Sequelize.STRING,
    status: Sequelize.STRING,
});

module.exports = Order;