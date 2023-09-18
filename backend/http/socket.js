

const socketIo = require('socket.io');
const { createToken, findNoUsedTokensByUserId } = require('../services/services.js');
const config = require('../config/config.js')

module.exports = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: config.ORIGIN_SOCKET,
      methods: ['GET', 'POST'],
    },
  });
  let intervalId = 0;

  io.on('connection', (socket) => {
    console.log('New Connection');

    socket.on('getToken', (user_id) => {
      let tokensArray = []
      let second = 0
      findNoUsedTokensByUserId(user_id)
        .then((tokens) => tokensArray = tokens)
        .catch((error) => console.error(error));

      intervalId = setInterval(() => {
        if ((Array.isArray(tokensArray) && tokensArray.length === 0) || second >= 60) {
          token = getVirtualToken()
          createToken(user_id, token)
          result = {
            token,
            time: 0,
          }
          findNoUsedTokensByUserId(user_id)
            .then((tokens) => tokensArray = tokens)
            .catch((error) => console.error(error));
          second = 0;
        } else {
          const time = Math.floor((new Date() - tokensArray[0].dataValues.created_AT) / 1000);
          result = {
            token: tokensArray[0].dataValues.token,
            time,
          }
          second = time
        }
        second++;
        socket.emit('pushToken', result);
      }, 1000)
    });

    socket.on('disconnect', () => {
      clearInterval(intervalId);
      console.log('Close Connection');
    });
  });
};

function getVirtualToken() {

  const min = 100000;
  const max = 1000000;
  
  return Math.floor(Math.random() * (max - min)) + min;
}
