// Toggle Dark Mode
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Toggle Hamburger Menu
function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      menuToggle.textContent = menu.classList.contains("show") ? "✖" : "☰";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenuToggle();
  updateFooterDate();
  updateLastModified();
  showMeetAndGreetBanner(); // Display meet and greet banner
  fetchWeather(); // Fetch weather data for weather section
  loadDirectoryMembers(); // Load directory members
});

// Update footer date
function updateFooterDate() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Update last modified date
function updateLastModified() {
  const lastModifiedSpan = document.getElementById("last-modified");
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = new Date(
      document.lastModified
    ).toLocaleString();
  }
}

// Fetch weather data
function fetchWeather() {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
  const city = "Benin City";
  const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(urlCurrent)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.textContent = `🌡️ ${data.main.temp}°C | ${data.weather[0].description}`;
      }
    })
    .catch(() => {
      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.textContent = "Unable to fetch weather data.";
      }
    });
}

// Handle password confirmation input
function handlePasswordConfirmation() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  if (password && confirmPassword) {
    confirmPassword.addEventListener("input", () => {
      confirmPassword.setCustomValidity(
        password.value !== confirmPassword.value
          ? "Passwords do not match."
          : ""
      );
    });
  }
}

// Handle rating input
function handleRatingInput() {
  const ratingInput = document.getElementById("rating");
  const ratingValue = document.getElementById("rating-value");
  if (ratingInput && ratingValue) {
    ratingInput.addEventListener("input", () => {
      ratingValue.textContent = ratingInput.value;
    });
  }
}

// Update timestamp field
function updateTimestamp() {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toLocaleString();
  }
}

// Display spotlight ads
function displaySpotlightAds() {
  const spotlightContainer = document.getElementById("spotlight-ads");
  if (!spotlightContainer) return;

  fetch("chamber/data/members.json")
    .then((response) => response.json())
    .then((data) => {
      const members = data.filter((member) =>
        ["Gold", "Silver"].includes(member.membershipLevel)
      );
      const randomMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);
      spotlightContainer.innerHTML = "";
      randomMembers.forEach((member) => {
        const ad = document.createElement("div");
        ad.innerHTML = `<h3>${member.name}</h3><p>${member.address}</p><p>${member.phone}</p>`;
        spotlightContainer.appendChild(ad);
      });
    });
}

// Show meet and greet banner
function showMeetAndGreetBanner() {
  const today = new Date().getDay();
  if (today >= 1 && today <= 3) {
    const banner = document.createElement("div");
    banner.id = "meet-greet-banner";
    banner.innerHTML = `
            <p>Join us for our Chamber of Commerce meet & greet on Wednesday at 7:00 p.m.</p>
            <button onclick="this.parentElement.style.display='none'">❌</button>
        `;
    document.body.prepend(banner);
  }
}

// Load directory members
async function loadDirectoryMembers() {
  const directory = document.querySelector("#directory");
  const gridViewBtn = document.querySelector("#gridView");
  const listViewBtn = document.querySelector("#listView");
  if (!directory) return;

  const members = await fetchMembers();
  displayMembers(members);

  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener("click", () => {
      directory.classList.add("grid");
      directory.classList.remove("list");
    });

    listViewBtn.addEventListener("click", () => {
      directory.classList.add("list");
      directory.classList.remove("grid");
    });
  }
}

// Fetch members data
async function fetchMembers() {
  const response = await fetch("data/members.json");
  return await response.json();
}

// Display members in the directory
function displayMembers(members) {
  const directory = document.querySelector("#directory");
  if (!directory) return;

  directory.innerHTML = "";
  members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("member");
    memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership">${member.membership} Member</p>
        `;
    directory.appendChild(memberCard);
  });
}
