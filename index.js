const initializeConnection = require('./src/server/server');
const { networkInterfaces } = require('os');
const axios = require('axios');
const defaultGateway = require('default-gateway');
const nets = networkInterfaces();
const results = Object.create(null);

function getIp() {
  var ip = require('ip');
  const { gateway, interface } = defaultGateway.v4.sync();
  console.log(gateway)
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal && name === interface) {
        if (!results[name]) {
          results[name] = [];
        }
        ip = net.address;
      }
    }
  }

  return ip;
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
