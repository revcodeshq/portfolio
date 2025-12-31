document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// --- Mobile Navigation ---
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const navLinksInfo = document.querySelectorAll('.nav-links li a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when a link is clicked
    navLinksInfo.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
            navLinks.forEach(link => link.style.animation = '');
        });
    });
}

// --- Visual Enhancements ---

// 1. Typewriter Effect
const typeText = "Full Stack Developer.";
const typeElement = document.getElementById('typewriter-text');
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < typeText.length) {
        typeElement.textContent += typeText.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100); // Typing speed
    }
}
// Start typing after a short delay
setTimeout(typeWriter, 500);


// 2. 3D Tilt Effect (Lightweight)
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.classList.add('tilt-card');

    // Wrap content in tilt-content if not already
    if (card.children.length > 0 && !card.querySelector('.tilt-content')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'tilt-content';
        while (card.firstChild) {
            wrapper.appendChild(card.firstChild);
        }
        card.appendChild(wrapper);
    }

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// 3. Particle Background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.3)'; // Primary color low opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) { // Number of particles
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 - distance / 1500})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Original Observer Logic...
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Add CSS for fade-in via JS injection or updating CSS file
// Ideally should be in CSS, but adding a small helper here if needed.
