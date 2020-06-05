#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

const char* ssid = "your wifi network name";
const char* password = "your wifi network password";

//ena pin to L298N ( remove jumper) , in1 to L298N in1 , in2 = L298N in2
int ena = 5; // ESP8266 D1-pin ( gpio pin 5)  motor1 pwm / speed signal pin
int in1 = 4; // ESP8266 D2-pin ( gpio pin 4)
int in2 = 0; // ESP8266 D2-pin ( gpio pin 0)



ESP8266WebServer server(80);


void handleRoot() {
 
  server.send(200, "text/plain", "hello from esp8266!");
  
}

void handleNotFound(){
  
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET)?"GET":"POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i=0; i<server.args(); i++){
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  
}

void setup(void){

  pinMode(ena, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  
  //Serial.begin(9600);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.println("IP address: ");
  //Serial.printf(WiFi.localIP());
  //Serial.println((WiFi.localIP().toString()));
    Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.printf("MDNS responder started");
  }

  server.on("/", handleRoot);

  server.on("/inline", [](){
    server.send(200, "text/plain", "this works as well");
  });


  server.on("/on", [](){

      Serial.println("GET /on  with params : " + server.args() );
      Serial.println( server.args() );

      String querystr = "Number of args received:";
      querystr += server.args();            //Get number of parameters
      querystr += "\n";                            //Add a new line

      for (int i = 0; i < server.args(); i++) {

       querystr += "Arg :" + (String)i + " –>  ";   //Include the current iteration value
       querystr += server.argName(i) + ": ";     //Get the name of the parameter
       querystr += server.arg(i) + "\n";              //Get the value of the parameter


       if( server.argName(i) == "speed" ) {

          int speed_value = server.arg(i).toInt();

      
           if(speed_value > 0 && speed_value != 0) {
           //motor rotate forward 

             digitalWrite(in2, LOW);
             digitalWrite(in1, HIGH);

             analogWrite(ena, speed_value);

            
            
            }


          if(speed_value < 0 && speed_value != 0) {
           //motor rotate inverse direction 

            digitalWrite(in1, LOW);
            digitalWrite(in2, HIGH);

            analogWrite(ena, (-1 * speed_value) );



            
          }


          if( speed_value == 0 ) {
            //motor stop

            digitalWrite(in1, LOW);
            digitalWrite(in2, LOW);

            analogWrite(ena, 0 );

            
          }

          

          


          

        
       }

} 
      
    
   Serial.println( querystr );

      
     
    server.send(200, "text/plain", "motor on");
  });

  server.on("/off", [](){

    digitalWrite(in1, LOW);
    digitalWrite(in2, LOW);

    analogWrite(ena, 0 ); 
    
    server.send(200, "text/plain", "motor off");
  });



  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void){
  server.handleClient();
}
