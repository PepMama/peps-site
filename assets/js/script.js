const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
});

if (hamburger && navMenu) {
    const header = hamburger.closest('.header');

    const closeMenu = (restoreFocus = false) => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Ouvrir le menu');
        if (restoreFocus) hamburger.focus();
    };

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
        if (isOpen) navMenu.querySelector('a')?.focus();
    };

    hamburger.addEventListener('click', toggleMenu);
    navMenu.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            closeMenu();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu(true);
        }
    });
    document.addEventListener('click', (event) => {
        if (navMenu.classList.contains('active') && header && !header.contains(event.target)) {
            closeMenu();
        }
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100) closeMenu();
    });
}

const stepToggles = document.querySelectorAll('.step-toggle');

stepToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';

        stepToggles.forEach((otherToggle) => {
            const panel = document.getElementById(otherToggle.getAttribute('aria-controls'));
            otherToggle.setAttribute('aria-expanded', 'false');
            if (panel) panel.hidden = true;
        });

        if (!isOpen) {
            const panel = document.getElementById(toggle.getAttribute('aria-controls'));
            toggle.setAttribute('aria-expanded', 'true');
            if (panel) panel.hidden = false;
        }
    });
});
