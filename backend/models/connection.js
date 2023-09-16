const { Sequelize, Model, DataTypes } = require("sequelize");
const config = require('../config/config.js')

const sequelize = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PASSWORD, {
  host: config.MYSQL_HOST,
  dialect: "mysql",
  port: config.MYSQL_PORT,
});

module.exports = {
    sequelize,
  };