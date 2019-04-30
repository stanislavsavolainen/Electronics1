const express = require('express');
const bodyparser = require('body-parser');
var five = require("johnny-five");
var board = new five.Board();

// Express framework with Node.JS
var app = express();

// Register bodyparser with json support
app.use(bodyparser.json());

var motor;


board.on("ready", function() {
	

 motor = new five.Motor({
    pins: {
      pwm: 3,
      dir: 13
    },
    invertPWM: true
  });
	


});


app.get('/on', function (req, res, next) {


	var motor_speed = -1;

	if( typeof req.query.speed !== 'undefined' ){

		motor_speed = req.query.speed;

		if( motor_speed > 0 && motor_speed < 256 && motor_speed != 0  ){
				
		
			console.log("Motor spining forward with speed " + motor_speed);

			//motor.start();
		 	motor.forward(motor_speed);
	
			res.send("<h1> Motor spining forward with speed " + motor_speed + "</h1>");
		}


		else if( motor_speed < 0 && motor_speed > -256 && motor_speed != 0 ){
			 motor.reverse( (motor_speed * -1) );

			res.send("<h1> Motor spining reverse with speed " + motor_speed + "</h1>");
		}


		
		if( motor_speed == 0) {
			console.log("Motor stopped");

			//motor.start();
		 	motor.forward(motor_speed);
	
			res.send("<h1> Motor stopped </h1>");

		}

	
	} else {

		console.log("Motor is ON");

		motor.start();
	
		res.send("<h1> Motor is ON </h1>");


	}

	


	

});



app.get('/off', function (req, res, next) {

	console.log("Motor is OFF");

	 motor.stop();

	res.send("<h1> Motor is OFF </h1>");

});







// Start nodeJS server
var server = app.listen(1111, function()
{
	var hostport = server.address().port;
	console.log("Express server is listening");
	console.log("Port is: %s", hostport);
});