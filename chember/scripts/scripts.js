document.addEventListener("DOMContentLoaded", () => {
    updateFooterDate();
    updateLastModified();
    setupMenuToggle();
    fetchWeather();
    handlePasswordConfirmation();
    handleRatingInput();
    updateTimestamp();
    displaySpotlightAds();
    showMeetAndGreetBanner();
});

function updateFooterDate() {
    document.getElementById("current-year").textContent = new Date().getFullYear();
}

function updateLastModified() {
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleString();
}

function setupMenuToggle() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("show");
        menuToggle.textContent = menu.classList.contains("show") ? "✖" : "☰";
    });
}

function fetchWeather() {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    const city = "Benin City";
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(urlCurrent)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather-info").textContent = `🌡️ ${data.main.temp}°C | ${data.weather[0].description}`;
        })
        .catch(() => {
            document.getElementById("weather-info").textContent = "Unable to fetch weather data.";
        });

    fetch(urlForecast)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById("weather-forecast");
            forecastContainer.innerHTML = "";
            const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);
            dailyForecasts.forEach(day => {
                const forecastElement = document.createElement("div");
                forecastElement.textContent = `📅 ${new Date(day.dt_txt).toLocaleDateString()} - ${day.main.temp}°C`;
                forecastContainer.appendChild(forecastElement);
            });
        });
}

function handlePasswordConfirmation() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    confirmPassword.addEventListener("input", () => {
        confirmPassword.setCustomValidity(password.value !== confirmPassword.value ? "Passwords do not match." : "");
    });
}

function handleRatingInput() {
    const ratingInput = document.getElementById("rating");
    const ratingValue = document.getElementById("rating-value");
    ratingInput.addEventListener("input", () => {
        ratingValue.textContent = ratingInput.value;
    });
}

function updateTimestamp() {
    document.getElementById("timestamp").value = new Date().toLocaleString();
}

function displaySpotlightAds() {
    fetch("chamber/data/members.json")
        .then(response => response.json())
        .then(data => {
            const members = data.filter(member => ["Gold", "Silver"].includes(member.membershipLevel));
            const randomMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);
            const spotlightContainer = document.getElementById("spotlight-ads");
            spotlightContainer.innerHTML = "";
            randomMembers.forEach(member => {
                const ad = document.createElement("div");
                ad.innerHTML = `<h3>${member.name}</h3><p>${member.address}</p><p>${member.phone}</p>`;
                spotlightContainer.appendChild(ad);
            });
        });
}

function showMeetAndGreetBanner() {
    const today = new Date().getDay();
    if (today >= 1 && today <= 3) { // Monday, Tuesday, Wednesday
        const banner = document.createElement("div");
        banner.id = "meet-greet-banner";
        banner.innerHTML = `
            <p>Join us for our Chamber of Commerce meet & greet on Wednesday at 7:00 p.m.</p>
            <button onclick="this.parentElement.style.display='none'">❌</button>
        `;
        document.body.prepend(banner);
    }
}
