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

// --- Terminal Logic ---
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');
const terminalWindow = document.getElementById('terminal-window');

if (termInput) {
    const commands = {
        help: "Available commands: <span class='term-cmd'>about</span>, <span class='term-cmd'>projects</span>, <span class='term-cmd'>skills</span>, <span class='term-cmd'>contact</span>, <span class='term-cmd'>clear</span>",
        about: "I'm Rev, a Full Stack Developer visualizing in Discord bots and scalable infrastructure.",
        projects: "Check out my projects below: GuildForge, BBGbot, Modulus...",
        skills: "Node.js, Discord.js, MongoDB, Redis, Docker, and more.",
        contact: "Email: revhq@proton.me | Discord: revcodeshq",
        clear: "CLEAR", // Special case
        sudomake: "<span class='term-highlight'>nice try ;)</span>"
    };

    termInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const input = this.value.trim().toLowerCase();
            if (input) {
                // Add input line
                addToTerminal(`rev@portfolio:~$ ${this.value}`);

                // Process command
                if (commands[input]) {
                    if (commands[input] === "CLEAR") {
                        termOutput.innerHTML = '';
                    } else {
                        addToTerminal(commands[input]);
                    }
                } else {
                    addToTerminal(`Command not found: ${input}. Type <span class='term-cmd'>'help'</span>.`);
                }
            }
            this.value = '';
            // Auto scroll
            terminalWindow.scrollTop = terminalWindow.scrollHeight;
        }
    });

    function addToTerminal(text) {
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = text;
        termOutput.appendChild(div);
    }

    // Auto focus on click
    terminalWindow.addEventListener('click', () => termInput.focus());
}

// --- Stats Counter Animation ---
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + (target === 99.9 ? "%" : "");
                    }
                };
                updateCounter();
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// --- Discord Status (Lanyard WebSocket) ---
const discordStatusText = document.getElementById('discord-status-text');
const discordBadge = document.getElementById('discord-badge');
const DISCORD_ID = '335299099999993866';

function connectLanyard() {
    const ws = new WebSocket('wss://api.lanyard.rest/socket');

    ws.onopen = () => {
        // Subscribe to ID
        ws.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_ID }
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { op, t, d } = data;

        // Hello (Op 1) - Setup Heartbeat
        if (op === 1) {
            setInterval(() => {
                ws.send(JSON.stringify({ op: 3 }));
            }, d.heartbeat_interval);
        }

        // Initialize (INIT_STATE) or Update (PRESENCE_UPDATE)
        if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
            updateStatus(d);
        }
    };

    ws.onclose = () => {
        // Reconnect after 5s
        setTimeout(connectLanyard, 5000);
    };
}

function updateStatus(data) {
    if (!discordStatusText || !discordBadge) return;

    // Handle INIT_STATE which wraps data in 'd' vs PRESENCE_UPDATE which is 'd' itself
    // Actually Lanyard sends specific user data directly in 'd' for PRESENCE_UPDATE if subscribed?
    // Let's normalize. 
    // INIT_STATE d = { users: { "ID": { ... } } }
    // PRESENCE_UPDATE d = { ...user_data... }

    let userData = data;
    if (data[DISCORD_ID]) {
        userData = data[DISCORD_ID]; // Extract from INIT_STATE
    }

    const { discord_status, activities } = userData;

    let statusText = "Offline";
    let color = "#747f8d"; // Grey

    switch (discord_status) {
        case 'online': statusText = "Online"; color = "#43b581"; break;
        case 'idle': statusText = "Idle"; color = "#faa61a"; break;
        case 'dnd': statusText = "Do Not Disturb"; color = "#f04747"; break;
    }

    // Priority: Streaming > Coding (VS Code) > Playing > Listening > Watch > Custom
    // Activity Types: 0=Playing, 1=Streaming, 2=Listening, 3=Watching, 4=Custom, 5=Competing

    const streaming = activities.find(a => a.type === 1);
    const code = activities.find(a => a.name === "Visual Studio Code");
    const playing = activities.find(a => a.type === 0);
    const listening = activities.find(a => a.type === 2);
    const watching = activities.find(a => a.type === 3);
    const custom = activities.find(a => a.type === 4);

    if (streaming) {
        statusText = `Streaming: ${streaming.details || streaming.name}`;
        color = "#593695"; // Twitch Purple
    } else if (code) {
        statusText = `Coding: ${code.details || "Visual Studio Code"}`;
        color = "#007acc"; // VS Code Blue
    } else if (playing) {
        statusText = `Playing: ${playing.name}`;
        color = "#faa61a"; // Yellow/Orange
    } else if (listening) {
        if (listening.name === "Spotify") {
            statusText = `Listening: ${listening.details || "Spotify"}`;
            color = "#1db954"; // Spotify Green
        } else {
            statusText = `Listening to: ${listening.name}`;
        }
    } else if (watching) {
        statusText = `Watching: ${watching.name}`;
        color = "#faa61a";
    } else if (custom) {
        statusText = `${custom.state}`;
    }

    discordStatusText.textContent = statusText;
    discordBadge.style.borderColor = color;
    discordBadge.querySelector('.status-dot').style.backgroundColor = color;
    discordBadge.querySelector('.status-dot').style.boxShadow = `0 0 10px ${color}`;
}

