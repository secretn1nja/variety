// script.js

function toggleMenu() {
    const menu = document.getElementById("menu");
    const container = document.getElementById("container"); // Add an id to the container

    if (menu.style.display === "block") {
        menu.style.display = "none";
        container.classList.remove("blurred"); // Remove the blurred class
    } else {
        menu.style.display = "block";
        container.classList.add("blurred"); // Add the blurred class
    }
}

// Close the menu when a menu item is clicked
document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        const menu = document.getElementById("menu");
        const container = document.getElementById("container");
        menu.style.display = "none";
        container.classList.remove("blurred");
    });
});

// Close the menu when a menu item is clicked
document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        const menu = document.getElementById("menu");
        menu.style.display = "none";
    });
});
