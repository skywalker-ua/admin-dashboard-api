const Sequelize = require('sequelize');

//Production db
// const sequelize = new Sequelize(
//     process.env.DATABASE_URL
// )

// Local db 
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