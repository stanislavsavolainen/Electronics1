# Electronics1
arduino, johnny-five and circuit diagram / info

_________________________________________________________


Johnny-five installation guide :

Please note that for johnny - five project require "standrart-firmata" or "standrart firmata plus" program. This program 
must be loaded to arduino memory before you can run NodejS with johnny-five library, because johnny-five use I2C - protocol from Firmata program.

To load Firmata program in arduino memory you have to install arduino ide software. In arduino ide software go to: 

```File -> Examples -> Firmata -> Standart firmata``` 

( also you can select standart firmata plus, if you have this option )  


To display all devices and find out serial ports for arduino in Linux , enter in terminal :
 
```ls /dev/tty*``` 
   
-> Check what device apears, when you plug in usb data cable to pc with arduino and display list of devices again

-> for example  ```/dev/ttyACM2``` or ```/dev/ttyS0```  my devices displayed

-> At Arduino ide software to check device option go to: 
```-> tools -> serial port -> /dev/ttyS0```

if arduino ide software not displaying serial ports in Linux:
-> try to give rights to device using chmod commands , if there is no serial port option in arduino ide, then run in Linux terminal : 

```sudo chmod 777 /dev/ttyS0```

( Assuming that arduino using ttyS0 - device port for data between pc and arduino)
_________________________________________________________

Project 1 : Thermometer -TMP 36 (nodejs - johnny-five) 

-> Project require Uno Arduino R3 and thermometer tmp 36 sensor to
measure temperature data

-> This is modified version from original where temperature measurement happens every 10 seconds interval . I made express -  and mysql - knex library 
extenssion for project to save values in mysql-database and display history data in browser via http-protocol(express - library).

-> It will contains hosted html page (in future), where ajax call asking temperature and visualize it at client side using chartjs.

Original source to project :

http://johnny-five.io/examples/temperature-tmp36/

__________________________________________________________


Project 2 : Logic gates ( arduino not required, just gate chip, wires, switches, led and 9 voltage battery )

1. Project 2 folder "or_gate.png" picture show of OR-gate circuit diagram logic using sn7432n chip.

![Alt text](Project2/or_gate.png?)

2. Project 2 folder "and_gate.png" picture show  of AND-gate circuit diagram logic using sn74hct08 chip.

![Alt text](Project2/and_gate.png?)

3. Project 2 folder "not_gate.png" picture show  of NOT-gate circuit diagram logic using 74hct04n(philips) chip, 
NOT GATE also means inverter / hex inverter chip.

![Alt text](Project2/not_gate.png?)

Info : when you check this diagram you can be confused about how switches works in practical way. 
"OR"- and "AND"-gates present 1 in truth table when switch is off ( not electricity flow) and 0 switch is on
 (there is electricty) , but for led ( light emitting diode ) there is oposite logic, where 0 means that 
led is off and 1 means there is on , so there is light in led when truth table show output as value 1.


__________________________________________________________


Project 3 : Motors ( express and Johnny-five project on nodejs )

Miniature small Electric DC Motor 1.5V - 4.5V Model Robots ( my motor model ) 

-> project require Uno Arduino R3, H-bridge (like L9110 H-bridge module) and motor
-> standart dc motor 3 - 5 voltage with 150 - 200 mA current
-> connect motor to L9110 h-bridge two first pins from left where two big green socets with 2 pins both .
-> connect h-bridge L9110 to arduino 4 wires ( oposide site from 2 big green socets where 6 pins)
-> for this 4 wires check following :
   1. L9110 VCC connect to arduino 5 voltage pin
   2. L9110 GND connect to arduino gnd pin
   3. L9110 first left pin go to arduino pin 3
   4. L9110 second left pin go to arduino pin 13

Original source to project :
http://johnny-five.io/examples/motor-hbridge/

-> now for lauching this project  go to Project3 folder and run "npm install", because
there is package.json file with all required library information to install. Then type "node motor.js"

-> go to browser and go to folowing url , to stop motor  ```http://192.168.100.10:1111/off``` and to start motor ```http://192.168.100.10:1111/on```


Motor rotate forward: 
```http://192.168.100.10:1111/on?speed=100```

Motor rotate inverse direction: 
```http://192.168.100.10:1111/on?speed=-100```

Motor stop:
```http://192.168.100.10:1111/on?speed=0``` or  ```http://192.168.100.10:1111/off``` 


Please note , when you call speed  with 0 value then just ```http://192.168.100.10:1111/on``` without parameter
is not enought anymore . You should call speed with parameter (1 to 255) or (-1 to -255) to make motor spin again.

