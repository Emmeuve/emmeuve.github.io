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
    
    // Proyectos destacados manuales (siempre se muestran primero)
    const featuredProjects = [
        {
            id: 'redo',
            title: 'Redo',
            tag: 'Digital Rebrand & User Experience',
            description: 'Rediseño completo de la presencia digital con enfoque en una interfaz moderna y experiencia de usuario mejorada.',
            image: 'assets/img/projects/project-1.jpg',
            link: 'project.html?id=redo',
            size: 'bento-large',
            featured: true
        },
        {
            id: 'titan-energy',
            title: 'Titan Energy',
            tag: 'Brand Identity & Motion Graphics',
            description: 'Campaña de lanzamiento integral con motion graphics dinámicos y storytelling visual.',
            image: 'assets/img/projects/project-2.jpg',
            link: 'project.html?id=titan-energy',
            size: 'bento-medium',
            featured: true
        }
    ];
    
    try {
        // Cargar proyectos de Behance desde el JSON actualizado por GitHub Actions
        const response = await fetch('assets/data/behance-projects.json');
        const data = await response.json();
        
        console.log(`✅ Proyectos de Behance cargados: ${data.totalProjects}`);
        console.log(`📅 Última actualización: ${new Date(data.lastUpdate).toLocaleString('es-CL')}`);
        
        // Combinar proyectos destacados con los de Behance
        const allProjects = [...featuredProjects];
        
        // Agregar proyectos de Behance (excluir los primeros 2 que ya están como destacados)
        const behanceProjects = data.projects.slice(2, 10).map((project, index) => {
            // Obtener imagen de mejor calidad
            // Behance suele tener imágenes con diferentes tamaños, intentamos obtener la mejor
            let imageUrl = project.image;
            
            // Si la imagen tiene parámetros de tamaño, intentamos obtener una versión más grande
            if (imageUrl && imageUrl.includes('?')) {
                imageUrl = imageUrl.split('?')[0]; // Quitar parámetros para obtener imagen original
            }
            
            return {
                id: project.id,
                title: project.title,
                tag: 'Diseño Visual', // Categoría genérica para proyectos de Behance
                description: project.description,
                image: imageUrl,
                link: project.link,
                size: index % 3 === 0 ? 'bento-large' : 'bento-medium',
                featured: false
            };
        });
        
        allProjects.push(...behanceProjects);
        
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
        
        card.innerHTML = `
            <div class="bento-image">
                ${featuredBadge}
                <img src="${project.image}" 
                     alt="${project.title}" 
                     loading="lazy" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(project.title)}';">
            </div>
            <div class="bento-content">
                <h3 class="bento-project-name">${project.title}</h3>
                <p class="bento-tag">${project.tag}</p>
                ${project.description ? `<p class="bento-description">${project.description}</p>` : ''}
                <a href="${project.link}" 
                   class="bento-link" 
                   ${!project.featured ? 'target="_blank" rel="noopener noreferrer"' : ''}>
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