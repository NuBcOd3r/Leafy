document.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombre");
    if (nombre) {
        document.getElementById("userName").innerText = nombre;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");
    if (role) {
        document.getElementById("role").innerText = role;
    }
});

function animateNumbers() {
const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateNumber = () => {
        current += increment;
        if (current < target) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateNumber);
        } else {
            stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
    };

    updateNumber();
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});