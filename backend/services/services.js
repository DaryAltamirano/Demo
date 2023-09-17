const router = require("express").Router();
const { Sequelize} = require("sequelize");

const { User, Token } = require('../models/index.js');


function createToken(user_id, tokenValue, duration = 60, used = false) {

    try {
      const nuevoToken = Token.create({
        token: tokenValue,
        duration,
        used,
        user_id, 
        created_AT: new Date(),
        expirate_AT: new Date(Date.now() + duration * 1000),
      });
  
      return nuevoToken;
    } catch (error) {
      console.error('Error al crear el token:', error);
      throw error;
    }
  }

  function findNoUsedTokensByUserId(user_id) {
    try {
      const tokens = Token.findAll({
        limit:1,
        where: {
          user_id: user_id,
          used: false,
          expirate_AT: {
            [Sequelize.Op.gte]: new Date(), 
          },
        },
      });
      return tokens;
    } catch (error) {
      throw new Error('Error al buscar tokens activos: ' + error.message);
    }
  }
  module.exports = {
    createToken,
    findNoUsedTokensByUserId
  } 