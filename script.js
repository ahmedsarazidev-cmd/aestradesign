// Page load visual transition
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
});

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

menuIcon.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    menuIcon.classList.toggle('active', isActive);
    menuIcon.setAttribute('aria-expanded', isActive.toString());
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuIcon.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    });
});

// --- Language Switcher Logic ---
const langBtn = document.getElementById('lang-switch');
let currentLang = 'en';

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'de' : 'en';
    langBtn.textContent = currentLang === 'en' ? 'DE' : 'EN';
    
    // Update text content
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = el.getAttribute(`data-${currentLang}`);
    });

    // Update placeholders
    document.querySelectorAll('[data-en-ph]').forEach(el => {
        el.placeholder = el.getAttribute(`data-${currentLang}-ph`);
    });
});

// --- EmailJS Integration ---
const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = contactForm.user_email.value.trim();
    if (!email || !email.includes('@')) {
        statusMessage.textContent = currentLang === 'en' ? 'Please enter a valid email.' : 'Bitte geben Sie eine gültige E-Mail ein.';
        statusMessage.style.color = '#f66';
        return;
    }

    const btn = contactForm.querySelector('button');
    const originalText = btn.getAttribute(`data-${currentLang}`) || btn.textContent;
    btn.textContent = currentLang === 'en' ? 'Sending...' : 'Sendet...';
    btn.disabled = true;
    statusMessage.textContent = currentLang === 'en' ? 'Sending your message...' : 'Sende Ihre Nachricht...';
    statusMessage.style.color = '#a0f';

    emailjs.sendForm('service_ngewnjl', 'template_577lroq', '#contact-form')  // Replace with actual IDs
        .then(() => {
            btn.textContent = currentLang === 'en' ? 'Message Sent!' : 'Gesendet!';
            statusMessage.textContent = currentLang === 'en' ? 'Thank you! We will get back to you soon.' : 'Danke! Wir melden uns bald bei Ihnen.';
            statusMessage.style.color = '#7ff';
            contactForm.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                statusMessage.textContent = '';
            }, 3000);
        })
        .catch((err) => {
            btn.textContent = currentLang === 'en' ? 'Error!' : 'Fehler!';
            statusMessage.textContent = currentLang === 'en' ? 'Oops! Something went wrong. Please try again later.' : 'Ups! Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.';
            statusMessage.style.color = '#f66';
            btn.disabled = false;
            console.error('EmailJS error:', err);
            setTimeout(() => { btn.textContent = originalText; }, 3000);
        });
});