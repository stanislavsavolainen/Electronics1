// Print IR Buttons to Serial Monitor
// TheGeekPub.com
 
#include <IRremote.h>
 
// Define the pin for the IR Receiver
const int IR_RECV_PIN = 3;

int red_light_pin= 11;
int green_light_pin = 10;
int blue_light_pin = 9;

 
// Create the IR object
IRrecv gpirrecv(IR_RECV_PIN);
decode_results results;

void RGB_color(int red_light_value, int green_light_value, int blue_light_value)
 {
  analogWrite(red_light_pin, red_light_value);
  analogWrite(green_light_pin, green_light_value);
  analogWrite(blue_light_pin, blue_light_value);
}

 
void setup(){

  pinMode(red_light_pin, OUTPUT);
  pinMode(green_light_pin, OUTPUT);
  pinMode(blue_light_pin, OUTPUT);
  
  Serial.begin(9600);
  gpirrecv.enableIRIn();
  gpirrecv.blink13(true);
  Serial.println("READY.");
}
 
void loop(){
  if (gpirrecv.decode(&results)){
  Serial.println(results.value, HEX);

  int button_value = results.value;

    Serial.println(button_value);



  //tv remote control red button
  if( results.value == 0xC1CC629D || results.value == 0x20FFD02F ) {
    RGB_color(255, 0, 0); // Red  
  }

   //tv remote control blue button
  if( results.value == 0xC1CC926D || results.value ==  0x20FFF00F ) {
    RGB_color(0, 0, 255); // Blue
  }
  
   //tv remote control green button
  if( results.value == 0x20FFB04F || results.value ==  0xC1CCE21D ) {
     RGB_color(0, 255, 0); // Green 
  }

  //tv remote control yellow button
  if( results.value == 0xC1CC12ED || results.value == 0x20FF708F ) {
     RGB_color(255, 255, 0); // Yellow 
  }


  

   
  
  gpirrecv.resume();
}
}
