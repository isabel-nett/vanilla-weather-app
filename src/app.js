let searchBox = document.getElementById("city-input");
let searchButton = document.getElementById("search-button");
let temperature = document.getElementById("temperature");
let cityName = document.getElementById("city-output");
let currentLocation = document.getElementById("use-current-location");
let weatherDescription = document.getElementById("weather-description");
let humidityElement = document.getElementById("humidity");
let windElement = document.getElementById("wind");
let iconElement = document.getElementById("weather-icon");
let farenheitLink = document.getElementById("farenheit");
let celciusLink = document.getElementById("celcius");

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
  if (hour < 10) {
      hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  };

  todayDate = document.getElementById("today-date");
  todayDate.innerHTML=(day + " " + hour + ":" + minutes);
}

function searchCity(event) {
  event.preventDefault();
  let city = searchBox.value;
  let apiKey = "25174e4a6986b7dcdd6d3651f3f8973a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCurrent(position) {
  let apiKey = "25174e4a6986b7dcdd6d3651f3f8973a";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  celciusTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = (celciusTemp);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFTemp(event) {
    event.preventDefault();
    celciusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    let farenheitTemp = (celciusTemp * 9) / 5 + 32;
    temperature.innerHTML = Math.round(farenheitTemp);
}

function displayCTemp(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    farenheitLink.classList.remove("active");
    temperature.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

document.querySelector('#farenheit').addEventListener("click", displayFTemp);
document.querySelector('#celcius').addEventListener("click", displayCTemp);
document.querySelector('#search-button').addEventListener("click", searchCity);
document.querySelector('#use-current-location').addEventListener("click", navigator.geolocation.getCurrentPosition(searchCurrent));
formatDate();