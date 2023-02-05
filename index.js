function formatDate(timestamp) {
  let currentDate = document.querySelector("#dateJs");

  let now = new Date();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minuets = now.getMinutes();
  if (minuets < 10) {
    minuets = `0${minuets}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  return `${day} ${hour}:${minuets}`;
}

function displayWeatherConditions(response) {
  console.log(response);
  document.querySelector("#cityNameJs").innerHTML = response.data.name;
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
  document.querySelector("#degreeJs").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#windDesJs").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidityDesJs").innerHTML =
    response.data.main.humidity;
  document
    .getElementById("weatherIconJs")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document.querySelector("#dateJs").innerHTML = formatDate(
    response.data.dt * 1000
  );
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
