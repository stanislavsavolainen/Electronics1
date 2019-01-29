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
var five = require("johnny-five");
var board = new five.Board();

// Express framework with Node.JS
var app = express();

// Register bodyparser with json support
app.use(bodyparser.json());

var temperature;

board.on("ready", function() {
	
   temperature = new five.Thermometer({
    controller: "TMP36",
    pin: "A0"
  });	

  measureTemperature();

});


app.get('/tmp', function (req, res, next) {

	console.log("Manual temperature : " + temperature.celsius);
	
	//res.send("<h1> temperature  : " + temperature.celsius +"  </h1>");

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



function measureTemperature(){

	if( typeof temperature != "undefined" ){
		setInterval(function(){ 

			var d = new Date()



			var month_str = "";

			if( (d.getMonth() + 1) > 9 ) month_str = "" + (d.getMonth() + 1 ) ;			
			else if ( (d.getMonth() + 1) < 10  )  month_str = "0" + (d.getMonth() + 1 ) ;			

			var day_str = "";
			if( d.getDate() > 9 ) day_str = "" + d.getDate() ;			
			else if ( d.getDate() < 10  )  day_str = "0" + d.getDate() ;

			var hour_str = "";
			if( d.getHours() > 9 ) hour_str = "" + d.getHours() ;			
			else if ( d.getHours() < 10  )  hour_str = "0" + d.getHours() ;
			
			var min_str = "";
			if( d.getMinutes() > 9 ) min_str = "" + d.getMinutes() ;			
			else if ( d.getMinutes() < 10  )  min_str = "0" + d.getMinutes() ;

			var sec_str = "";
			if( d.getSeconds() > 9 ) sec_str = "" + d.getSeconds() ;			
			else if ( d.getSeconds()< 10  )  sec_str = "0" + d.getSeconds() ;

			//var mytimestamp = "" + d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
			var mytimestamp = "" + d.getFullYear() + "-" + month_str + "-" + day_str + " " + hour_str + ":" + min_str + ":" + sec_str;

			

			console.log("Auto measure temperature : " + temperature.celsius  +  ",  timestamp :  " +  mytimestamp + ""  ); 
               
			saveResultToDB( mytimestamp , temperature.celsius );


		}, 10000);
	}
}



function saveResultToDB( temperature_timestamp, temperature ) {
	
//console.log("INSERT INTO temperature (data, ) values(? ? ? )");
  
 var tablename = "temperature1";
 var temperature_object = { measure_timestamp : temperature_timestamp, temperature : temperature  };

  knex(tablename).insert( temperature_object ).then(() => {
        console.log("Inserted temperature sample")
        return ("Insert succesful")
    })
        .catch((e) => {
            console.log(e)
            return ("Failed");
})

}



