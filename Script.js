let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
let minutes = now.getMinutes();
function min() {
  return (getMinutes() < 10 ? "0" : "") + getMinutes();
} //Not working.

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

function convertToCelsius() {
  let temperature = document.querySelector("#temperature");
  let link = document.querySelector("#celsius");
  link.classList.add("active");
  //let link = document.querySelector("#fahrenheit");
  //link.classList.remove("active");
  temperature.innerHtml = 14; //Not working
}

function convertToFahrenheit() {
  let temperature = document.querySelector("#temperature");
  let link = document.querySelector("#fahrenheit");
  link.classList.add("active");
  //let link = document.querySelector("#celsius");
  //link.classList.remove("active");
  temperature.innerHTML = Math.round((22 * 9) / 5 + 32);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
convertToCelsius();

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searched-text");

  let city = document.querySelector("#city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city.innerHTML = null;
    alert("Please type a city name");
  }

  let apiKey = "c190f24c748e3ec4a42698da3696febd";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
