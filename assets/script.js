// Collects user input and display it in search history
function addResult() {
    var inputCity = document.getElementById("myInput").value;
    if (!inputCity) {
      // Display an error message or take appropriate action
      console.log("Input city is empty");
      return;
    }
    var historyList = getInfo();
  
    var searchCity = $("<div>");
    searchCity.attr("id", inputCity);
    searchCity.text(inputCity);
    searchCity.addClass("h4");
  
    if (!historyList.includes(inputCity)) {
      $(".history").append(searchCity);
    }
  
    $(".subtitle").attr("style", "display:inline");
    addInfo(inputCity);
    fetchWeatherData(inputCity); // Changed from getResult(inputCity)
  }
  
  // Event listener for search history
  $(".history").on("click", function (event) {
    event.preventDefault();
    $(".subtitle").attr("style", "display:inline");
    document.getElementById("myInput").value = event.target.id;
    var inputCity = event.target.id;
  
    // Call the fetchWeatherData function with the inputCity
    fetchWeatherData(inputCity);
  });
  
  // Function to fetch weather data for a given city
function fetchWeatherData(inputCity) {
  var APIKey = "0ca41d124f68a16bcc3e73b56ac60dbb";
  var countryCode = "US";
  var cityCode = encodeURIComponent(inputCity); // Encode the city name
  var geoLon;
  var geoLat;
  var queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityCode +
    "," +
    countryCode +
    "&limit=5&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(function (data) {
      if (data.length === 0) {
        throw new Error("Location not found");
      }

      geoLon = data[0].lon;
      geoLat = data[0].lat;

      var weatherUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        geoLat +
        "&lon=" +
        geoLon +
        "&exclude=minutely,hourly,alerts&units=imperial&appid=" +
        APIKey;

      fetch(weatherUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(function (data) {
          var cityNameElement = document.querySelector('.city');
          cityNameElement.innerHTML = ''; // Clear previous content

          var cityName = document.createElement('h2');
          cityName.textContent = inputCity;

          var date = new Date(data.current.dt * 1000);
          var dateTime = document.createElement('div');
          dateTime.textContent = "(" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ")";

          var temp = document.createElement('div');
          temp.textContent = "Temperature: " + data.current.temp + " F";

          var humidity = document.createElement('div');
          humidity.textContent = "Humidity: " + data.current.humidity + " %";

          var wind = document.createElement('div');
          wind.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";

          var uvIndex = document.createElement('div');
          var uvi = document.createElement('div');
          uvIndex.textContent = "UV Index: ";
          uvi.textContent = data.current.uvi;
          uvIndex.appendChild(uvi);
          uvIndex.classList.add("d-flex");

          if (data.current.uvi < 3) {
            uvi.style.backgroundColor = "green";
          } else if (data.current.uvi < 6) {
            uvi.style.backgroundColor = "blue";
          } else if (data.current.uvi < 8) {
            uvi.style.backgroundColor = "yellow";
          } else if (data.current.uvi < 11) {
            uvi.style.backgroundColor = "purple";
          } else {
            uvi.style.backgroundColor = "red";
          }

          cityNameElement.appendChild(cityName);
          cityNameElement.appendChild(dateTime);
          cityNameElement.appendChild(temp);
          cityNameElement.appendChild(wind);
          cityNameElement.appendChild(humidity);
          cityNameElement.appendChild(uvIndex);

  
            for (var i = 0; i < 5; i++) {
              var containerBlue = $("<div>");
              var futureDate = $("<h>");
              var futureIcon = $("<img>");
              var futureTemp = $("<div>");
              var futureWind = $("<div>");
              var futureHumidity = $("<div>");
              var forecastDay = new Date(data.daily[i].dt * 1000);
              var weatherIcon = data.daily[i].weather[0].icon;
  
              futureDate.text(
                forecastDay.getMonth() +
                1 +
                "/" +
                forecastDay.getDate() +
                "/" +
                forecastDay.getFullYear()
              );
              futureTemp.text("Temperature: " + data.daily[i].temp.day + " F");
              futureWind.text("Wind: " + data.daily[i].wind_speed + " MPH");
              futureHumidity.text(
                "Humidity: " + data.daily[i].humidity + " %"
              );
  
              var DateimgSrc =
                "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
              futureIcon.attr("src", DateimgSrc);
  
              containerBlue.addClass("weather-card");
              containerBlue.append(futureDate);
              containerBlue.append(futureIcon);
              containerBlue.append(futureTemp);
              containerBlue.append(futureWind);
              containerBlue.append(futureHumidity);
  
              $(".five-day").append(containerBlue);
            }
          })
          .catch(function (error) {
            console.log("Error fetching weather data:", error);
          });
      })
      .catch(function (error) {
        console.log("Error fetching location data:", error);
      });
  }
  
  function getInfo() {
    var currentList = localStorage.getItem("city");
    if (currentList !== null) {
      freshList = JSON.parse(currentList);
      return freshList;
    } else {
      freshList = [];
    }
    return freshList;
  }
  
  function addInfo(n) {
    var addedList = getInfo();
  
    if (!addedList.includes(n)) {
      addedList.push(n);
    }
    localStorage.setItem("city", JSON.stringify(addedList));
  }
  
  function renderInfo() {
    var historyList = getInfo();
    for (var i = 0; i < historyList.length; i++) {
      var inputCity = historyList[i];
      var searchCity = $("<div>");
      searchCity.attr("id", inputCity);
      searchCity.text(inputCity);
      searchCity.addClass("h4");
  
      $(".history").append(searchCity);
    }
  }
  
  renderInfo();
  
  