const directory = document.querySelector("#directory");
const gridViewBtn = document.querySelector("#gridView");
const listViewBtn = document.querySelector("#listView");
const loadingMessage = document.createElement("p");
loadingMessage.textContent = "Loading members...";

async function getMembers() {
  // Show loading message while fetching members
  directory.innerHTML = "";
  directory.appendChild(loadingMessage);

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Failed to load data");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    loadingMessage.textContent =
      "Failed to load members. Please try again later.";
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  // Clear the loading message
  directory.innerHTML = "";

  // Display member cards
  members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("member");

    memberCard.innerHTML = `
            <img src="images/${member.image}" alt="Profile image of ${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" aria-label="Visit ${member.name}'s website">Visit Website</a>
            <p class="membership">${member.membership} Member</p>
        `;

    directory.appendChild(memberCard);
  });
}

// Toggle Views
gridViewBtn.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

listViewBtn.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// Load Members on Page Load
getMembers();
