const { Sequelize, Model, DataTypes } = require("sequelize");

const  { sequelize } = require("./connection.js");
class User extends Model { }

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthday_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

class Token extends Model { }

Token.init(
  {
    token_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: Sequelize.INTEGER(8)
    },
    created_AT: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    expirate_AT: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    duration: {
      type: Sequelize.SMALLINT,
      defaultValue: 60,
    },
    used: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
  },
  {
    sequelize,
    modelName: "Token",
  }
);

User.hasMany(Token, { foreignKey: 'user_id' });

module.exports = {
  User,
  Token,
};