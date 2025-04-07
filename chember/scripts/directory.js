const directory = document.querySelector("#directory");
const gridViewBtn = document.querySelector("#gridView");
const listViewBtn = document.querySelector("#listView");

async function getMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    directory.innerHTML = "";
    members.forEach(member => {
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

// Toggle Views
gridViewBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
});

listViewBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
});

// Load Members
getMembers();
