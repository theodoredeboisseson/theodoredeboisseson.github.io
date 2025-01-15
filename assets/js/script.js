document.querySelectorAll('.circle').forEach(circle => {
    const percentage = circle.getAttribute('data-percentage');

    //Récupère les couleurs dans le CSS
    const styles = getComputedStyle(circle);
    const progressColor = styles.getPropertyValue('--skill-progress-color').trim();
    const backgroundColor = styles.getPropertyValue('--skill-background-color').trim();

    //Met à jour le progression du "cercle"
    circle.style.background = `conic-gradient(${progressColor} ${percentage}%, ${backgroundColor} ${percentage}%)`;
});


document.addEventListener('DOMContentLoaded', () => {
    particlesJS("stars-animation", {
        "particles": {
            "number": {
                "value": 355,
                "density": {"enable": true, "value_area": 789.15}
            },
            "color": {"value": "#ffffff"},
            "shape": {"type": "circle",
                "stroke": {"width": 0, "color": "#000000"},
                "polygon": {"nb_sides": 5},
                "image": {"src": "img/github.svg", "width": 100, "height": 100}
            },
            "opacity": {"value": 0.49, "random": false,
                "anim": {"enable": true, "speed": 0.25, "opacity_min": 0, "sync": false}
            },
            "size": {"value": 2, "random": true,
                "anim": {"enable": true, "speed": 0.333, "size_min": 0, "sync": false}
            },
            "line_linked": {"enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
            "move": {"enable": true, "speed": 0.1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false,
                "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
            }
        },
        "interactivity": {"detect_on": "canvas",
            "events": {
                "onhover": {"enable": true, "mode": "bubble"},
                "onclick": {"enable": true, "mode": "push"},
                "resize": true
            },
            "modes": {
                "grab": {"distance": 400,
                    "line_linked": {"opacity": 1}
                },
                "bubble": {"distance": 83.9, "size": 1, "duration": 3, "opacity": 1, "speed": 3},
                "repulse": {"distance": 200, "duration": 0.4},
                "push": {"particles_nb": 4},
                "remove": {"particles_nb": 2}
            }
        },
        "retina_detect": true
    });
})

let lastScrollY = window.scrollY;
let ticking = false;
const header = document.querySelector('header');
const burgerButton = document.querySelector('#toggle-header');

function isResponsive() {
    return window.innerWidth <= 1024; // Limite max-width
}

// Fonction pour gérer le comportement du header et de la flèche
function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
        header.classList.remove('header-hidden');
        burgerButton.classList.add('hidden');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
    }

    if (isResponsive()) {
        // Mode responsive
        if (currentScrollY > lastScrollY) {
            // Scrolling vers le bas
            header.classList.add('header-hidden');
            burgerButton.classList.remove('hidden');
        } else {
            header.classList.add('header-hidden');
            burgerButton.classList.remove('hidden');
        }
    } else {
        // Mode normal
        if (currentScrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        burgerButton.classList.add('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

// Fonction pour toggler le header quand on clique sur la flèche
burgerButton.addEventListener('click', () => {
    header.classList.toggle('header-hidden');
    burgerButton.classList.toggle('hidden');
});

// Écouteur d'événement pour le scroll
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateHeader();
        });
        ticking = true;
    }
});

// Mise à jour du comportement lors d'un redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    if (!isResponsive()) {
        // En mode desktop, réinitialiser le header
        header.classList.remove('header-hidden');
        burgerButton.classList.add('hidden');
    }
});

function sendMail(event){
    event.preventDefault();

    let params = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    }

    emailjs.send('service_nsw9fpa', 'template_zclnavi', params)
        .then(function(response) {
            alert("E-mail envoyé!");
        })
        .catch(function(error) {
            alert("L'E-mail n'as pas pu être envoyé...");
        });
}

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.box').forEach((box) => {
    gsap.fromTo(
        box,
        { opacity: 0, y: 100 }, // État initial
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: box,
                start: 'top 80%', // Quand l'animation démarre (élément visible)
                end: 'top 50%',   // Optionnel : fin de l'animation
                toggleActions: 'play none none none', // play, pause, reset...
            },
        }
    );
});


// Script pour GSAP
gsap.registerPlugin(ScrollTrigger);

// Fonction pour animer les éléments
function animateElements() {
    gsap.utils.toArray('.appear-left, .appear-right, .appear-below').forEach((element) => {
        let xValue = 0, yValue = 0; // Initialisation des valeurs de translation

        if (element.classList.contains('appear-left')) {
            xValue = -60; // Déplacement vers la gauche plus subtil
        } else if (element.classList.contains('appear-right')) {
            xValue = 60; // Déplacement vers la droite plus subtil
        } else if (element.classList.contains('appear-below')) {
            yValue = 60; // Déplacement vers le bas plus subtil
        }

        // Applique l'animation avec GSAP
        gsap.fromTo(element,
            {
                opacity: 0,
                x: xValue,
                y: yValue,
                ease: "none" // Courbe d'accélération sans freinage (mouvement constant)
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.6, // Durée plus courte pour accélérer l'animation
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',  // L'élément commence à apparaître quand il est plus près de l'écran
                    toggleActions: 'play none none none',
                    markers: false // Désactive les marqueurs de débogage
                }
            }
        );
    });
}

window.addEventListener('load', animateElements);