```diff
-Warning. Big current is not good for motor ! This means that values (1 to 80) and (-1 to -80) 
-not suggested. Try to use more than 100 or -100.

-Warning ! Avoid also connect motors directly to "arduino"- or "raspberry pi"- pins. Motor current
-can damage microcontrollers pins, because thouse pins operate with 20mA current and motor current
-can go over 150mA.
```


__________________________________________________________


Project 3 b: Motor ( Esp8266 and L298N where connected to 12 Voltage 775 DC motor)

Start and stop motor in web-browser. 

ESP8266 ( wifi arduino) make http-server wich is connected to L298N h-bridge). Motor controller can start, stop , change, rotate direction and pwm speed. 
Like I did in previous project 3 where L9110 h-bridge work with johnny-five. I did "pure arduino ide project" using several esp8266 tutorial" and 12 Voltage RS550 dc motor 
with current like (1,5A without load RS550 ) .

ESP32 is new model of ESP8266. Both are wifi arduino. I am using ESP8266.


- 775 DC 12V-36V 3500-9000RPM Motor Brushed Large Torque High Power Low Noise  ( my motor model ) only 350mA without load and low noice


- 12V RS550 19500 RPM DC Motor High Torque Gear Box for Electric Drill Screwdriver ( my motor model ) 1,5 A  Motor speed not working with this motor


- Miniature small Electric DC Motor 1.5V - 4.5V Model Robots ( my motor model ) also tested on L9110 and L298N with 4,5 Voltage battery 
This motor used in Project 3  ( my first motor project and johnny-five)


```diff

-Warning ! Don't use RS550 or johnson rs-775 DC-motor with L9110 h-bridge controller. Some motor have bigger current and voltage than motor controller can tolerate.
-Measure motor current first before select h-bridge for it. L9110 max current is 800mA and 12 Voltage wich is not suitable for this connection.

-Multimeter max current is 250mA in generaly ( rs550/rs775 dc motor current cannot be measured by multimeter at this setup. Search for ampermeter wich is rated for 10A and 12 Voltage.
- Ampermeter work only when current is one direction when, when motor H-bridge will change current direction and Ampermeter will not show value. 

```


You can use "Angry Ip Scanner" software to find ESP8266 ip-address in your private network or get info from arduino ide serial monitor.


Motor rotate forward: 
```http://your-esp8266-ip-address/on?speed=100```

Motor rotate inverse direction: 
```http://your-esp8266-ip-address/on?speed=-100```

Motor stop: 
```http://your-esp8266-ip-address/on?speed=0```


Relevent links :


    https://randomnerdtutorials.com/esp32-servo-motor-web-server-arduino-ide/
    
    https://techtutorialsx.com/2016/10/22/esp8266-webserver-getting-query-parameters/
    
    https://github.com/esp8266/ESPWebServer/blob/master/examples/HelloServer/HelloServer.ino
    
    http://embedded-lab.com/blog/tutorial-5-setting-esp8266-web-server/
    
    
    https://www.quora.com/How-do-I-get-the-IP-address-of-the-Wi-Fi-Module-ESP-8266
    
    https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/
    
    https://www.instructables.com/id/Interface-L298N-Using-NodeMCU/


__________________________________________________________

Project 4 : LCD Display ( Uno Arduino R3 and LCD 1602 display )

-> this display can display only 16x2 characters and only ascii values. Unicode characters are not supported.

-> my pins not match with original project, because I did other connection with this lcd display and instead of make same
wire connection I modified pins in code.   


-> Search from google.com  "lcd 16x2 pins" or "lcd 1602 pins" and check then images to figure out this display properties

-> to use my verion of application you can just start lcd_display_with_http.js like my previous nodejs & johnny five project

-> to display text on lcd screen you can use hosted html file or put following url to browser:

```http://127.0.0.1:1111/write?row1=hello&row2=world``` 

-> Now you can see at first row ```hello``` and at second ```world``` 

![Alt text](Project4/images/IMG_20190828_000936_scaled1.png?)

![Alt text](Project4/images/IMG_20190828_001903_scaled1.png?)

Original source to project:

http://johnny-five.io/examples/lcd/

__________________________________________________________

...........

Git project links :

Add image to README.md on GitHub

https://stackoverflow.com/questions/14494747/add-images-to-readme-md-on-github

How to add color to Github's README.md file:

https://stackoverflow.com/questions/11509830/how-to-add-color-to-githubs-readme-md-file







