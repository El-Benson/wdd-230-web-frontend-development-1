const linksURL = "https://heavenlyaura.github.io/wdd230/data/links.json"; // Path to your JSON file
const list = document.querySelector(".activities"); // The element where the activities will be displayed

// Function to fetch and display the learning activities
async function getLinksData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayLinks(data.weeks); // Pass the weeks array to display function
    } else {
      console.error("Failed to fetch data", response);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display the learning activities dynamically
function displayLinks(weeks) {
  weeks.forEach((week) => {
    let weekNumber = week.week; // Get the week number
    let links = week.links; // Get the links array for this week

    // Create a <p> element for each week
    const weekParagraph = document.createElement("p");
    weekParagraph.textContent = `Week ${weekNumber}: `;

    links.forEach((item) => {
      const aTag = document.createElement("a");
      aTag.setAttribute("href", item.url); // Set the URL for the link
      aTag.textContent = item.title; // Set the text for the link
      weekParagraph.appendChild(aTag); // Append the link to the <p> element
      weekParagraph.appendChild(document.createTextNode(" | ")); // Add a separator
    });

    // Remove the last separator
    weekParagraph.lastChild.remove(); // Removes the last "|" after the last link

    list.appendChild(weekParagraph); // Append the paragraph to the list
  });
}

// Call the function to load and display links
getLinksData(linksURL);
