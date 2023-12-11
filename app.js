var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var C = xbee_api.constants;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});

var serialport = new SerialPort({ path: 'COM4', baudRate: 2400});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

xbeeAPI.parser.on('data', function(frame) {
  const dataString = frame.data.toString('utf8');
  const dataArray = dataString.split(',');
  const deviceID = parseInt(dataArray[1]);
  const deviceVrms = parseFloat(dataArray[2]);
  const now = new Date();
  const formattedDate = now.toLocaleString();
  console.log(formattedDate, '|', deviceID, '>>', deviceVrms);
  io.emit('data', {formattedDate, deviceID, deviceVrms });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});