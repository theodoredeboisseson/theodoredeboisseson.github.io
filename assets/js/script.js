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

// Fonction pour gérer le comportement du header
function updateHeader() {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;

    // Si on est tout en haut de la page, afficher le header
    if (currentScrollY <= 0) {
        header.classList.remove('header-hidden');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
    }

    if (currentScrollY > lastScrollY) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

// Écouteur d'événement avec requestAnimationFrame pour de meilleures performances
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateHeader();
        });
        ticking = true;
    }
});

function sendMail(event){
    event.preventDefault();

    let params = {
        first_name: document.getElementById('first-name').value,
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