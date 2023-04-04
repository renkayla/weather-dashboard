// collects user input and display in search history
function addResult(){

    inputCity = document.getElementById("myInput").ariaValueMax;
    historyList = getInfo();
    var searchCity =$("<div>")
    searchCity.attr('id',inputCity)
    searchCity.text(inputCity)
    searchCity.addClass("h4")

    if (historyList.inclues(inputCity) === false){
        $(".history").append(searchCity)
    }
    $(".subtitle").attr("style","display:inline")
    addInfo(inoutCity);
};

//event listener to search history
$(".history").on('click', function(event){
    event.preventDefault();
    $(".subtitle").attr("style","display:inline")
    document.getElementById("myInput").value = event.target.id;
    getresult();
});

//add listener to search button
document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener('click', getResult);


// function to view current weather conditioins for that city
function getResult(){

    $(".five-day").empty();
    $(".city").empty;

    inputCity = document.getElementById("myInput").value;
    var countryCode='US';
    var cityCode=inputCity;

    var geoLon;
    var geoLat;

    var uvIndex = $("<div>")
    var cityName = $("<h>")
    var dateTime = $("<div>")
    var temp = $("<div>")
    var icon =$("<img>")
    icon.addClass("icon");
    var wind = $("<div>")
    var humidity = $("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityName)
    $(".city").append(dateTime)
    $(".city").append(icon)
    $(".city").append(temp)
    $(".city").append(wind)
    $(".city").append(humidity)
    $(".city").append(uvIndex)

}

var APIKey = "0ca41d124f68a16bcc3e73b56ac60dbb";
var city;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityCode + "," + countryCode + "&appid=" + APIKey;

fetch(queryURL)

.then(function (response) {
    return response.json();
})

.then(function (data) {
    geoLon = data[0].lon;
    geoLat = data[0].lat;
})

var weatherUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + getLat + "&lon="+ geoLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=ca41d124f68a16bcc3e73b56ac60dbb";
 fetch(weatherUrl)

 .then(function (response) {
    return response.json();

 })
 .then(function (data) {

    weatherIcon= data.current.weather[0].icon;
    imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
    icon.attr('src', imgSrc)

    cityName.text(cityCode);

    var date = new Date(data.current.dt * 1000);
    dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

    temp.text("Temperature: "+ data.current.tempt + " F");
    humidity.text("Humidity: " + data.current.humidity + " %");
    wind.text("Wind Speed: " + data.current.wind_speed + " MPH");
    

    var uvi =$("<div>")
    uvIndex.text("UV Index: ");
    uvi.text(data.current.uvi)
    uvIndex.append(uvi)
    uvIndex.addClass("d-flex")

    if (data.current.uvi < 3){
        uvi.attr("style", "background-color:green; color:black; margin-left: 5px")
    } else if (data.current.uvi < 6) {
        uvi.attr("style", "background-color:blue; color:black; margin-left: 5px")
    } else if (data.current.uvi < 8) {
        uvi.attr("style", "background-color:yellow; color:black; margin-left: 5px")
    } else if (data.current.uvi <11) {
        uvi.attr("style", "background-color:purple; color:black; margin-left: 5px")
    } else {
        uvi.attr("style", "background-color:red; color:black; margin-left: 5px")
    }


    var containerBlue =$("<div>")
    this["futureDate"+i] = $("<h>") 
    this["futureIcon"+i] = $("<img>")
    this["futureTemp"+i] = $("<div>")
    this["futureWind"+i] = $("<div>")
    this["futureHumidity"+i] = $("<div>")
    this["forecastDay"+i] = new Date(data.daily[i].dt * 1000);

    (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay+i"]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
    (this["futreTemp"+i]).text("Temperature:"+ data.daily[i].temp.day + " F");
    (this["futureWind"+i]).text("Wind: "+ data.daily[i].wind_speed+ " MPH");
    (this["futureHumidity"+i]).text("Humidity: " + data.daily[i].humidity + " %");
    (this["weatherIcon"+i])= data.daily[i].weather[0].icon);

    DateimgSrc = "https://openweathermap.org/img/wn" + (this["weatherIcon"+i]) + ".png";
    (this["futureIcon"+i]).attr('src',DateimgSrc)

    $(".five-day").append(containerBlue)
    containerBlue.append((this[""+i]));
    containerBlue.append((this[""+i]));
    containerBlue.append((this[""+i]));
    containerBlue.append((this[""+i]));
    containerBlue.append((this[""+i]));

    containerBlue.addClass("weather-card")
)};

function getInfo() {
    var currentList = localStorage.getItem("city");
    if (currentList !== null){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList [];
}

function addInfo (n) {
    var addedList = getInfo();

    if (historyList.inclues(inputCity) === false) {
        addedList.push(n);
    }
    localStorage.setItem("city", JSON.stringify(addedList));

};

function renderInfo () {
    var historyList = getInfo();
    for (var i = 0; i < historyList.length; i++) {
        var inputCity = historyList[i];
        var searchCity= $("<div>")
        searchCity.attr('id',inputCity)
        searchCity.text(inputCity)
        searchCity.addClass("h4")

        $(".history").append(searchCity)
    }
};

renderInfo();