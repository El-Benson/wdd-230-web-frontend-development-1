document.addEventListener("DOMContentLoaded", () => {
    // Footer Date Updates
    const year = new Date().getFullYear();
    document.querySelector("footer p:first-of-type").textContent = `© ${year} Ade-Benson Kehinde Michael`;

    const lastModified = new Date(document.lastModified).toLocaleString();
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

    // Page Visits Counter
    if (!localStorage.getItem("visits")) {
        localStorage.setItem("visits", 0);
    }
    let visits = Number(localStorage.getItem("visits")) + 1;
    localStorage.setItem("visits", visits);

    const pageVisitsElement = document.getElementById("page-visits");
    if (pageVisitsElement) {
        pageVisitsElement.textContent = visits;
    }

    // Hamburger Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("show");
        menuToggle.textContent = menu.classList.contains("show") ? "✖" : "☰";
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let visitCount = localStorage.getItem("visitCount");

    if (!visitCount) {
        visitCount = 1;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }

    localStorage.setItem("visitCount", visitCount);
    document.getElementById("visit-counter").textContent = visitCount;
});
