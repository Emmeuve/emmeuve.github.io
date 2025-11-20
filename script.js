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
    
    allProjects = featuredProjects;
    
    try {
        const response = await fetch('assets/data/behance-projects.json');
        const data = await response.json();
        
        console.log(`✅ Proyectos de Behance disponibles: ${data.totalProjects}`);
        console.log(`📅 Última actualización: ${new Date(data.lastUpdate).toLocaleString('es-CL')}`);
        
    } catch (error) {
        console.warn('⚠️ Mostrando proyectos destacados:', error);
    }
    
    // Mostrar primeros 3 proyectos
    renderProjects(allProjects.slice(0, 3), bentoGridInitial);
    
    // Mostrar proyectos restantes si hay más de 3
    if (allProjects.length > 3) {
        renderProjects(allProjects.slice(3), bentoGridMore);
        loadMoreBtn.style.display = 'block';
    }
    
    // Evento del botón "Ver más"
    loadMoreBtn.addEventListener('click', () => {
        bentoGridMore.style.display = 'grid';
        loadMoreBtn.style.display = 'none';
        
        // Scroll suave a los proyectos adicionales
        setTimeout(() => {
            bentoGridMore.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
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
            <div class="bento-image">
                ${featuredBadge}
                <img src="${project.image}" 
                     alt="${project.title}" 
                     loading="lazy" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(project.title)}';"
                     data-project-id="${project.id}">
            </div>
            <div class="bento-content">
                <h3 class="bento-project-name">${project.title}</h3>
                <p class="bento-tag">${project.tag}</p>
                ${project.description ? `<p class="bento-description">${project.description}</p>` : ''}
                <a href="${project.link}" 
                   class="bento-link" 
                   target="_blank" 
                   rel="noopener noreferrer">
                   Ver proyecto →
                </a>
            </div>
        `;
        
        container.appendChild(card);
    });

    // ====== MAKE BENTO CARDS CLICKABLE ======
    document.querySelectorAll('.bento-item').forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            // Evitar que se abra modal si hace clic en el link
            if (e.target.closest('.bento-link')) {
                return;
            }
            
            const img = card.querySelector('img');
            const projectId = img.getAttribute('data-project-id');
            const project = allProjects.find(p => p.id === projectId);
            
            if (project) {
                openProjectModal(project);
            }
        });
    });
}

// ====== MODAL FUNCTIONALITY ======
function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    
    document.getElementById('modal-project-image').src = project.image;
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-tag').textContent = project.tag;
    document.getElementById('modal-project-description').textContent = project.description;
    document.getElementById('modal-project-link').href = project.link;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modal close button
document.querySelector('.modal-close').addEventListener('click', closeProjectModal);

// Close modal on overlay click
document.querySelector('.modal-overlay').addEventListener('click', closeProjectModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

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

// ====== CURSOR PARTICLES EFFECT ======
function initCursorParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let cursorX = 0;
    let cursorY = 0;

    // Redimensionar canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Capturar movimiento del mouse
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        // Crear partículas cada cierto movimiento
        if (Math.random() > 0.7) {
            createParticle(cursorX, cursorY);
        }
    });

    function createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 3 - 1,
            size: Math.random() * 3 + 1,
            opacity: 1,
            life: Math.random() * 0.8 + 0.4,
            maxLife: Math.random() * 0.8 + 0.4,
        };
        particles.push(particle);
    }

    function updateParticles() {
        particles = particles.filter(p => p.life > 0);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravedad
            p.life -= 0.02;
            p.opacity = p.life / p.maxLife;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Brillo
            ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity * 0.4})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

// Inicializar efecto de partículas cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursorParticles);
} else {
    initCursorParticles();
}