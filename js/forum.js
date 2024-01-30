document.addEventListener("DOMContentLoaded", function () {
    // Initial content load (Home)
    loadHome();
});

function loadHome() {
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Welcome to the Forum!</h2><p>This is the home page of our forum.</p>";

    // Add more dynamic content or load data from a server as needed
}

function loadRegister() {
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Register</h2><p>This is the registration page. Add your registration form here.</p>";

    // Add registration form or logic here
}

function loadLogin() {
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Log In</h2><p>This is the login page. Add your login form here.</p>";

    // Add login form or logic here
}
