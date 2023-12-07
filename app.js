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

var serialport = new SerialPort({ path: 'COM10', baudRate: 2400});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

xbeeAPI.parser.on('data', function(frame) {
  const dataString = frame.data.toString('utf8');
  const dataArray = dataString.split(',');
  const deviceID = parseInt(dataArray[1]);
  const deviceVrms = parseFloat(dataArray[2]);
  console.log(deviceID, '>>', deviceVrms);
  io.emit('data', {deviceID, deviceVrms});
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

/*
serialport.on('open', function() {
  var frame_obj = {
    type: 0x00,   
    id: 0x00,
    destination64: '0013a200421be22b',
    data: '$,0,0,0,3,12,2023,@' 
  }
  xbeeAPI.builder.write(frame_obj);
});


xbeeAPI.parser.on('data', function(frame) {
	console.log('>>', frame.data.toString('utf8'));
});

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const serialport = new SerialPort({ path: 'COM4', baudRate: 2400});
const readline = require('readline');

const read = serialport.pipe(new ReadlineParser({ delimiter: '\r\n'}));


read.on('data', console.log);np


read.on('data', (data) => {
  const dataString = data.toString();
  console.log(deviceValues(dataString));
});

function deviceValues(dataArr) {
  const id = parseFloat(dataArr[1]);
  switch(id) {
    case 1:
      return getVrms(dataArr);
    case 2:
      return getVrms(dataArr);
    case 3:
      return getVrms(dataArr);
    case 4:
      return getVrms(dataArr);
    case 5:
      return getVrms(dataArr);
    case 6:
      return getVrms(dataArr);
    case 7:
      return getVrms(dataArr);
    case 8:
      return getVrms(dataArr);
    case 9:
      return getVrms(dataArr);
    case 10:
      return getVrms(dataArr);
    case 11:
      return getVrms(dataArr);
    case 12:
      return getVrms(dataArr);
    case 13:
      return getVrms(dataArr);
    case 14:
      return getVrms(dataArr);
    case 15:
      return getVrms(dataArr);
    case 16:
      return getVrms(dataArr);
    case 17:
      return getVrms(dataArr);
    case 18:
      return getVrms(dataArr);
    case 19:
      return getVrms(dataArr);
    case 20:
      return getVrms(dataArr);
    default: 
      return 'Device ID not from 1 to 20.';
  }
}
*/