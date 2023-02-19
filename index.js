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

function displayForecast(response) {
console.log(response)

 let forecast = response.data.daily;


  let forecastElement = document.querySelector("#weather_forecast")

  let forecastHTML = `<div class="row row_one">`;

  forecast.forEach(function (dailyForecast){forecastHTML = forecastHTML + `
          <div class="col col_one">
          <div class="forecastDate">${formatDate(dailyForecast.dt)} </div>
            <img src="http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png" alt="">
            <br />
            <div class="temp">20</div>
            Wed
          </div>`;})

  

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {let apiKey = "3f6be1c407b0d9d1933561808db358ba"
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}`
console.log(apiUrl)
axios.get(apiUrl).then(displayForecast)
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

  document.querySelector("#degreeJs").innerHTML = Math.round(5 / 9 * (response.data.main.temp - 32))
  document.querySelector("#humidityDesJs").innerHTML =
    response.data.main.humidity;
  document
    .getElementById("weatherIconJs")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document.querySelector("#currentDateJs").innerHTML = formatDate(
    response.data.dt * 1000
  );

  getForecast(response.data.coord)
  
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