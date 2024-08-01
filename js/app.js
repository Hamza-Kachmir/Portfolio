$(document).ready(function() {
    const $navbar = $('.r-nav');
    const $navbarToggler = $('.navbar-toggler');
    const $navbarNavLinks = $('.navbar-nav .nav-link');
    const $popup = $('#popup');
    const $overlay = $('#overlay');
    const $btnSecondary = $('.btn-info');
    
    function gererScroll() {
        var scroll = $(window).scrollTop();
        $navbar.toggleClass('stickyadd', scroll >= 50);
    }

    function gererClicHamburger() {
        if (!$navbar.hasClass('stickyadd')) {
            $navbar.toggleClass('show-bg');
        }
    }

    function gererClicLien() {
        $('.navbar-collapse').collapse('hide');
    }

    function gererRedimensionnement() {
        var width = $(window).width();
        var isNavbarToggled = $navbarToggler.attr('aria-expanded') === 'true';

        if (width >= 992) {
            $navbar.removeClass('show-bg');
        } else {
            if (isNavbarToggled && !$navbar.hasClass('stickyadd')) {
                $navbar.addClass('show-bg');
            }
        }
    }

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

    function gererDefilementFluide(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var targetElement = $(target);
        
        if (targetElement.length) {
            var targetPosition = targetElement.offset().top - $('.navbar').outerHeight();
            var currentPosition = $(window).scrollTop();

            if (Math.abs(currentPosition - targetPosition) > 1) {
                $('html, body').animate({
                    scrollTop: targetPosition
                }, 800);
            }
        }
    }

    function initialiserIntersectionObserver() {
        const sections = document.querySelectorAll("section");

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

    $btnSecondary.on('click', function(e) {
        e.preventDefault();
        var project = $(this).data('popup');
        var projectDetails = {
            'GiveGood': {
                title: 'GiveGood',
                logo: 'images/logo-givegood.png',
                description: 'GiveGood est un projet que j\'ai développé pendant ma formation à l\'Apple Foundation Program. Ce projet a été réalisé en collaboration avec 3 autres apprenants. Mon rôle principal au sein de l\'équipe était de gérer le regroupement du code, assurant ainsi une intégration fluide et cohérente des contributions de chacun. Nous avons utilisé Figma pour concevoir les maquettes et le prototype de notre application. Pour le développement, nous avons utilisé Swift et SwiftUI.'
            },
            'Easy Ocre': {
                title: 'Easy Ocre',
                logo: 'images/logo-ocre.png',
                description: 'Easy Ocre est un projet que j\'ai présenter le jour de ma soutenance pour le titre de développeur web. J\'ai voulu allier deux de mes passions : le développement et le jeu Dofus. J\'ai donc créé une plateforme qui permet aux joueurs de suivre l\'avancement de leur quête "l\'éternelle moisson", une quête longue et fastidieuse. Pour le front-end, j\'ai utilisé HTML, CSS, et Bootstrap afin de structurer efficacement mon calendrier. J\'ai également intégré JavaScript pour la gestion du mode sombre et des pop-ups. Côté back-end, j\'ai utilisé PHP, SQL et MySQL.'
            },
            'Work Skill': {
                title: 'Work Skill',
                logo: 'images/logo-ws.png',
                description: 'Work Skill est un projet de groupe réalisé pendant ma formation de développeur web avec Simplon. Ce projet, commandité par un client, visait à créer une plateforme facilitant la reconversion professionnelle pour les seniors. Pour le front-end, nous avons utilisé HTML, CSS, et JavaScript. Pour le back-end, nous avons utilisé pour PHP, SQL et MySQL.'
            },
            'My Monki': {
                title: 'My Monki',
                logo: 'images/logo-monki.png',
                description: 'My Monki est un projet réalisé en binôme dans le cadre d\'un ECF pendant ma formation de développeur web avec Simplon. Notre mission était de créer un blog, et nous avons choisi le thème des singes, un sujet à la fois captivant et amusant. Pour le front-end, nous avons utilisé HTML, CSS et Bootstrap, qui nous a permis de gagner du temps. Pour le back-end, nous avons utilisé PHP, SQL et MySQL.'
            },
            'Booki': {
                title: 'Booki',
                logo: 'images/booki_logo.svg',
                description: 'Booki est le tout premier projet que j\'ai réalisé pendant ma reconversion professionnelle dans le domaine du développement web. L\'objectif de ce projet était de me familiariser avec les bases du développement web en créant un site d\'hébergement. Ce projet m\'a permis de découvrir et d\'appliquer les concepts fondamentaux du front-end. J\'ai utilisé uniquement HTML et CSS.'
            }
        };

        var details = projectDetails[project];
        $popup.find('h2').text(details.title);
        $popup.find('#popup-logo').attr('src', details.logo);
        $popup.find('.popup-body p').text(details.description);
        $popup.add($overlay).fadeIn();
        $('body').addClass('popup-open');
    });

    $('.close-btn').on('click', function() {
        $popup.add($overlay).fadeOut();
        $('body').removeClass('popup-open');
    });

    $(window).on('click', function(e) {
        if ($(e.target).is('#popup') || $(e.target).is('#overlay')) {
            $popup.add($overlay).fadeOut();
            $('body').removeClass('popup-open');
        }
    });

    initialiserTyped();
    initialiserMarquee();
    initialiserIntersectionObserver();

    $(window).on('scroll', debounce(gererScroll, 100));
    $navbarToggler.on('click', gererClicHamburger);
    $navbarNavLinks.on('click', gererClicLien);
    $(window).on('resize', gererRedimensionnement);

    $('.navbar-nav a').on('click', gererDefilementFluide);

    var initialWidth = $(window).width();
    if (initialWidth < 992 && $navbarToggler.attr('aria-expanded') === 'true') {
        $navbar.addClass('show-bg');
    }
});

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
