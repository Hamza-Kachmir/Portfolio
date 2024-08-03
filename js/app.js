$(document).ready(function() {
    const $navbar = $('.r-nav');
    const $navbarToggler = $('.navbar-toggler');
    const $navbarNavLinks = $('.navbar-nav .nav-link');
    const $popup = $('#popup');
    const $overlay = $('#overlay');
    const $btnInfo = $('.btn-info');
    const stickyClass = 'stickyadd';
    const showBgClass = 'show-bg';

    // Gestion de la classe sticky et de l'arrière-plan de la barre de navigation lors du défilement
    function gererScroll() {
        const scroll = $(window).scrollTop();
        $navbar.toggleClass(stickyClass, scroll >= 50);
    }

    // Gestion de l'état du menu hamburger et du défilement du corps de la page
    function gererClicHamburger() {
        const isToggled = $navbarToggler.attr('aria-expanded') === 'true';
        $('body').toggleClass('no-scroll', isToggled);

        if (!$navbar.hasClass(stickyClass)) {
            $navbar.toggleClass(showBgClass);
        }
    }

    // Cache le menu de navigation et réactive le défilement lors du clic sur un lien
    function gererClicLien() {
        $('.navbar-collapse').collapse('hide');
        $('body').removeClass('no-scroll');
    }

    // Gestion de l'affichage de l'arrière-plan de la barre de navigation lors du redimensionnement de la fenêtre
    function gererRedimensionnement() {
        const width = $(window).width();
        const isNavbarToggled = $navbarToggler.attr('aria-expanded') === 'true';

        if (width >= 992) {
            $navbar.removeClass(showBgClass);
        } else if (isNavbarToggled && !$navbar.hasClass(stickyClass)) {
            $navbar.addClass(showBgClass);
        }
    }

    // Initialisation des animations de texte avec Typed.js
    function initialiserTyped() {
        new Typed(".element", {
            strings: ["Hamza Kachmir", "un développeur", "à la recherche d'une alternance"],
            smartBackspace: true,
            typeSpeed: 80,
            backSpeed: 70,
            loop: true,
            loopCount: Infinity,
            startDelay: 1000
        });
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
            const targetPosition = targetElement.offset().top - $('.navbar').outerHeight();
            const currentPosition = $(window).scrollTop();

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

    // Gestion de l'affichage du popup avec les détails du projet
    $btnInfo.on('click', function(e) {
        e.preventDefault();
        const project = $(this).data('popup');
        // Sauvegarde l'élément qui a déclenché le popup pour restaurer le focus plus tard
        const $trigger = $(this);

        const projectDetails = {
            'GiveGood': {
                title: 'GiveGood',
                logo: 'images/logo-givegood.png',
                description: 'GiveGood est un projet que j\'ai développé pendant ma formation d\'Apple Foundation Program. Ce projet a été réalisé en collaboration avec 3 autres apprenants. Mon rôle principal au sein de l\'équipe était de gérer le regroupement du code, assurant ainsi une intégration fluide et cohérente des contributions de chacun. Nous avons utilisé Figma pour concevoir les maquettes et le prototype de notre application. Pour le développement, nous avons utilisé Swift et SwiftUI.'
            },
            'Easy Ocre': {
                title: 'Easy Ocre',
                logo: 'images/logo-ocre.png',
                description: 'Easy Ocre est un projet que j\'ai présenté le jour de ma soutenance pour le titre de développeur web. J\'ai voulu allier deux de mes passions : le développement et le jeu Dofus. J\'ai donc créé une plateforme qui permet aux joueurs de suivre l\'avancement de leur quête "l\'éternelle moisson", une quête longue et fastidieuse. Pour le front-end, j\'ai utilisé HTML, CSS, et Bootstrap afin de structurer efficacement mon calendrier. J\'ai également intégré JavaScript pour la gestion du mode sombre et des pop-ups. Côté back-end, j\'ai utilisé PHP, SQL et MySQL.'
            },
            'Work Skill': {
                title: 'Work Skill',
                logo: 'images/logo-ws.png',
                description: 'Work Skill est un projet de groupe réalisé pendant ma formation de développeur web avec Simplon. Ce projet, commandité par un client, visait à créer une plateforme facilitant la reconversion professionnelle pour les seniors. Pour le front-end, nous avons utilisé HTML, CSS et JavaScript. Pour le back-end, nous avons utilisé PHP, SQL et MySQL.'
            },
            'My Monki': {
                title: 'My Monki',
                logo: 'images/logo-monki.png',
                description: 'My Monki est un projet réalisé en binôme dans le cadre d\'un ECF pendant ma formation de développeur web avec Simplon. Notre mission était de créer un blog, et nous avons choisi le thème des singes, un sujet à la fois captivant et amusant. Pour le front-end, nous avons utilisé HTML, CSS et Bootstrap, ce qui nous a permis de gagner du temps. Pour le back-end, nous avons utilisé PHP, SQL et MySQL.'
            },
            'Booki': {
                title: 'Booki',
                logo: 'images/booki_logo.svg',
                description: 'Booki est le tout premier projet que j\'ai réalisé pendant ma reconversion professionnelle dans le domaine du développement web. L\'objectif de ce projet était de me familiariser avec les bases du développement web en créant un site d\'hébergement. Ce projet m\'a permis de découvrir et d\'appliquer les concepts fondamentaux du front-end. J\'ai utilisé uniquement HTML et CSS.'
            }
        };

        const details = projectDetails[project];
        $popup.find('h2').text(details.title);
        $popup.find('#popup-logo').attr('src', details.logo);
        $popup.find('.popup-body p').text(details.description);
        $popup.add($overlay).fadeIn();
        $('body').addClass('popup-open');
        $navbar.addClass('navbar-disabled');

        // Place le focus sur le bouton de fermeture du popup pour l'accessibilité
        $('.close-btn').focus();

        // Sauvegarde le bouton de déclenchement pour restaurer le focus plus tard
        $popup.data('trigger', $trigger);
    });

    // Ferme le popup et réactive la navigation
    $('.close-btn').on('click', function() {
        $popup.add($overlay).fadeOut();
        $('body').removeClass('popup-open');
        $navbar.removeClass('navbar-disabled');
        
        // Restaure le focus sur l'élément qui a déclenché le popup
        $popup.data('trigger').focus();
    });

    // Gestion des clics à l'extérieur du popup et du menu hamburger pour les fermer
    $(window).on('click', function(e) {
        if ($(e.target).is('#popup, #overlay')) {
            $popup.add($overlay).fadeOut();
            $('body').removeClass('popup-open');
            $navbar.removeClass('navbar-disabled');
            $popup.data('trigger').focus();
        }
        if (!$(e.target).closest('.navbar').length && $navbarToggler.attr('aria-expanded') === 'true') {
            $('.navbar-collapse').collapse('hide');
            $('body').removeClass('no-scroll');
        }
    });

    // Initialisation des animations et des observateurs
    initialiserTyped();
    initialiserMarquee();
    initialiserIntersectionObserver();

    // Gestion des événements de défilement et de redimensionnement
    $(window).on('scroll', debounce(gererScroll, 100));
    $navbarToggler.on('click', gererClicHamburger);
    $navbarNavLinks.on('click', gererClicLien);
    $(window).on('resize', gererRedimensionnement);

    // Gère le défilement fluide pour les liens de navigation
    $('.navbar-nav a').on('click', gererDefilementFluide);

    // Initialisation de l'état de la barre de navigation lors du chargement de la page
    const initialWidth = $(window).width();
    if (initialWidth < 992 && $navbarToggler.attr('aria-expanded') === 'true') {
        $navbar.addClass(showBgClass);
    }
});

// Fonction de debounce pour limiter la fréquence d'exécution des fonctions de défilement
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}