const Sequelize = require('sequelize');

//Production db
const sequelize = new Sequelize(
    process.env.DATABASE_URL
)

module.exports = sequelize;