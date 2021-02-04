const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
 
db.role.belongsToMany(db.user, { through: 'capep_user_role', foreignKey: 'role_id_fk', otherKey: 'user_id_fk'});
db.user.belongsToMany(db.role, { through: 'capep_user_role', foreignKey: 'user_id_fk', otherKey: 'role_id_fk'});
 
module.exports = db;