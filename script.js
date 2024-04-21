const theme = document.getElementById('theme-mode');
const body = document.body;
const container = document.querySelector('.container');
const snowflake = document.querySelector('.snowflake');


theme.addEventListener('click', () => {
    body.classList.toggle('light-mode')
    theme.classList.toggle('button-light')
    container.classList.toggle('container-light')
    snowflake.forEach((flake) => {
        snowflake.classList.toggle('snowflake-light');
    });
})

function applyLightMode() {
    body.classList.toggle('light-mode')
    theme.classList.toggle('button-light')
    container.classList.toggle('container-light')
}

applyLightMode();