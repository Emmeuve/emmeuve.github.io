// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll (account for fixed navbar height)
const sections = document.querySelectorAll('section[id]');
const navbar = document.querySelector('.navbar');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight - 10; // small margin
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Smooth scroll for anchor links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 12; // extra spacing
            window.scrollTo({ top: y, behavior: 'smooth' });

            // Close mobile menu if open
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active state to external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// Page transition: fade out before navigating for project links, fade in on load
const FADE_MS = 360;

window.addEventListener('load', () => {
    // ensure body is visible after load
    document.body.classList.remove('page-hidden');
});

document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a.project-link');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();
    // start fade
    document.body.classList.add('page-hidden');
    setTimeout(() => {
        window.location.href = href;
    }, FADE_MS);
});

/* Lightbox functionality */
(function() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    const imgEl = lightbox.querySelector('.lightbox-img');
    const btnClose = lightbox.querySelector('.lightbox-close');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');

    // Collect images from galleries
    let items = [];
    function collect() {
        items = Array.from(document.querySelectorAll('.project-gallery img, .bento-image img'))
            .map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') }));
    }
    collect();

    let index = 0;
    function openAt(i) {
        index = (i + items.length) % items.length;
        imgEl.src = items[index].src;
        imgEl.alt = items[index].alt || '';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        imgEl.focus && imgEl.focus();
    }

    function close() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    btnClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });

    btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        openAt(index - 1);
    });
    btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        openAt(index + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') openAt(index - 1);
            if (e.key === 'ArrowRight') openAt(index + 1);
        }
    });

    // Click on gallery images
    document.addEventListener('click', (e) => {
        const img = e.target.closest && e.target.closest('img');
        if (!img) return;
        if (img.closest('.project-gallery') || img.closest('.bento-image')) {
            // find index of clicked image in items
            collect();
            const src = img.getAttribute('src');
            const idx = items.findIndex(it => it.src === src);
            if (idx >= 0) openAt(idx);
        }
    });
})();