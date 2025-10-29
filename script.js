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
            id: 'proyecto-2',
            title: 'Branding Corporativo',
            tag: 'Brand Identity',
            description: 'Desarrollo de identidad visual completa para empresa de servicios.',
            image: 'assets/img/projects/project-2.jpg',
            link: 'project.html?id=proyecto-2',
            size: 'bento-medium',
            featured: true
        },
        {
            id: 'proyecto-3',
            title: 'Diseño Editorial',
            tag: 'Editorial Design',
            description: 'Catálogos y presentaciones institucionales con enfoque en jerarquía visual.',
            image: 'assets/img/projects/project-3.jpg',
            link: 'project.html?id=proyecto-3',
            size: 'bento-medium',
            featured: true
        },
        {
            id: 'proyecto-4',
            title: 'App Mobile UX/UI',
            tag: 'Mobile Design',
            description: 'Diseño de interfaz para aplicación móvil con foco en usabilidad y accesibilidad.',
            image: 'assets/img/projects/project-4.jpg',
            link: 'project.html?id=proyecto-4',
            size: 'bento-large',
            featured: true
        },
        {
            id: 'proyecto-5',
            title: 'Dashboard Analytics',
            tag: 'UI Design & Data Viz',
            description: 'Sistema de visualización de datos con enfoque en claridad y toma de decisiones.',
            image: 'assets/img/projects/project-5.jpg',
            link: 'project.html?id=proyecto-5',
            size: 'bento-medium',
            featured: true
        },
        {
            id: 'proyecto-6',
            title: 'E-commerce Platform',
            tag: 'UX/UI Design',
            description: 'Plataforma de comercio electrónico optimizada para conversión y experiencia de compra.',
            image: 'assets/img/projects/project-6.jpg',
            link: 'project.html?id=proyecto-6',
            size: 'bento-medium',
            featured: true
        }
    ];
    
    // Intentar cargar proyectos adicionales de Behance (solo como links)
    try {
        const response = await fetch('assets/data/behance-projects.json');
        const data = await response.json();
        
        console.log(`✅ Proyectos de Behance cargados: ${data.totalProjects}`);
        console.log(`📅 Última actualización: ${new Date(data.lastUpdate).toLocaleString('es-CL')}`);
        
        // Combinar proyectos destacados con links adicionales de Behance (sin imagen)
        const allProjects = [...featuredProjects];
        
        // Agregar solo 3 proyectos adicionales de Behance como "Ver más en Behance"
        const additionalBehance = data.projects.slice(0, 3).map((project, index) => ({
            id: project.id,
            title: project.title,
            tag: 'Ver en Behance →',
            description: project.description || 'Explora este proyecto en mi perfil de Behance.',
            image: `https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(project.title.substring(0, 30))}`,
            link: project.link,
            size: 'bento-medium',
            featured: false,
            isBehanceLink: true
        }));
        
        allProjects.push(...additionalBehance);
        
        renderProjects(allProjects);
        
    } catch (error) {
        console.warn('⚠️ No se pudieron cargar proyectos de Behance, mostrando solo destacados:', error);
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