var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function search(city = "cairo") {
  try {
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6cf72426a58d4092a92221213241112&q=${city}&days=4`
    );
    var data = await response.json();
    displayCurrent(data.location, data.current);
    displayForecast(data.forecast.forecastday);
  } catch (error) {
    console.log("Fetch error:", error);
    document.getElementById(
      "weatherData"
    ).innerHTML = `<p class="text-danger">Failed to fetch weather data. Please try again.</p>`;
  }
}

document.getElementById("search").addEventListener("keyup", function (e) {
  if (e.target.value.length > 2) {
    search(e.target.value);
  }
});

function displayCurrent(location, current) {
  if (!current) return;
  var date = new Date(current.last_updated.replace(" ", "T"));
  var content = `
    <div class="row justify-content-center">
      <div class="col-lg-4 p-0 my-1">
        <div class="d-flex justify-content-between align-items-center dark-gray pt-1">
          <p class="fs-6 m-2">${days[date.getDay()]}</p>
          <p class="fs-6 m-2">${date.getDate()} ${
    monthNames[date.getMonth()]
  }</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column gray py-4">
          <p class="fs-3">${location.name}</p>
          <p class="fs-1 fw-bolder">${current.temp_c} <sup>o</sup> C</p>
          <img src="https:${current.condition.icon}" alt="${
    current.condition.text
  }" class="w-25 mb-2">
          <p class="fs-6 text-info">${current.condition.text}</p>
          <div>
            <i class="fa-solid fa-umbrella text-white-50 m-3 fs-5"> ${
              current.precip_mm
            } mm</i>
            <i class="fa-solid fa-wind text-white-50 m-3 fs-5"> ${
              current.wind_kph
            } km/h</i>
            <i class="fa-solid fa-compass text-white-50 m-3 fs-5"> ${
              current.wind_dir
            }</i>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("weatherData").innerHTML = content;
}

function displayForecast(forecastDays) {
  var content = '<div class="row">';
  for (var i = 1; i < forecastDays.length; i++) {
    const date = new Date(forecastDays[i].date.replace(" ", "T"));
    content += `
      <div class="col-lg-4 p-0">
        <div class="d-flex justify-content-center align-items-center ${
          i % 2 === 0 ? "dark" : "dark-gray"
        } pt-2">
          <p class="fs-6">${days[date.getDay()]}</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column ${
          i % 2 === 0 ? "darker" : "gray"
        } py-5">
          <img src="https:${forecastDays[i].day.condition.icon}" alt="${
      forecastDays[i].day.condition.text
    }" class="w-25">
          <p class="fs-4">${forecastDays[i].day.maxtemp_c} <sup>o</sup> C</p>
          <p class="fs-6">${forecastDays[i].day.mintemp_c} <sup>o</sup> C</p>
          <p class="fs-6 text-info">${forecastDays[i].day.condition.text}</p>
        </div>
      </div>
    `;
  }
  content += "</div>";
  document.getElementById("weatherData").innerHTML += content;
}

search();
