
This temperature sample of tmp36gz sensor. This sample follow Project1 folder source with small modification. Like measurement interval increased to 30 seconds and database located at virtual private server. Temperature data is saved to vps server at mysql database via internet ( distance about 500 kilometer from measurement device) and works non stop from 30th august year 2019 to semptember 17th. It will continue working but I decide do backup and show how big actually datasample is. 


Result with this datasample can be compared with Finland weather service like Ilmatieteenlaitos and Foreca. My own measurement result is very interesting to view in real time like "Internet of things" application and also detect some not predictable bug like shifting +1 second at each 1000th sample. At the moment I don't know reason why some time it delaying 31 seconds instead of 30 seconds as defined in code. It can be server latency or some nodejs library is slow and not correcly synchonized to make always accurate result. This cause some disbalance at long period of time, but in general measurement device works stable and as challenge I can search reason for this action.

https://www.foreca.fi/Finland/Helsinki/havaintohistoria

https://ilmatieteenlaitos.fi/viimeisen-30-vrk-saa

You can compare my temperature sample with more accurate / relevant weather station data and discover that result not match directly, but follow up and down trend in climate change is pretty accurately. For some reason my tmp36gz sensor show temperature 8 celsius degree under as it should be in real life, so I can calibrate result of tmp36gz sensor by incrementing result by +8 for each point when compare it to Ilmatieteenlaitos or Foreca and final result seems to be nearly matching. At this point I learn many things of measurement and have new experience how to improve my appication.

This sample is also good for JQuery datepicker and ChartJS appication , because there is many days sample data to view. This data can be used to check server latency because there is enoght data to make server delay ( my http-response delay is like 2437 miliseconds with 4 megabyte json data. This data can be saved to chache memory like JavaScrit global variable, local storage and cookies and when refresh data it can load only new data ignoring old. This can absord some latency from server , if front-end hold old history data wich not changed.  

Search this folder for sql - file wich is actually mysql - backup version of temperature sample and csv - file if you want to open it at Excel - program or at Libre Office calc.

You can search solution at internet how to import and export MySQL backup. I will also check it in future and update this material to give you example how to do that.