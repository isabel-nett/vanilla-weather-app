function formatDate() {
  let now = new Date();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = daysOfWeek[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  todayDate = document.getElementById("today-date");
  todayDate.innerHTML=(day + " " + hour + ":" + minutes);
}

formatDate();


let searchBox = document.getElementById("city-input");
let searchButton = document.getElementById("search-button");
let temperature = document.getElementById("temperature");
let cityName = document.getElementById("city-output");
let currentLocation = document.getElementById("use-current-location");
let weatherDescription = document.getElementById("weather-description")
let humidityElement = document.getElementById("humidity")
let windElement = document.getElementById("wind")

function searchCity() {
  let city = searchBox.value  
  let apiKey = "25174e4a6986b7dcdd6d3651f3f8973a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCurrent(position) {
  console.log("searchPosition is working")
  let apiKey = "25174e4a6986b7dcdd6d3651f3f8973a";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
    console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = (currentTemp);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = reponse.data.main.wind;
}

document.querySelector('#search-button').addEventListener("click", searchCity);
document.querySelector('#use-current-location').addEventListener("click", navigator.geolocation.getCurrentPosition(searchCurrent));
