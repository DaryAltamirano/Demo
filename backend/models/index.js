const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: mysql,
    operatorsAliases: false,
  
    pool: {
      max: 5,     
      min: 0,     
      idle: 10000
    }
  });
  
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.user = require("./user.js")(sequelize, Sequelize);
  db.user = require("./token.js")(sequelize, Sequelize);
  module.exports = db;