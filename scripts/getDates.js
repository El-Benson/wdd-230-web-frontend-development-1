document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    document.querySelector("footer p:first-of-type").textContent = `© ${year} Ade-Benson Kehinde Michael`;

    const lastModified = new Date(document.lastModified).toLocaleString();
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
});
