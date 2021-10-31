const net = require('net');
const v8 = require('v8');

const getHousesList = require('../functions/housesList');
const getHousesForSaleList = require('../functions/forsale');
const getHouseDetail = require('../functions/houseDetail');
const getLocationsList = require('../functions/locationsList');

const ipLocal = '';

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

    socket.on('data', (data) => {
      console.log('Server client received: ' + data);
      let msg = data.toString();

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
