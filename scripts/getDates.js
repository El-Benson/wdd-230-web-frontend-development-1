document.addEventListener("DOMContentLoaded", () => {
  // Footer Date Updates
  const year = new Date().getFullYear();
  document.querySelector(
    "footer p:first-of-type"
  ).textContent = `© ${year} Ade-Benson Kehinde Michael`;

  const lastModified = new Date(document.lastModified).toLocaleString();
  document.getElementById(
    "last-modified"
  ).textContent = `Last Modified: ${lastModified}`;

  // Page Visits Counter
  if (!localStorage.getItem("visits")) {
    localStorage.setItem("visits", 0);
  }
  let visits = Number(localStorage.getItem("visits")) + 1;
  localStorage.setItem("visits", visits);

  const pageVisitsElement = document.getElementById("page-visits");
  if (pageVisitsElement) {
    pageVisitsElement.textContent = `Page Visits: ${visits}`;
  }

  // Hamburger Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      menuToggle.textContent = menu.classList.contains("show") ? "✖" : "☰";
    });
  }

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      darkModeToggle.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  }
});
