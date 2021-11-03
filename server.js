const net = require('net');
const v8 = require('v8');

const MessageBuffer = require('../buffer/MessageBuffer');

const getHousesList = require('../functions/housesList');
const getHousesForSaleList = require('../functions/forsale');
const getHousesForRentList = require('../functions/forrent');
const getHouseDetail = require('../functions/houseDetail');
const getLocationsList = require('../functions/locationsList');

// const ipLocal = 'SEUIP - pega pelo comando ipconfig ou ifconfig';
const ipLocal = '192.168.1.10';

const connectionOptions = {
  port: 29298,
  host: ipLocal,
  reuseAddress: true,
};

const clientes = [];

const server = new net.Server();

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

    let received = new MessageBuffer("\n");

    socket.on('data', (data) => {
      console.log('Server client received: ' + data);
      let msg = data.toString();
      console.log('mensagem recebida', msg);
      received.push(msg);
      while (!received.isFinished()) {
        mgs = received.handleData();
      }

      console.log('mensagem pronta', msg);

      if (msg === 'properties list') {
        const housesList = getHousesList();

        housesList.forEach((house) => {
          const buffer = Buffer.from(JSON.stringify(house));
          socket.write(buffer);
        });
      }

      if (msg.includes('property id=')) {
        const property_id = msg.substring(12);
        const property = getHouseDetail(property_id);

        const buffer = JSON.stringify(property);
        socket.write(buffer);
      }

      if (msg === 'locations suggestion') {
        const keywordsList = getLocationsList();

        keywordsList.forEach((location) => {
          socket.write(location);
        });
      }

      if (msg.includes('for_sale')) {
        const params = msg.split(';');

        console.log(params);
        const property = getHousesForSaleList(params);
        console.log(property);
        property.forEach((house) => {
          const buffer = Buffer.from(JSON.stringify(house) + "\n");
          socket.write(buffer);
        });
        console.log('enviado', property.length);        
      }

      if (msg.includes('for_rent')) {
        const params = msg.split(';');

        console.log(params);
        const property = getHousesForRentList(params);
        console.log(property);
        property.forEach((house) => {
          const buffer = Buffer.from(JSON.stringify(house) + "\n");
          socket.write(buffer);
        });
        console.log('enviado', property.length);        
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
