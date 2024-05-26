function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const themeToggle = document.getElementById('theme-toggle');
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Toggle Light Mode';
    } else {
        themeToggle.textContent = 'Toggle Dark Mode';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    }
});

function saveThemePreference() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', currentTheme);
}

window.addEventListener('beforeunload', saveThemePreference);

function toggleMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.classList.toggle('open');
}