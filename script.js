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
            const offsetPosition = targetPosition - navbarHeight - 20; // 20px extra de margen
            
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
async function loadBehanceProjects() {
    const bentoGrid = document.querySelector('.bento-grid');
    if (!bentoGrid) return;
    
    // Proyectos destacados manuales (control total)
    const featuredProjects = [
        {
            id: 'romano-rediseno',
            title: 'Rediseño Página Web Romano',
            tag: 'Web Design & UX',
            description: 'Rediseño completo de la presencia digital enfocado en mejorar la experiencia de usuario y conversión.',
            image: 'assets/img/projects/Romano.jpg',
            link: 'https://www.behance.net/gallery/211082557/Rediseno-Pagina-Web-Romano',
            size: 'bento-large',
            featured: true
        },
        {
            id: 'starbucks-app',
            title: 'Rediseño App Starbucks',
            tag: 'Mobile App Design',
            description: 'Rediseño de aplicación móvil enfocado en mejorar la experiencia de pedido y programa de recompensas.',
            image: 'assets/img/projects/Starbuck.jpg',
            link: 'https://www.behance.net/gallery/210924037/Rediseno-de-app-de-Starbucks',
            size: 'bento-medium',
            featured: true
        },
        {
            id: 'vefree-brand',
            title: 'Branding Vefree',
            tag: 'Brand Identity',
            description: 'Desarrollo completo de identidad visual para marca de productos veganos.',
            image: 'assets/img/projects/Vefree.jpg',
            link: 'https://www.behance.net/gallery/123514533/Creacion-de-Marca-Vefree',
            size: 'bento-medium',
            featured: true
        },
        {
            id: 'bebrave',
            title: 'Bebrave',
            tag: 'UI/UX Design',
            description: 'Diseño de interfaz y experiencia de usuario para plataforma digital.',
            image: 'assets/img/projects/Bebrave.jpg',
            link: 'https://www.behance.net/gallery/119755525/Creacion-y-Branding-de-Marca-Be-Brave',
            size: 'bento-large',
            featured: true
        },
        {
            id: 'naviera-austral',
            title: 'Naviera Austral',
            tag: 'Web Design & Branding',
            description: 'Rediseño de sitio web para empresa de transporte marítimo con enfoque en experiencia de usuario.',
            image: 'assets/img/projects/NavieraAustral.jpg',
            link: 'https://www.behance.net/gallery/123513263/Rediseno-de-Logo-de-Naviera-Austral',
            size: 'bento-medium',
            featured: true
        },
        {
            id: 'fruna',
            title: 'Fruna',
            tag: 'Brand & Package Design',
            description: 'Diseño de packaging y branding para marca de productos alimenticios.',
            image: 'assets/img/projects/Fruna.jpg',
            link: 'https://www.behance.net/gallery/119756627/Rediseno-de-Imagen-corporativa-Fruna',
            size: 'bento-medium',
            featured: true
        }
    ];
    
    // Mostrar solo proyectos destacados (sin proyectos adicionales de Behance por ahora)
    try {
        const response = await fetch('assets/data/behance-projects.json');
        const data = await response.json();
        
        console.log(`✅ Proyectos de Behance disponibles: ${data.totalProjects}`);
        console.log(`📅 Última actualización: ${new Date(data.lastUpdate).toLocaleString('es-CL')}`);
        
        // Por ahora, solo mostrar proyectos destacados
        renderProjects(featuredProjects);
        
    } catch (error) {
        console.warn('⚠️ Mostrando proyectos destacados:', error);
        renderProjects(featuredProjects);
    }
}

function renderProjects(projects) {
    const bentoGrid = document.querySelector('.bento-grid');
    if (!bentoGrid) return;
    
    bentoGrid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = `bento-item ${project.size}`;
        
        const featuredBadge = project.featured 
            ? '<span class="featured-badge">Destacado</span>'
            : '';
        
        // Estilo especial para proyectos que son solo links de Behance
        const behanceLinkStyle = project.isBehanceLink 
            ? 'style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;"'
            : '';
        
        card.innerHTML = `
            <div class="bento-image" ${behanceLinkStyle}>
                ${featuredBadge}
                <img src="${project.image}" 
                     alt="${project.title}" 
                     loading="lazy" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(project.title)}';"
                     ${project.isBehanceLink ? 'style="opacity: 0.3;"' : ''}>
            </div>
            <div class="bento-content">
                <h3 class="bento-project-name">${project.title}</h3>
                <p class="bento-tag">${project.tag}</p>
                ${project.description ? `<p class="bento-description">${project.description}</p>` : ''}
                <a href="${project.link}" 
                   class="bento-link" 
                   ${project.isBehanceLink || !project.featured ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                   Ver proyecto →
                </a>
            </div>
        `;
        
        bentoGrid.appendChild(card);
    });
}

// Cargar proyectos al iniciar la página
if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    loadBehanceProjects();
}

// ====== INTERACTIVE LOGO RIBBON ======
function initLogoRibbon() {
    const logoRibbon = document.querySelector('.logo-ribbon');
    const logoTrack = document.querySelector('.logo-track');

    if (!logoRibbon || !logoTrack) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Pausar animación al entrar
    logoRibbon.addEventListener('mouseenter', () => {
        logoTrack.style.animationPlayState = 'paused';
        logoRibbon.style.cursor = 'grab';
    });

    // Reanudar animación al salir (si no estamos arrastrando)
    logoRibbon.addEventListener('mouseleave', () => {
        if (!isDown) {
            logoTrack.style.animationPlayState = 'running';
        }
        logoRibbon.style.cursor = 'default';
    });

    // Iniciar drag
    logoRibbon.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - logoRibbon.offsetLeft;
        scrollLeft = logoRibbon.scrollLeft;
        logoRibbon.style.cursor = 'grabbing';
    });

    // Terminar drag
    logoRibbon.addEventListener('mouseup', () => {
        isDown = false;
        logoRibbon.style.cursor = 'grab';
        logoTrack.style.animationPlayState = 'running';
    });

    // Mover mientras se arrastra
    logoRibbon.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - logoRibbon.offsetLeft;
        const walk = (x - startX) * 1;
        logoRibbon.scrollLeft = scrollLeft - walk;
    });

    // Prevenir drag si se sale del elemento
    logoRibbon.addEventListener('mouseleave', () => {
        isDown = false;
        logoRibbon.style.cursor = 'default';
    });
}

// Inicializar logo ribbon cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogoRibbon);
} else {
    initLogoRibbon();
}

// ====== MAKE BENTO CARDS CLICKABLE ======
document.querySelectorAll('.bento-item').forEach(card => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', () => {
        const link = card.querySelector('.bento-link');
        if (link) {
            link.click();
        }
    });
});