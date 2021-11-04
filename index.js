const initializeConnection = require('./src/server/server');
const express = require('express');

function getIp() {
  var ip = require('ip');
  return ip.address();
}

let ip = getIp();


const app = express();
const port = 3010;

app.get('/', (req, res) => {
  
  res.send(ip);
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

console.log('Servidor Iniciado! Iniciar o cliente');
initializeConnection();
