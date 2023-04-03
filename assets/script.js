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







var APIKey = "0ca41d124f68a16bcc3e73b56ac60dbb";
var city;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)