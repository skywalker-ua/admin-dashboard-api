const Sequelize = require('sequelize');

//Production db
const sequelize = new Sequelize(
    'mysql://b7e4a873388d76:31943d47@us-cdbr-east-06.cleardb.net/heroku_5c9556ddcb17cc9?reconnect=true'
)

//Local db 
// const sequelize = new Sequelize(
//     'chemiplast_data',
//     'root',
//     'nazarino203',
//     {
//         'dialect': 'mysql',
//         'host': 'localhost'
//     }
// );

module.exports = sequelize;