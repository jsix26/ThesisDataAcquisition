var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});

var serialport = new SerialPort({ path: "COM4", baudRate: 2400});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

/*
serialport.on("open", function() {
  var frame_obj = {
    type: 0x00, 
    id: 0x00,
    destination64: "0013a200421be22b",
    data: "$,0,0,0,3,12,2023,@" 
  }
  xbeeAPI.builder.write(frame_obj);
});
*/

xbeeAPI.parser.on("data", function(frame) {
	console.log(">>", frame.data.toString('utf8'));
});

/*
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const serialport = new SerialPort({ path: "COM4", baudRate: 2400});
const readline = require("readline");

const read = serialport.pipe(new ReadlineParser({ delimiter: '\r\n'}));


read.on("data", console.log);np


read.on("data", (data) => {
  const dataString = data.toString();
  console.log(deviceValues(dataString));
});


function deviceValues(dataStr) {
  const dataArray = dataStr.split(',');
  const deviceID = parseFloat(dataArray[1]);
  switch(deviceID) {
    case 1:
      console.log("1");
      return getVrms(dataArray);
    case 2:
      console.log("2");
      return getVrms(dataArray);
    case 3:
      console.log("3");
      return getVrms(dataArray);
    case 4:
      console.log("4");
      return getVrms(dataArray);
    case 5:
      console.log("5");
      return getVrms(dataArray);
    case 6:
      console.log("6");
      return getVrms(dataArray);
    case 7:
      console.log("7");
      return getVrms(dataArray);
    case 8:
      console.log("8");
      return getVrms(dataArray);
    case 9:
      console.log("9");
      return getVrms(dataArray);
    case 10:
      console.log("10");
      return getVrms(dataArray);
    case 11:
      console.log("11");
      return getVrms(dataArray);
    case 12:
      console.log("12");
      return getVrms(dataArray);
    case 13:
      console.log("13");
      return getVrms(dataArray);
    case 14:
      console.log("14");
      return getVrms(dataArray);
    case 15:
      console.log("15");
      return getVrms(dataArray);
    case 16:
      console.log("16");
      return getVrms(dataArray);
    case 17:
      console.log("17");
      return getVrms(dataArray);
    case 18:
      console.log("18");
      return getVrms(dataArray);
    case 19:
      console.log("19");
      return getVrms(dataArray);
    case 20:
      console.log("20");
      return getVrms(dataArray);
    default: 
      return "Error. Putol ang string.";
  }
}

function getVrms(dataArr) {
  const vrms = parseFloat(dataArr[2]);
  return vrms;  
}

function getIrms(dataArr) {
  const irms = parseFloat(dataArr[3]);
  return irms;  
}


// Create an interface for reading user input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Prompt the user for commands and send them to COM4
rl.question("Update date and time (if needed): \n", (command) => {
    serialport.write(command, (err) => {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log("Date and time updated:", command);
      }
      // Close the readline interface and the serial port
      rl.close();
    });
});
*/