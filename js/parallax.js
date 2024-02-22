document.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const parallaxSections = document.querySelectorAll('.parallax-section');

    parallaxSections.forEach(section => {
        const speed = section.getAttribute('data-speed') || 0.5;
        section.style.backgroundPositionY = -(scrolled * speed) + 'px';
    });
});
