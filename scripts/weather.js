const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; 
const city = "YOUR_CITY"; 
const units = "imperial"; 
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°F`;
        document.getElementById("condition").textContent = data.weather[0].description;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.getElementById("weather-icon").alt = data.weather[0].description;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

getWeather();




