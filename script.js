// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link (safe if hamburger/navMenu missing)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
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

try {
    window.addEventListener('load', () => {
        // ensure body is visible after load
        try { document.body.classList.remove('page-hidden'); } catch (err) {}
    });
} catch (err) {
    // If attaching load fails for any reason, ensure page is not stuck hidden
    try { document.body.classList.remove('page-hidden'); } catch (e) {}
}

// Fallback: if something prevents the load handler or other JS errors run,
// remove the page-hidden class after a short timeout so the page is still usable.
setTimeout(() => {
    try {
        if (document.body.classList.contains('page-hidden')) {
            document.body.classList.remove('page-hidden');
        }
    } catch (err) {
        // ignore
    }
}, 1000);

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
            .map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt'), high: img.getAttribute('data-highres') }));
    }
    collect();

    let index = 0;
    function openAt(i) {
        index = (i + items.length) % items.length;
        const item = items[index];
        imgEl.alt = item.alt || '';
        // lazy-load high res if available
        const high = item.high;
        if (high) {
            // set low-res first, then swap when loaded
            imgEl.src = item.src || high;
            const hi = new Image();
            hi.src = high;
            hi.onload = () => { imgEl.src = high; };
        } else {
            imgEl.src = item.src;
        }

        // update caption and counter
        const captionEl = lightbox.querySelector('.lightbox-caption');
        const counterEl = lightbox.querySelector('.lightbox-counter');
        if (captionEl) captionEl.textContent = item.alt || '';
        if (counterEl) counterEl.textContent = (index + 1) + ' / ' + items.length;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        imgEl.focus && imgEl.focus();
    }

    function close() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // clear image to stop media playback if any
        imgEl.src = '';
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

    // ---- Accessibility: focus trap inside lightbox ----
    let previouslyFocused = null;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function trapFocus(e) {
        if (!lightbox.classList.contains('active')) return;
        const focusable = Array.from(lightbox.querySelectorAll(focusableSelector)).filter(el => !el.hasAttribute('disabled'));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else { // Tab
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }

    // Enhance openAt and close to manage focus
    const _openAt = openAt;
    openAt = function(i) {
        previouslyFocused = document.activeElement;
        _openAt(i);
        // set focus to close button for discoverability
        setTimeout(() => {
            const focusTarget = btnClose || lightbox.querySelector('button, [tabindex]');
            focusTarget && focusTarget.focus();
        }, 60);
        document.addEventListener('keydown', trapFocus);
    };

    const _close = close;
    close = function() {
        _close();
        document.removeEventListener('keydown', trapFocus);
        // restore focus
        try { previouslyFocused && previouslyFocused.focus(); } catch (err) {}
        previouslyFocused = null;
    };

    // ---- Touch / pointer swipe support ----
    let pointerDown = false;
    let startX = 0;
    let startY = 0;
    let moved = false;
    const SWIPE_THRESHOLD = 50; // px

    function onPointerDown(e) {
        pointerDown = true;
        moved = false;
        startX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
        startY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY) || 0;
    }

    function onPointerMove(e) {
        if (!pointerDown) return;
        const x = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
        const y = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY) || 0;
        const dx = x - startX;
        const dy = y - startY;
        // if vertical scroll larger, ignore
        if (Math.abs(dy) > Math.abs(dx)) return;
        if (Math.abs(dx) > 10) moved = true;
    }

    function onPointerUp(e) {
        if (!pointerDown) return;
        pointerDown = false;
        const x = e.clientX !== undefined ? e.clientX : (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX) || 0;
        const dx = x - startX;
        if (!moved) return;
        if (dx > SWIPE_THRESHOLD) {
            // swipe right -> previous
            openAt(index - 1);
        } else if (dx < -SWIPE_THRESHOLD) {
            // swipe left -> next
            openAt(index + 1);
        }
    }

    // pointer events where available
    lightbox.addEventListener('pointerdown', onPointerDown, { passive: true });
    lightbox.addEventListener('pointermove', onPointerMove, { passive: true });
    lightbox.addEventListener('pointerup', onPointerUp);
    // fallback for touch events
    lightbox.addEventListener('touchstart', onPointerDown, { passive: true });
    lightbox.addEventListener('touchmove', onPointerMove, { passive: true });
    lightbox.addEventListener('touchend', onPointerUp);
})();