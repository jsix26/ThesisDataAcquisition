var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var C = xbee_api.constants;
var ExcelJS = require('exceljs');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});

var serialport = new SerialPort({ path: 'COM7', baudRate: 2400});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

var workbook = new ExcelJS.Workbook();
var worksheet1 = workbook.addWorksheet('Device #1');
var worksheet2 = workbook.addWorksheet('Device #2');
var worksheet3 = workbook.addWorksheet('Device #3');
var worksheet4 = workbook.addWorksheet('Device #4');
var worksheet5 = workbook.addWorksheet('Device #5');
var worksheet6 = workbook.addWorksheet('Device #6');
var worksheet11 = workbook.addWorksheet('Device #11');
var worksheet15 = workbook.addWorksheet('Device #15');
worksheet1.columns = [
  { header: 'Device 1', key: 'deviceVrms1', width: 10 },
];
worksheet2.columns = [
  { header: 'Device 2', key: 'deviceVrms2', width: 10 },
];
worksheet3.columns = [
  { header: 'Device 3', key: 'deviceVrms3', width: 10 },
];
worksheet4.columns = [
  { header: 'Device 4', key: 'deviceVrms4', width: 10 },
];
worksheet5.columns = [
  { header: 'Device 5', key: 'deviceVrms5', width: 10 },
];
worksheet6.columns = [
  { header: 'Device 6', key: 'deviceVrms6', width: 10 },
];
worksheet11.columns = [
  { header: 'Device 11', key: 'deviceVrms11', width: 10 },
];
worksheet15.columns = [
  { header: 'Device 15', key: 'deviceVrms15', width: 10 },
];

xbeeAPI.parser.on('data', function(frame) {
  const now = new Date();
  const formattedDate = now.toLocaleString();
  const dataString = frame.data.toString('utf8');
  const dataArray = dataString.split(',');
  const deviceID = parseInt(dataArray[1]);

  switch (deviceID) {
    case 1:
      const deviceVrms1 = parseFloat(dataArray[2]);
      const dataToWrite1 = { deviceVrms1 };
      worksheet1.addRow(dataToWrite1).commit();
      workbook.xlsx.writeFile('data.xlsx');  
      break;
    case 2:
      const deviceVrms2 = parseFloat(dataArray[2]);
      const dataToWrite2 = { deviceVrms2 };
      worksheet2.addRow(dataToWrite2).commit();
      workbook.xlsx.writeFile('data.xlsx');  
      break;
    case 3:
      const deviceVrms3 = parseFloat(dataArray[2]);
      const dataToWrite3 = { deviceVrms3 };
      worksheet3.addRow(dataToWrite3).commit();
      workbook.xlsx.writeFile('data.xlsx');
      break;    
    case 4:
      const deviceVrms4 = parseFloat(dataArray[2]);
      const dataToWrite4 = { deviceVrms4 };
      worksheet3.addRow(dataToWrite4).commit();
      workbook.xlsx.writeFile('data.xlsx');
      break;
    case 5:
      const deviceVrms5 = parseFloat(dataArray[2]);
      const dataToWrite5 = { deviceVrms5 };
      worksheet1.addRow(dataToWrite5).commit();
      workbook.xlsx.writeFile('data.xlsx');  
      break;
    case 6:
      const deviceVrms6 = parseFloat(dataArray[2]);
      const dataToWrite6 = { deviceVrms6 };
      worksheet2.addRow(dataToWrite6).commit();
      workbook.xlsx.writeFile('data.xlsx');  
      break;
    case 11:
      const deviceVrms11 = parseFloat(dataArray[2]);
      const dataToWrite11 = { deviceVrms11 };
      worksheet3.addRow(dataToWrite11).commit();
      workbook.xlsx.writeFile('data.xlsx');
      break;    
    case 15:
      const deviceVrms15 = parseFloat(dataArray[2]);
      const dataToWrite15 = { deviceVrms15 };
      worksheet3.addRow(dataToWrite15).commit();
      workbook.xlsx.writeFile('data.xlsx');
      break;    
    
  }
  /*
  const deviceVrms = parseFloat(dataArray[2]);
  console.log(formattedDate, '|', deviceID, '>>', deviceVrms);
  */
  io.emit('data', {formattedDate, deviceID, deviceVrms });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
