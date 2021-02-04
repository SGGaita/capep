
const Sequelize = require('sequelize');
const env = require('../config/env')
const mysqlConnection = {}
const sequelize = new Sequelize(env.database, env.username, '', {
  host: env.host, 
  dialect: env.dialect,

  operatorAliases: false,
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000

  },

});

mysqlConnection.sequelize = sequelize;
mysqlConnection.Sequelize = Sequelize;


module.exports = mysqlConnection; //exporting the connection