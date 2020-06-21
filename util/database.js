const Sequelize = require('sequelize');

// Localhost 
// const sequelize = new Sequelize(
//     'chemiplast_data',
//     'root',
//     'nazarino203',
//     {
//         'dialect': 'mysql',
//         'host': 'localhost'
//     }
// );

//Production db
const sequelize = new Sequelize(
    process.env.DATABASE_URL
)


module.exports = sequelize;