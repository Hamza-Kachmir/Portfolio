$(document).ready(function () {
    const $window = $(window);
    const $body = $('body');
    const $navbar = $('.r-nav');
    const $navbarToggler = $('.navbar-toggler');
    const $navbarNavLinks = $('.navbar-nav .nav-link');
    const $navbarCollapse = $('.navbar-collapse');
    const stickyClass = 'stickyadd';
    const showBgClass = 'show-bg';

    // Gestion de la classe sticky et de l'arrière-plan de la barre de navigation lors du défilement
    function gererScroll() {
        const scroll = $window.scrollTop();
        $navbar.toggleClass(stickyClass, scroll >= 50);
    }

    // Gestion de l'état du menu hamburger et du défilement du corps de la page
    function gererClicHamburger() {
        const isToggled = $navbarToggler.attr('aria-expanded') === 'true';
        $body.toggleClass('no-scroll', isToggled);

        if (!$navbar.hasClass(stickyClass)) {
            $navbar.toggleClass(showBgClass);
        }
    }

    // Cache le menu de navigation et réactive le défilement lors du clic sur un lien
    function gererClicLien() {
        $navbarCollapse.collapse('hide');
        $body.removeClass('no-scroll');
    }

    // Gestion de l'affichage de l'arrière-plan de la barre de navigation lors du redimensionnement de la fenêtre
    function gererRedimensionnement() {
        const width = $window.width();
        const isNavbarToggled = $navbarToggler.attr('aria-expanded') === 'true';

        if (width >= 992) {
            $navbar.removeClass(showBgClass);
        } else if (isNavbarToggled && !$navbar.hasClass(stickyClass)) {
            $navbar.addClass(showBgClass);
        }
    }

    // Initialisation des animations de texte avec Typed.js
    function initialiserTyped() {

    }

    // Initialisation de l'effet de texte défilant avec Marquee.js
    function initialiserMarquee() {
        $('.skills-marquee').marquee({
            duration: 10000,
            gap: 40,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            startVisible: true
        });
    }

    // Défilement fluide vers les sections de la page lors du clic sur un lien
    function gererDefilementFluide(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const targetElement = $(target);

        if (targetElement.length) {
            const targetPosition = targetElement.offset().top - $navbar.outerHeight();
            const currentPosition = $window.scrollTop();

            // Vérifie si la position actuelle est différente de la cible pour éviter les animations inutiles
            if (Math.abs(currentPosition - targetPosition) > 1) {
                $('html, body').animate({
                    scrollTop: targetPosition
                }, 800);
            }
        }
    }

    // Animation des sections lorsqu'elles deviennent visibles à l'écran
    function initialiserIntersectionObserver() {
        const sections = document.querySelectorAll("section");

        // Création d'un observateur pour ajouter la classe "visible" lorsque la section entre dans le viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Gestion des clics à l'extérieur du menu hamburger pour le fermer
    $window.on('click', function (e) {
        if (!$(e.target).closest('.navbar').length && $navbarToggler.attr('aria-expanded') === 'true') {
            $navbarCollapse.collapse('hide');
            $body.removeClass('no-scroll');
        }
    });

    // Initialisation des animations et des observateurs
    initialiserTyped();
    initialiserMarquee();
    initialiserIntersectionObserver();

    // Gestion des événements de défilement et de redimensionnement
    $window.on('scroll', debounce(gererScroll, 100));
    $navbarToggler.on('click', gererClicHamburger);
    $navbarNavLinks.on('click', gererClicLien);
    $window.on('resize', gererRedimensionnement);

    // Gère le défilement fluide pour les liens de navigation
    $('.navbar-nav a').on('click', gererDefilementFluide);

    // Initialisation de l'état de la barre de navigation lors du chargement de la page
    const initialWidth = $window.width();
    if (initialWidth < 992 && $navbarToggler.attr('aria-expanded') === 'true') {
        $navbar.addClass(showBgClass);
    }
});

// Fonction de debounce pour limiter la fréquence d'exécution des fonctions de défilement
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Fonction pour calculer l'âge dynamiquement
function calculateAge() {
    const birthDate = new Date(1999, 1, 14);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById("age").textContent = age;
}

// Fonction pour calculer l'année dynamiquement
function updateYear() {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

// Initialisation des fonctions au chargement
window.onload = function() {
    calculateAge();
    updateYear();
};