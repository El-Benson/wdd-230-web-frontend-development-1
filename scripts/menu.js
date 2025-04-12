// Get the hamburger button and the nav menu
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector("nav ul");

// Add event listener to toggle the 'active' class
menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active"); // Show or hide the menu

  // Toggle the icon between ☰ and ✕
  if (navList.classList.contains("active")) {
    menuToggle.innerHTML = "✕"; // Change icon to 'X'
  } else {
    menuToggle.innerHTML = "☰"; // Change icon back to hamburger
  }
});
