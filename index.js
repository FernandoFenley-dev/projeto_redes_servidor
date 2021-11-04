const initializeConnection = require('./src/server/server');

const axios = require('axios');

function getIp() {
  var ip = require('ip');
  return ip.address();
}

let ip = getIp();

axios
  .post('https://shielded-fjord-54509.herokuapp.com/ip', {
    ip: ip,
  })
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
  })
  .catch((error) => {
    console.error(error);
  });

console.log('Servidor Iniciado! Iniciar o cliente');
initializeConnection();
