const express = require('express');
const bodyparser = require('body-parser');
var five = require("johnny-five");
var board = new five.Board();

// Express framework with Node.JS
var app = express();

// Register bodyparser with json support
app.use(bodyparser.json());


board.on("ready", function() {

  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    pins: [12, 11, 5, 4, 3, 2],
    backlight: 6,
    rows: 2,
    cols: 20

  });
});




var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain);

app.use(express.static('host_client'));



app.get('/input', function (req, res, next) {

	console.log("Motor is ON");

	//motor.start();
	
	res.send("<input type='text' value='1234' id='row1' /><br><input type='text' value='5678' id='row2' /><br>");

});



app.get('/write', function (req, res, next) {


	var row1 = req.query.row1;
	var row2 = req.query.row2;

	console.log("write text to display");

	//clear both row from lcd display
	lcd.clear().cursor(0, 0);
	lcd.clear().cursor(1, 0);

	 lcd.cursor(0, 0).print(row1);
	 lcd.cursor(1, 0).print(row2);


	//motor.start();
	
	//res.send("data displayed");
	 res.send( JSON.stringify("data displayed") ) ;

});



// Start nodeJS server
var server = app.listen(1111, function()
{
	var hostport = server.address().port;
	console.log("Express server is listening");
	console.log("Port is: %s", hostport);
});






