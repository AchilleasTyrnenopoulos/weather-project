const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
  });

  //res.send("server is up and running");

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "01c2438054cefe3728b650e3458c884b";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDescript = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imgURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
       res.write("<p>The weather is currently " + weatherDescript + "</p>");
       res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
       res.write("<img src="+ imgURL + ">");
       res.send();
    });
  });
});


/*

*/

app.listen(3000, function(){
  console.log("server is listening to port 3000");
});
