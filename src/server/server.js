const net = require('net');
const MessageBuffer = require('../buffer/MessageBuffer');

const getHousesList = require('../functions/housesList');
const getHousesForSaleList = require('../functions/forsale');
const getHousesForRentList = require('../functions/forrent');
const getHouseDetail = require('../functions/houseDetail');
const getLocationsList = require('../functions/locationsList');
const getUser = require('../functions/login');
const registerUser = require('../functions/register');
const proposal = require('../functions/proposal');
const favorites = require('../functions/favorites');

const ipLocal = '';

const connectionOptions = {
  port: 29298,
  host: '',
  reuseAddress: true,
};

const server = new net.Server();

/*
  Função criada para inicialização do Socket no lado do servidor.
  A função também interpreta todas as mensagens do protocolo e realiza as ações
  específicas para cada mensagem.
*/

function initializeConnection() {
  server.on('connection', (socket) => {
    socket.write('Connection established\r\n');
  });

  server.listen(connectionOptions, () => {
    const port = server.address()?.port;
    if (!port) {
      throw new Error('Port not found');
    }
  });

  server.on('connection', (socket) => {
    console.log(
      'Client connected to server on ' + JSON.stringify(socket.address())
    );

    let received = new MessageBuffer('\n');

    socket.on('data', (data) => {
      let msg = data.toString();
      console.log('mensagem recebida', msg);

      received.push(msg);
      while (!received.isFinished()) {
        mgs = received.handleData();
      }

      console.log('mensagem pronta', msg);


      // Mensagem: --Sintaxe: properties_list\n
      if (msg === 'properties_list\n') {
        const housesList = getHousesList();

        //console.log(housesList);
        housesList.forEach((house) => {
          const buffer = Buffer.from(JSON.stringify(house) + '\n');
          socket.write(buffer);
        });
      }

      // Mensagem: --Sintaxe: house_details; HOUSE_ID\n
      if (msg.includes('property id=')) {
        const property_id = msg.split('\n')[0].substring(12);
        const property = getHouseDetail(property_id);

        const buffer = Buffer.from(JSON.stringify(property) + '\n');
        socket.write(buffer);
      }

      // Mensagem: --Sintaxe: locations_list\n
      if (msg === 'locations_suggestion\n') {
        const keywordsList = getLocationsList();

        keywordsList.forEach((location) => {
          const buffer = Buffer.from(location + '\n');
          socket.write(buffer);
        });

        console.log(keywordsList.length);
      }

      // Mensagem: --Sintaxe: for_sale;PRICE_MIN;PRICE_MAX;BEDS;BATHS;GARAGES\n
      if (msg.includes('for_sale')) {
        const params = msg.split(';');

        const properties = getHousesForSaleList(params);
        properties.forEach((house) => {
          const buffer = Buffer.from(JSON.stringify(house) + '\n');
          socket.write(buffer);
        });
        console.log('enviado', properties.length);
      }

      // Mensagem: --Sintaxe: for_rent;PRICE_MIN;PRICE_MAX;BEDS;BATHS;GARAGES\n
      if (msg.includes('for_rent')) {
        const params = msg.split(';');

        const property = getHousesForRentList(params);
        property.forEach((house) => {
          const buffer = Buffer.from(JSON.stringify(house) + '\n');
          socket.write(buffer);
        });
        console.log('enviado', property.length);
      }

      // Mensagem: --Sintaxe: login;PRICE_MIN;PRICE_MAX;BEDS;BATHS;GARAGES\n
      if (msg.includes('login')) {
        const params = msg.split(';');

        const user = getUser(params);
        // console.log("USUARIO lenght: "+user.length);

        if (!(user.length == 0)) {
          socket.write(String(user[0].idUser));
        }
      }

      // Mensagem: --Sintaxe: register;EMAIL;PASSWORD\n
      if (msg.includes('register')) {
        const params = msg.split(';');

        const user = registerUser(params);
        console.log("-------------------");

        // console.log(user);
        if (!(user.length == 0)) {
          socket.write(String(user[0].idUser));
        }
      }
      if (msg.includes('proposal')) {
        const params = msg.split(';');

        const property = proposal(params);

        // console.log('Proposal : ', property);
      }
      if (msg.includes('favorite')) {
        const params = msg.split(';');

        const property = favorites(params);

        // console.log('Favorite : ', property);
      }
    });

    socket.on('error', (error) => {
      console.log('Server client error ' + error);
    });

    socket.on('close', (error) => {
      console.log('Server client closed ' + (error ? error : ''));
    });
  });

  server.on('error', (error) => {
    console.log('Server error ' + error);
  });

  server.on('close', () => {
    console.log('Server closed');
  });
}

module.exports = initializeConnection;
