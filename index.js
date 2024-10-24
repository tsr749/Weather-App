const apiKey = "79c0d2cd9b669a2cb41aacc38dedcc42";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");

//time
const now = new Date();
let currentTime = now.toLocaleTimeString();

//date
const currentDate = now.toLocaleDateString();

// // Your timestamps
// let sunriseTimestamp = 1729645246 * 1000; // Convert to milliseconds
// let sunsetTimestamp = 1729687003 * 1000; // Convert to milliseconds
// // Convert to IST
// let sunriseDate = new Date(sunriseTimestamp);
// let sunsetDate = new Date(sunsetTimestamp);
// // IST offset
// let istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
// // Adjust for IST
// sunriseDate.setTime(sunriseDate.getTime() + istOffset);
// sunsetDate.setTime(sunsetDate.getTime() + istOffset);
// console.log("Sunrise (IST):", sunriseDate.toUTCString());
// console.log("Sunset (IST):", sunsetDate.toUTCString());

async function checkWeather(city) {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".description").innerHTML =data.weather[0].description;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".feel").innerHTML = "Feels Like " + data.main.feels_like + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " Km/hr";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
    document.querySelector(".card").style.backgroundImage = "url(./images/cloudy.jpg)";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
    document.querySelector(".card").style.backgroundImage = "url(./images/sky.png)";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
    document.querySelector(".card").style.backgroundImage = "url(./images/rainy.jpg)";
  } else if (data.weather[0].main == "Haze") {
    weatherIcon.src = "images/haze.png";
    document.querySelector(".card").style.backgroundImage = "url(./images/hazeweather.png)";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
    document.querySelector(".card").style.backgroundImage = "url(./images/mistday.png)";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
    document.querySelector(".card").style.backgroundImage = "url(./images/snowfall.png)";
  } else if (data.weather[0].main == "Smoke") {
    weatherIcon.src = "images/smoke.png";
    document.querySelector(".card").style.backgroundImage = "url(./images/smokeweather.png)";
  }
  document.querySelector(".weather").style.display = "block";
  
  document.querySelector(".date").innerHTML = currentDate;
  document.querySelector(".time").innerHTML = currentTime;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", function (event) {
  if(event.key === "Enter"){
    checkWeather(searchBox.value);
  }
});




