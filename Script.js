let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

h2.innerHTML = `${day},    ${hours}:${minutes}`;

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = response.data.main.pressure;
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#next-hours");
  let forecast = response.data.list[0];
  console.log(forecast);
  forecastElement.innerHTML = `
  <div class="col-2 forecast">
          <h6 class="font-family-sans-serif">${formatHours(
            forecast.dt * 1000
          )}</h6>
          <img scr="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
          <div class="forecast-temperature">${Math.round(
            (forecast.main.temp_max + forecast.main.temp_min) / 2
          )}°</div>
        </div>
        `;

  forecast = response.data.list[1];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <div class="col-2 forecast">
          <h6 class="font-family-sans-serif">${formatHours(
            forecast.dt * 1000
          )}</h6>
          <img scr="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
          <div class="forecast-temperature">${Math.round(
            (forecast.main.temp_max + forecast.main.temp_min) / 2
          )}°</div>
        </div>
        `;

  forecast = response.data.list[2];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <div class="col-2 forecast">
          <h6 class="font-family-sans-serif">${formatHours(
            forecast.dt * 1000
          )}</h6>
          <img scr="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
          <div class="forecast-temperature">${Math.round(
            (forecast.main.temp_max + forecast.main.temp_min) / 2
          )}°</div>
        </div>
        `;

  forecast = response.data.list[3];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <div class="col-2 forecast">
          <h6 class="font-family-sans-serif">${formatHours(
            forecast.dt * 1000
          )}</h6>
          <img scr="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
          <div class="forecast-temperature">${Math.round(
            (forecast.main.temp_max + forecast.main.temp_min) / 2
          )}°</div>
        </div>
        `;

  forecast = response.data.list[4];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <div class="col-2 forecast">
          <h6 class="font-family-sans-serif">${formatHours(
            forecast.dt * 1000
          )}</h6>
          <img scr="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
          <div class="forecast-temperature">${Math.round(
            (forecast.main.temp_max + forecast.main.temp_min) / 2
          )}°</div>
        </div>
        `;
}
function search(city) {
  let apiKey = "c190f24c748e3ec4a42698da3696febd";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemperature);
  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("New York");
