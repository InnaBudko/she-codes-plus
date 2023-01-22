// Feature #1
// Display the current date and time using JavaScript: Tuesday 16:00
function getWeekDay(date = new Date()) {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function getHoursAndMinutes(date = new Date()) {
  return padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes());
}

function padTo2Digits(num) {
  return String(num).padStart(2, "0");
}

let dayAndTime = document.querySelector("#day-and-time");
let currentDate = getWeekDay() + " " + getHoursAndMinutes();
dayAndTime.innerHTML = currentDate;

// Feature #2
// when a user searches for a city (example: New York), it should display
// the name of the city on the result page and the current temperature of the city.
function showError(searchedCity) {
  let error = document.querySelector("#error-placeholder");
  if (searchedCity) {
    error.innerHTML = `Sorry, we could not find ${searchedCity} city`;
  } else {
    error.innerHTML = `Please enter a city name`;
  }
}

function cleanErrorMessage() {
  let error = document.querySelector("#error-placeholder");
  error.innerHTML = "";
}

function handleSearchEvent(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input").value;
  searchCity(cityName);
  document.querySelector("#search-form").reset();
  cleanErrorMessage();
}
function searchCity(cityName) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios
    .get(endpoint)
    .then(updateWeatherData)
    .catch(function (error) {
      console.log(error);
      showError(cityName);
    });
}

function updateWeatherData(response) {
  console.log(response);
  let currentTemperature = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#city");
  let currentDescription = document.querySelector("#weather-description");
  let currentHumidity = document.querySelector("#humidity-data");
  let currentWind = document.querySelector("#wind-data");
  document.getElementById(
    "current-weather-icon"
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].main;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchEvent);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearchEvent);

searchCity("Kyiv");

//Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#current-temp");
//   let buttonCelsius = document.querySelector("#buttonCelsius");
//   let buttonFahrenheit = document.querySelector("#buttonFahrenheit");
//   temperature.innerHTML = 19;
//   buttonCelsius.style.opacity = "1";
//   buttonFahrenheit.style.opacity = "0.6";
// }

// function convertToFahrenheiht(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#current-temp");
//   let buttonCelsius = document.querySelector("#buttonCelsius");
//   let buttonFahrenheit = document.querySelector("#buttonFahrenheit");
//   temperature.innerHTML = 66;
//   buttonCelsius.style.opacity = "0.6";
//   buttonFahrenheit.style.opacity = "1";
// }

// let fahrenheit = document.querySelector("#today-fahrenheit");
// fahrenheit.addEventListener("click", convertToFahrenheiht);

// let celsius = document.querySelector("#today-celsius");
// celsius.addEventListener("click", convertToCelsius);
