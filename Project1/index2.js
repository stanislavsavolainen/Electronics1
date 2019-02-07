
// this server don't need arduino / johnny-five. It only read existing temperature sample from database
// Purpose of this file is saving time. I can work with my "analytics temperature" without plug in arduino and sensor.


const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'electronics_db',
        timezone: '+00:00'
    },
    debug: true
    //connection: process.env.PG_CONNECTION_STRING
}, (e) => {
    console.log(e);
});


const express = require('express');
const bodyparser = require('body-parser');

// Express framework with Node.JS
var app = express();


var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain);

// Register bodyparser with json support
app.use(bodyparser.json());

app.use(express.static('host_client'));

app.get('/tmp', function (req, res, next) {
	
	 var tablename = "temperature1";

	knex(tablename).then(function (database_result) {
            //return JSON.stringify(database_result);
	   res.send( JSON.stringify(database_result) ) ;	       

	 }).catch((e) => {
            console.log(e)
           // return ("Failed");
	     res.send( JSON.stringify("FAIL !") ) ;	    	
	});
	

	//res.send( JSON.stringify("OK") ) ;

});



// Start nodeJS server
var server = app.listen(1111, function()
{
	var hostport = server.address().port;
	console.log("Express server is listening");
	console.log("Port is: %s", hostport);

	 

});