// Start Connection
connectLanyard();

// --- Project Modal Logic ---
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const projectCards = document.querySelectorAll('.project-card');

// Modal Elements
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalTags = document.getElementById('modal-tags');
const modalDesc = document.getElementById('modal-desc');
const modalLive = document.getElementById('modal-live');
const modalCode = document.getElementById('modal-code');

// Project Data (Simulated - in real app could be fetched or read from DOM)
// For simplicity, we'll try to read data from the card itself if possible, 
// or use a map based on title.
const projectDB = {
    "GuildForge": {
        desc: "GuildForge is an AI-powered Discord server builder. It allows users to create professional communities in seconds by answering a few simple questions. The system automates channel creation, role permissions, and bot setup.",
        img: "images/guildforge_thumb.png",
        tags: ["AI", "React", "Node.js", "Discord API"],
        live: "https://tryguildforge.com",
        code: null // Closed source
    },
    "BBGbot": {
        desc: "Advanced Discord bot for the BBG Alliance featuring whiteout survival game integration, automated scheduling, giveaways, AI-powered tools, and robust configuration.",
        img: "images/bbgbot_thumb.png?v=3",
        tags: ["JavaScript", "Node.js", "Automation"],
        live: "#",
        code: "https://github.com/revcodeshq/BBGbot"
    },
    "Modulus": {
        desc: "Modulus is a modular, production-ready Discord server management bot built with Node.js, Discord.js v14, and MongoDB (Mongoose). It features automated moderation, customizable welcome/leave messages, and more.",
        img: "images/modulus_thumb.png?v=3",
        tags: ["Node.js", "Mongoose", "Discord.js v14"],
        live: "#",
        code: "https://github.com/revcodeshq/Modulus"
    },
    "ServerSense": {
        desc: "Analytics dashboard for Discord communities. Tracks user engagement, voice activity, and chat trends to provide actionable insights for growth.",
        img: "images/serversense_thumb.png?v=3",
        tags: ["JavaScript", "Analytics", "Chart.js"],
        live: "#",
        code: "https://github.com/revcodeshq/ServerSense"
    }
};

if (modal) {
    projectCards.forEach(card => {
        // Add click event to the Image Container specifically or the whole card
        // Let's add it to the 'View Details' or the overlay link if we want a separate view?
        // Actually, let's make the whole card clickable for the modal, EXCEPT the specific links.

        card.addEventListener('click', (e) => {
            // If clicked on a link/button, don't open modal
            if (e.target.closest('a')) return;

            const title = card.querySelector('h3').textContent.trim();
            const data = projectDB[title];

            if (data) {
                modalTitle.textContent = title;
                modalDesc.textContent = data.desc;
                modalImg.src = data.img;

                // Tags
                modalTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

                // Links
                modalLive.href = data.live;
                if (!data.code) {
                    modalCode.style.display = 'none';
                } else {
                    modalCode.style.display = 'inline-block';
                    modalCode.href = data.code;
                }

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
