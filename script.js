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

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
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

// ====== BEHANCE PROJECTS LOADER ======
let allProjects = [];

async function loadBehanceProjects() {
    const bentoGridInitial = document.querySelector('#bento-grid-initial');
    const bentoGridMore = document.querySelector('#bento-grid-more');
    const loadMoreBtn = document.querySelector('#load-more-btn');
    
    if (!bentoGridInitial) return;
    
    // Proyectos destacados manuales con nuevos tamaños editoriales
    const featuredProjects = [
        {
            id: 'romano-rediseno',
            title: 'Rediseño Página Web Romano',
            tag: 'Web Design & UX',
            description: 'Rediseño completo de la presencia digital enfocado en mejorar la experiencia de usuario y conversión.',
            image: 'assets/img/projects/Romano.jpg',
            link: 'https://www.behance.net/gallery/211082557/Rediseno-Pagina-Web-Romano',
            size: 'bento-xl', // Extra Large - 8 columnas × 2 filas
            featured: true
        },
        {
            id: 'starbucks-app',
            title: 'Rediseño App Starbucks',
            tag: 'Mobile App Design',
            description: 'Rediseño de aplicación móvil enfocado en mejorar la experiencia de pedido y programa de recompensas.',
            image: 'assets/img/projects/Starbuck.jpg',
            link: 'https://www.behance.net/gallery/210924037/Rediseno-de-app-de-Starbucks',
            size: 'bento-tall', // Tall - 4 columnas × 2 filas
            featured: true
        },
        {
            id: 'vefree-brand',
            title: 'Branding Vefree',
            tag: 'Brand Identity',
            description: 'Desarrollo completo de identidad visual para marca de productos veganos.',
            image: 'assets/img/projects/Vefree.jpg',
            link: 'https://www.behance.net/gallery/123514533/Creacion-de-Marca-Vefree',
            size: 'bento-large', // Large - 7 columnas
            featured: false
        },
        {
            id: 'bebrave',
            title: 'Bebrave',
            tag: 'UI/UX Design',
            description: 'Diseño de interfaz y experiencia de usuario para plataforma digital.',
            image: 'assets/img/projects/Bebrave.jpg',
            link: 'https://www.behance.net/gallery/119755525/Creacion-y-Branding-de-Marca-Be-Brave',
            size: 'bento-medium', // Medium - 5 columnas
            featured: false
        },
        {
            id: 'naviera-austral',
            title: 'Naviera Austral',
            tag: 'Web Design & Branding',
            description: 'Rediseño de sitio web para empresa de transporte marítimo con enfoque en experiencia de usuario.',
            image: 'assets/img/projects/NavieraAustral.jpg',
            link: 'https://www.behance.net/gallery/123513263/Rediseno-de-Logo-de-Naviera-Austral',
            size: 'bento-small', // Small - 4 columnas
            featured: false
        },
        {
            id: 'fruna',
            title: 'Fruna',
            tag: 'Brand & Package Design',
            description: 'Diseño de packaging y branding para marca de productos alimenticios.',
            image: 'assets/img/projects/Fruna.jpg',
            link: 'https://www.behance.net/gallery/119756627/Rediseno-de-Imagen-corporativa-Fruna',
            size: 'bento-small', // Small - 4 columnas
            featured: false
        }
    ];
    
    allProjects = featuredProjects;
    
    try {
        const response = await fetch('assets/data/behance-projects.json');
        const data = await response.json();
        
        console.log(`✅ Proyectos de Behance disponibles: ${data.totalProjects}`);
        console.log(`📅 Última actualización: ${new Date(data.lastUpdate).toLocaleString('es-CL')}`);
        
    } catch (error) {
        console.warn('⚠️ Mostrando proyectos destacados:', error);
    }
    
    // Mostrar todos los proyectos en el grid inicial
    renderProjects(allProjects, bentoGridInitial);
    
    // Ocultar botón "Ver más" ya que mostramos todos los proyectos
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function renderProjects(projects, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = `bento-item ${project.size}`;
        
        const featuredBadge = project.featured 
            ? '<span class="featured-badge">Destacado</span>'
            : '';
        
        card.innerHTML = `
            ${featuredBadge}
            <div class="bento-image">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     loading="lazy" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(project.title)}';"
                     data-project-id="${project.id}">
            </div>
            <div class="bento-content">
                <p class="bento-tag">${project.tag}</p>
                <h3 class="bento-project-name">${project.title}</h3>
                ${project.description ? `<p class="bento-description">${project.description}</p>` : ''}
            </div>
        `;
        
        container.appendChild(card);
    });

    // ====== MAKE BENTO CARDS CLICKABLE - OPEN IN NEW TAB ======
    document.querySelectorAll('.bento-item').forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const projectId = img.getAttribute('data-project-id');
            const project = allProjects.find(p => p.id === projectId);
            
            if (project && project.link) {
                window.open(project.link, '_blank');
            }
        });
    });
}

// ====== LOGO RIBBON DRAGGABLE ======
function initLogoRibbon() {
    const logoRibbon = document.querySelector('.logo-ribbon');
    if (!logoRibbon) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    logoRibbon.addEventListener('mousedown', (e) => {
        isDown = true;
        logoRibbon.classList.add('dragging');
        startX = e.pageX - logoRibbon.offsetLeft;
        scrollLeft = logoRibbon.scrollLeft;
    });

    logoRibbon.addEventListener('mouseleave', () => {
        isDown = false;
        logoRibbon.classList.remove('dragging');
    });

    logoRibbon.addEventListener('mouseup', () => {
        isDown = false;
        logoRibbon.classList.remove('dragging');
    });

    logoRibbon.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - logoRibbon.offsetLeft;
        const walk = (x - startX) * 2;
        logoRibbon.scrollLeft = scrollLeft - walk;
    });
}

// ====== CURSOR PARTICLES EFFECT ======
function initCursorParticles() {
    // Solo en dispositivos de escritorio
    if (window.innerWidth <= 1024) return;

    let lastTime = 0;
    const throttleDelay = 50; // ms entre partículas

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        
        if (currentTime - lastTime < throttleDelay) return;
        lastTime = currentTime;

        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100 + 50; // Más movimiento hacia abajo
        
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
}

// ====== INITIALIZE ======
document.addEventListener('DOMContentLoaded', () => {
    loadBehanceProjects();
    initLogoRibbon();
    initCursorParticles();
});