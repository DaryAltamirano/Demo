

const socketIo = require('socket.io');
const { createToken, findNoUsedTokensByUserId } = require('../services/services.js');
module.exports = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
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
        console.log(intervalId)
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
          console.log(second)
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
      console.log(intervalId)
      clearInterval(intervalId);
      console.log('Close Connection');
    });
  });
};

function getVirtualToken() {
  return Math.floor(Math.random() * 1000000);
}
