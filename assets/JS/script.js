let citiesSearched = []
$(document).ready(function () {
const city = "";
const searchHistoryList = document.querySelector("#searchHistoryList");
function init() {
    const storedsearchedCities = JSON.parse(
    localStorage.getItem("citiesSearched")
    );
    if (storedsearchedCities !== null) {
        citiesSearched = storedsearchedCities;
      }
   
} 

init();
    // function to add buttons for recent searches
function renderButtons() {
    searchHistoryList.innerHTML = "";
    $('#searchHistoryList').empty();
    for (var i = 0; i < citiesSearched.length; i++) {
        var a = $("<button>") 
        a.addClass("city-button shadow p-3 rounded");
        a.attr("data-name", citiesSearched[i]);
        var buttonText = citiesSearched[i].charAt(0).toUpperCase() + citiesSearched[i].slice(1)
        a.text(buttonText);
        $("#searchHistoryList").append(a)
        
        }
    }
// function to display weather of previously searched city
$(document).on('click', '.city-button', function() {
    searchCurrentWeather($(this).text());
});    
    renderButtons();


$("#run-search").on("click", function(event) {
    event.preventDefault();
    var city = $("#city").val().trim();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    searchCurrentWeather(city);
    $("#searchHistoryList").on("click"), function(event) {
        event.preventDefault();
        var city = $(this).text()
        searchCurrentWeather(city);
    }

    citiesSearched.push(city);
    city.value="";
    function storesearchedCities() {
        localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched));
    }
    
    
    storesearchedCities();
    renderButtons();
});


// Function to display current & 5 day weather
function searchCurrentWeather(city) {
    var APIKey = "6c07134d45d67e2aa2498bb5c00f8693"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
 
   // Logging the URL so we have access to it for troubleshooting
  console.log(queryURL)
 
// API call for current city name, icon, temp, humidity, wind speed
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
var today = moment().format("l")
var cityName = response.name + " (" + today + ")"
var currentIconCode = response.weather[0].icon
var iconURL = "http://openweathermap.org/img/wn/" + currentIconCode + "@2x.png"
var temperatureF =  (response.main.temp - 273.15) * 1.80 + 32;
var humidity = response.main.humidity
var windSpeed = response.wind.speed
var lat = response.coord.lat;
var long = response.coord.lon;
var indexQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;
var fiveQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

$("#current-city-wind").html("<p>Wind Speed: " + windSpeed + " MPH")
$("#current-city-humidity").html("<p>Humidity: " + humidity + "%</p>")
$("#current-city-temp").html("<p>Temperature: " + temperatureF.toFixed(1) + "&deg; F</p>")
$("#current-city").text( cityName )
$("#wicon").attr("src", iconURL)


 console.log(indexQueryURL)
// API call for current UV index
$.ajax({
    url: indexQueryURL,
    method: "GET",
  }).then(function(response) {
    var UVIndex = response.value
    
    $("#current-city-UV").text("UV Index: ");
    UVIndexValue = document.createElement("span")
    UVIndexValue.textContent = UVIndex
    if (UVIndex <= 2){
        UVIndexValue.classList = "favorable"
    } else if (UVIndex > 2 && UVIndex <= 5) {
        UVIndexValue.classList = "moderate"
    } else if (UVIndex > 5 && UVIndex <= 7) {
        UVIndexValue.classList = "high"
    } else if (UVIndex > 7 && UVIndex <= 10) {
        UVIndexValue.classList = "severe"
    } else if (UVIndex >= 11) {
        UVIndexValue.classList = "extreme"
    }
    $("#current-city-UV").append(UVIndexValue)
  });

  // API call for 5 day forecast
  $.ajax({
    url: fiveQueryURL,
    method: "GET"
  }).then(function(response) {
    $("#forecast").text("5-Day Forecast");
    $("#five-day-container").text("")

    var forecast = response.list;
        for(var i=6; i < forecast.length; i=i+8){
            var dailyForecast = forecast[i]

            var forecastEl=document.createElement("div");
            forecastEl.classList = "card text-light m-2 col-md-2 col-sm-12 forecast";

            // date element
            var forecastDate = document.createElement("h5")
            forecastDate.textContent = moment.unix(dailyForecast.dt).format("l");
            forecastDate.classLIst = "card-header text-center"
            forecastEl.appendChild(forecastDate)

            //create an image element
       var weatherIcon = document.createElement("img")
       var iconCode = dailyForecast.weather[0].icon;
       var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
       weatherIcon.classList = "card-img";
       weatherIcon.setAttribute("src",  iconURL);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body";
       forecastTempEl.textContent = "Temp: " + dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body";
       forecastHumEl.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);   

        // console.log(forecastEl);
       //append to five day container
        $("#five-day-container").append(forecastEl);
         }
  });
});


}

// function getFiveDay(city) {
//     var APIKey = "6c07134d45d67e2aa2498bb5c00f8693"
//     var fiveQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
 
//    // Logging the URL so we have access to it for troubleshooting
//   console.log(fiveQueryURL)
  
}



);