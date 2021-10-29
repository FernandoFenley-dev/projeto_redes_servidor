// Load the TCP Library
const net = require('net');

const getHousesForSaleList = require('./functions/forsale');

//Porta para conexao
var porta = 29298;

// Lista de clientes
var clientes = [];

// Inicia o TCP Server
net.createServer(function (socket) {
  // Identifica o socket
  socket.name = socket.remoteAddress + ':' + socket.remotePort;

  // Adiciona o socket a lista de clientes
  clientes.push(socket);

  // Envia uma mensagem de conexao
  socket.write('Cliente' + socket.name + 'conectado com sucesso\n');

  // // Avisa aos demais clientes que um novo cliente foi conectado
  // broadcast(socket.name + ” conectado\n”, socket);

  // Listener de requisicoes dos clientes
  socket.on("data", function (data) {
    if (data.toString() === 'properties for sale list') {

      // procura qual é o cliente no array de clientes
      const cliente = clientes.find(socket);

      const housesList = getHousesForSaleList();

      housesList.forEach(house => {
        cliente.write(message);
      });
    }
  });

  // Trata a desconexao do cliente
  socket.on("end", function () {
    clientes.splice(clientes.indexOf(socket), 1);
    broadcast(socket.name + 'Desconectou\n');
  });

  // Trata possiveis erros na conexao
  socket.on('error', function () {
    console.log('\n Cliente desconectao por erro ');
    clientes.splice(clientes.indexOf(socket), 1);
  });

  // Envia mensagem para o cliente
  function broadcast(message, sender) {
    clientes.forEach(function (cliente) {
      // Tratamento para nao enviar a mesma mensagem a quem originou
      if (cliente === sender) return;
      cliente.write(message);
    });
    // Envia a mensagem na console
    process.stdout.write(message)
  }

}).listen(porta);

// Informa na console que o servidor esta em operacao.
console.log('Servidor em execucao na porta :' + porta + '\n');
