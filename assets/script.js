var APIKey = "0ca41d124f68a16bcc3e73b56ac60dbb";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)