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


var cityName = response.name
$("#current-city").text( cityName )

var currentIconCode = response.weather[0].icon
var iconURL = "http://openweathermap.org/img/w/" + currentIconCode + ".png"
$("#wicon").attr("src", iconURL)

var temperatureF =  (response.main.temp - 273.15) * 1.80 + 32;
$("#current-city-temp").html("<p>Temperature: " + temperatureF.toFixed(1) + "&deg; F</p>")

var humidity = response.main.humidity
$("#current-city-humidity").html("<p>Humidity: " + humidity + "%</p>")

var windSpeed = response.wind.speed
$("#current-city-wind").html("<p>Wind Speed: " + windSpeed + " MPH")


  });
}






$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    searchCurrentWeather(city);
  });