var Sequelize = require('sequelize');
var mysqlConnection = require('../dbconnect/dbconnect');

module.exports = mysqlConnection.sequelize.define(
  'capep_sys_users', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    staff_id_fk: {
      type: Sequelize.INTEGER
    },
    userName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
    },
    roles: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }
);