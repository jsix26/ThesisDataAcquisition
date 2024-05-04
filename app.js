var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SmartSenseDatabase"
})

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

var serialport = new SerialPort({ path: 'COM14', baudRate: 2400});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

xbeeAPI.parser.on('data', function(frame) {
  const now = new Date();
  const formattedDate = now.toLocaleString();
  const dataString = frame.data.toString('utf8');
  const dataArray = dataString.split(',');
  const deviceID = parseInt(dataArray[1]);
  const deviceVrms = parseFloat(dataArray[2]);

  switch (deviceID) {
    case 1:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 2:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 3:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;    
    case 4:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 5:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 6:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 11:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;    
    case 15:
      con.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (Timestamp, Device1) VALUES ?";
        var values = [
          [deviceVrms, formattedDate]
        ]
        con.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;    
  }
  
  /*
  con.connect(function(error) {
    if(err) throw err;
    console.log("Connected.");
    var sql = "INSERT INTO roomvrmsreading";
    var values = [
      [ deviceVrms1, formattedDate, deviceVrms2, formattedDate, 
        deviceVrms3, formattedDate, deviceVrms4, formattedDate,
        deviceVrms5, formattedDate, deviceVrms6, formattedDate,
        deviceVrms11, formattedDate, deviceVrms15, formattedDate ]
    ]
  })
  
  con.query(sql, [values], function(err, result) {
    if(err) throw err;
    console.log ("Records inserted: "+ result.affectedRows)
  })
  
  console.log(formattedDate, '|', deviceID, '>>', deviceVrms);
  */

  io.emit('data', {formattedDate, deviceID, deviceVrms});
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
