# Electronics1
arduino, johnny-five and circuit diagram / info

_________________________________________________________


Johny-five installation guide :

Please note that for johnny - five project there is requirement "standrart-firmata" or "standrart firmata plus" modules. This module 
must be loaded to arduino memory before you can run nodejs with johnny-five module, because johnny-five use I2C - protocol from this firmata module.

To load this firmata you have to install arduino ide. In arduino ide software go to: 
File -> Examples -> Firmata -> Standart firmata ( also you can select standart firmata plus, if you have tihs option )  


Linux serial port for arduino :
terminal : ls /dev/tty*    
-> to display ports, check what device apears, when you plug in usb data cable to pc with arduino

-> for example  "/dev/ttyACM2" or "/dev/ttyS0" at my device
-> arduino ide -> tools -> serial port -> /dev/ttyS0

if arduino ide software not displaying serial ports in Linux:
-> try to give right to device using chmod commands , if there is no serial port option in arduino ide.
-> Linux terminal : sudo chmod 777 /dev/ttyS0
_________________________________________________________

Project 1 : Thermometer -TMP 36 (nodejs - johnny-five) 

-> Project require Uno Arduino R3 and thermometer tmp 36 sensor to
measure temperature data

-> This is modified version from original. I made express -  and mysql - knex module 
extenssion for project to save and display history data of temperature with 10 second measure interval 
to detect new temperature.

-> It will contains hosted html page (in future), where ajax call asking temperature and visualize it at client side using chartjs.

Original source to project :

http://johnny-five.io/examples/temperature-tmp36/

__________________________________________________________


Project 2 : Logic gates ( arduino not required, just gate chip, wires and 9 voltage battery )

1. Project 2 folder "or_gate.png" picture show closed diagram of OR gate logic using sn7432n chip.

![Alt text](Project2/or_gate.png?)

2. Project 2 folder "and_gate.png" picture show closed diagram of AND gate logic using sn74hct08 chip.

![Alt text](Project2/and_gate.png?)

3. Project 2 folder "not_gate.png" picture show closed diagram of NOT gate logic using 74hct04n(philips) chip, 
NOT GATE also means inverter / hex inverter chip.

![Alt text](Project2/not_gate.png?)

Info : when check this diagram you can be confused about how switches works in practical way. 
That in "OR"- and "AND"-gates switch present 1 in truth table as open ( not electricity flow) and 0
means there is electricty, but led ( light emitting diode ) present oposite logic, where 0 means that 
led is off and 1 means there is light in led.


__________________________________________________________


Project 3 : Motors ( express and Johnny-five project on nodejs )

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

-> go to browser and go to folowing url : 
http://192.168.100.10:1111/off
http://192.168.100.10:1111/on

Motor rotate forward: 
http://192.168.100.10:1111/on?speed=100
Motor rotate inverse direction: 
http://192.168.100.10:1111/on?speed=-100
Motor stop:
http://192.168.100.10:1111/on?speed=0
or 
http://192.168.100.10:1111/off

Please also note that when you get speed 0 value then just 
http://192.168.100.10:1111/on
not enought . You should call speed with parameter (1 to 255) or (-1 to -255) to make motor spin.


Warning. Big current is not good for motor ! This means that values (1 to 80) and (-1 to -80) 
not suggested. Try to use more than 100 or -100.

Warning ! Avoid also connect motors directly to "arduino"- or "raspberry pi"- pins. Motor current
can damage microcontrollers pins, because thouse pins operate with 20mA current and motor current
can go over 150mA.

__________________________________________________________
...........

Git project links :

Add image to README.md on GitHub

https://stackoverflow.com/questions/14494747/add-images-to-readme-md-on-github






