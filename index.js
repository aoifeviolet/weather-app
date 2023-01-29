let currentTime = document.querySelector("#currentTimeJs");
let currentDate = document.querySelector("#currentDateJs");

let now = new Date();

let hour = now.getHours();
let minuets = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

currentTime.innerHTML = `${hour}:${minuets}`;
currentDate.innerHTML = `${day}`;

function displayWeatherConditions(response) {
  console.log(response);
  document.querySelector("#cityNameJs").innerHTML = response.data.name;
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
  document.querySelector("#degreeJs").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentTimeJs").innerHTML = response.data.timezone;
}

function cityApi(newCityName) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=1266ad07b66517497b1acf79ea5a6a64&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function cityInput(event) {
  event.preventDefault();
  let newCityName = document.querySelector("#city_input").value;
  let newCityNameInput = document.querySelector("#cityNameJs");
  cityApi(newCityName);
}

let newCity = document.querySelector("#topnavJs");

newCity.addEventListener("submit", cityInput);
