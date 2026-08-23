// initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupMenu();
    setupSkillAnimations();
    setupForm();
    setupScrollIndicator();
    setupTypingEffect();
    setupCodeAnimations();
    setupIntersectionObservers();
    setupParallax();
    animateOnLoad();
});

// floating particles
function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;

        particle.style.setProperty('--tx', `${tx}vw`);
        particle.style.setProperty('--ty', `${ty}vh`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        const colors = ['#5ba14e', '#c9da00', '#5672d2'];
        particle.style.background = colors[i % 3];
        particle.style.opacity = Math.random() * 0.1 + 0.05;

        container.appendChild(particle);
    }
}

// menu toggle
function setupMenu() {
    const toggle = document.getElementById('menu-toggle');
    const links = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// skill bar animations with dotted style
function setupSkillAnimations() {
    const bars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.dataset.percentage;
                const color = bar.dataset.color;

                bar.style.color = color;
                bar.style.opacity = '0';
                bar.style.transform = 'scaleX(0)';

                setTimeout(() => {
                    bar.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.transform = `scaleX(${percentage / 100})`;
                    bar.style.opacity = '1';
                }, 100);

                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

// form handling
function setupForm() {
    const form = document.getElementById('contact-form');
    const groups = document.querySelectorAll('.form-group');

    groups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const line = group.querySelector('.form-line');

        input.addEventListener('focus', () => {
            line.style.height = '2px';
            line.style.background = '#5ba14e';
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                line.style.height = '1px';
                line.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');

        if (!name) {
            showNotification('please fill in all fields.', 'error');
            return;
        }

        showNotification(`message sent! i'll get back to you soon, ${name}.`, 'success');
        form.reset();

        groups.forEach(group => {
            const line = group.querySelector('.form-line');
            line.style.height = '1px';
            line.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? 'rgba(91, 161, 78, 0.1)' : 'rgba(255, 50, 50, 0.1)'};
        border: 1px solid ${type === 'success' ? 'rgba(91, 161, 78, 0.3)' : 'rgba(255, 50, 50, 0.3)'};
        color: ${type === 'success' ? '#5ba14e' : '#ff6666'};
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        backdrop-filter: blur(10px);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// scroll indicator
function setupScrollIndicator() {
    const indicator = document.getElementById('scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        indicator.style.transform = `scaleY(${scrollPercent / 100})`;
        indicator.style.transformOrigin = 'top';
    });
}

// typing effect - correctly types "prantik" only once
function setupTypingEffect() {
    const nameText = document.querySelector('.name-text');
    const name = 'prantik';
    let index = 0;

    nameText.textContent = '';

    function type() {
        if (index < name.length) {
            nameText.textContent += name.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 1000);
}

// code animations
function setupCodeAnimations() {
    const lines = document.querySelectorAll('.code-line');

    lines.forEach((line, i) => {
        const duration = 2 + Math.random() * 2;
        const delay = i * 0.3;

        line.style.animationDuration = `${duration}s`;
        line.style.animationDelay = `${delay}s`;
    });
}

// intersection observers
function setupIntersectionObservers() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const cards = document.querySelectorAll('.skill-card, .project-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        cardObserver.observe(card);
    });
}

// parallax effects
function setupParallax() {
    const icons = document.querySelectorAll('.tech-icon');
    const container = document.querySelector('.visual-container');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        icons.forEach((icon, i) => {
            const speed = 0.5 + (i * 0.1);
            icon.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`;
        });

        if (container) {
            container.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        }
    });
}

// animate on load
function animateOnLoad() {
    const elements = document.querySelectorAll('.hero-intro > *');

    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (i * 100));
    });

    const visualElements = document.querySelectorAll('.tech-icon, .code-line');

    visualElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 500 + (i * 50));
    });
}

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);