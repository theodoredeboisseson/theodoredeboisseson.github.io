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

    if (currentScrollY <= 100) {
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