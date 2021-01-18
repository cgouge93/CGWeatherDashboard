function searchCurrentWeather(city) {
    var city = $("#city").val().trim()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6c07134d45d67e2aa2498bb5c00f8693";
    console.log(queryURL)
 
   // Logging the URL so we have access to it for troubleshootingdddddddddddddddd
  console.log(queryURL)
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
var currentInfo = JSON.stringify(response);
var currentWeatherDiv = $("<div>");
  currentWeatherDiv.className = "row border selected-city";


var cityName = response.name
currentWeatherDiv.prepend("<h2>"+ cityName +"</h2>")

var currentIconCode = response.weather[0].icon
var iconURL = "http://openweathermap.org/img/w/" + currentIconCode + ".png"
$("#wicon").attr("src", iconURL)

var temperature = response.main.temp
currentWeatherDiv.prepend("<p>Temperature: " + temperature + "</p>")
console.log(temperature)

var humidity = response.main.humidity
currentWeatherDiv.prepend("<p>Humidity: " + humidity + "</p>")

var windSpeed = response.wind.speed
currentWeatherDiv.prepend("<p>Wind Speed: " + windSpeed + " MPH")

var UVIndex = response.name
var nameEl = $("<h2></h2>").text(name)
bandDiv.prepend(nameEl)

// Note: Append actual HTML elements, not just text
$("#current-conditions").prepend(currentWeatherDiv)
  });
}






$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    searchCurrentWeather(city);
  });