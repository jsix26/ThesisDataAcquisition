var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'admin',
  database : 'smartsensedatabase'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
 
  console.log('Connected as id ' + connection.threadId);
});

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
  const dataString = frame.data.toString('utf8');
  const dataArray = dataString.split(',');
  const deviceID = parseInt(dataArray[1]);
  const deviceVrms = parseFloat(dataArray[2]);
  const now = new Date();
  const formattedDate = now.toLocaleString();
  const deviceData = ('@' + deviceID + ', ' + deviceVrms + ', ' + formattedDate + '$');

  switch (deviceID) {
    case 1:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 1.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 2:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 2.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 3:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 3.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;    
    case 4:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 4.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 5:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 5.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
    case 6:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 6.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;
      case 7:
        connection.connect(function(err) {
          if(err) throw err;
          console.log("Reading device 7.");
          var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
          var values = [
            [deviceData]
          ]
          connection.query(sql, [values], function(err) {
            if(err) throw err;
            console.log ("Records updated!");
          })
        })
        break;
    case 8:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 8.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;      
      case 9:
        connection.connect(function(err) {
          if(err) throw err;
          console.log("Reading device 9.");
          var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
          var values = [
            [deviceData]
          ]
          connection.query(sql, [values], function(err) {
            if(err) throw err;
            console.log ("Records updated!");
          })
        })
        break;
    case 10:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 10.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;     
    case 11:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 11.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;    
    case 12:
      connection.connect(function(err) {
        if(err) throw err;
        console.log("Reading device 12.");
        var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
        var values = [
          [deviceData]
        ]
        connection.query(sql, [values], function(err) {
          if(err) throw err;
          console.log ("Records updated!");
        })
      })
      break;    
      case 13:
        connection.connect(function(err) {
          if(err) throw err;
          console.log("Reading device 13.");
          var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
          var values = [
            [deviceData]
          ]
          connection.query(sql, [values], function(err) {
            if(err) throw err;
            console.log ("Records updated!");
          })
        })
        break;     
      case 14:
        connection.connect(function(err) {
          if(err) throw err;
          console.log("Reading device 14.");
          var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
          var values = [
            [deviceData]
          ]
          connection.query(sql, [values], function(err) {
            if(err) throw err;
            console.log ("Records updated!");
          })
        })
        break;    
      case 15:
        connection.connect(function(err) {
          if(err) throw err;
          console.log("Reading device 15.");
          var sql = "INSERT INTO roomvrmsreading (ID_VRMS_DATE_TIME) VALUES ?";
          var values = [
            [deviceData]
          ]
          connection.query(sql, [values], function(err) {
            if(err) throw err;
            console.log ("Records updated!");
          })
        })
        break; 
  }

  //console.log(formattedDate, '|', deviceID, '>>', deviceVrms);

  io.emit('data', {formattedDate, deviceID, deviceVrms});
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
