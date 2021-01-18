// Display current weather
function searchCurrentWeather(city) {
    var city = $("#city").val().trim()
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
var indexQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIKey

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
});
}

function getFiveDay(city) {
    var city = $("#city").val().trim()
    var APIKey = "6c07134d45d67e2aa2498bb5c00f8693"
    var fiveQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
 
   // Logging the URL so we have access to it for troubleshooting
  console.log(fiveQueryURL)
  $.ajax({
    url: fiveQueryURL,
    method: "GET"
  }).then(function(response) {
    $("#forecast").text("5-Day Forecast");
    $("#five-day-container").text("")

    var forecast = response.list;
        for(var i=5; i < forecast.length; i=i+8){
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

}









// Click event for search button
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    searchCurrentWeather(city);
    getFiveDay(city);
  });