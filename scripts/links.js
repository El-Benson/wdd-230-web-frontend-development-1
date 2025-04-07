const baseURL = "https://yourgithubusername.github.io/wdd230/";
const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        const data = await response.json();
        displayLinks(data.weeks);
    } catch (error) {
        console.error("Error fetching links:", error);
    }
}

function displayLinks(weeks) {
    const activityList = document.getElementById("activity-links");
    activityList.innerHTML = ""; 

    weeks.forEach(week => {
        let weekItem = document.createElement("li");
        weekItem.innerHTML = `<strong>${week.week}:</strong> `;

        week.links.forEach((link, index) => {
            let linkItem = document.createElement("a");
            linkItem.href = baseURL + link.url;
            linkItem.textContent = link.title;
            weekItem.appendChild(linkItem);

            if (index < week.links.length - 1) {
                weekItem.innerHTML += " | "; 
            }
        });

        activityList.appendChild(weekItem);
    });
}

getLinks();
