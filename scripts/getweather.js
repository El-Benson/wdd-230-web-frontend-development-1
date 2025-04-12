const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const city = document.querySelector(".city");
const emoji = document.querySelector(".emoji");
const apiKey = "";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = "7a8363f78b4734d0e0c68ee8e7742838"; // OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    getWeather(url);
  });
} else {
  console.log("lll");
}

async function getWeather(url) {
  const reponse = await fetch(url);
  const data = await reponse.json();
  console.log(data);
  displayWeather(data);
}

function displayWeather(data) {
  let cit = data.name;
  let temp = data.main.temp;
  let desc = data.weather[0].description;

  let content = "";
  if (temp <= 10) {
    content = "🌨";
  } else if (temp > 10 && temp < 20) {
    content = "🌨";
  } else if (temp > 20 && temp < 30) {
    content = "🌤";
  } else if (temp > 30) {
    content = "☀️";
  }

  city.textContent = `City: ${cit}`;
  temperature.textContent = `${content} ${temp}C - ${desc}`;
}
