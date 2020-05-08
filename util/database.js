const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'chemiplast_data',
    'root',
    'nazarino203',
    {
        'dialect': 'mysql',
        'host': 'localhost'
    }
);

module.exports = sequelize;