Portfolio Michel Valenzuela

Portafolio web minimalista y profesional de Michel Valenzuela, Diseñador UX/UI & Estratega Visual especializado en interfaces intuitivas y soluciones centradas en el usuario.

🔗 Ver sitio en vivo

👨‍🎨 Sobre Mí

Diseñador UX/UI con sólida base en diseño gráfico y comunicación visual. Mi enfoque es centrado en el usuario; transformo problemas complejos en interfaces digitales intuitivas y funcionales. Especializado en la creación de experiencias coherentes que alinean los objetivos del negocio con las necesidades del usuario utilizando metodologías como Design Thinking y Design Sprint.

✨ Características del Portafolio

🎨 Diseño minimalista inspirado en Frame & Form
🌓 Modo oscuro/claro con persistencia (localStorage)
📱 Completamente responsive (mobile, tablet, desktop)
🎯 Navegación fija con scroll activo y smooth scroll
🖼️ Bento Grid asimétrico para casos de estudio
🤖 Actualización automática de proyectos desde Behance (GitHub Actions)
🏆 Proyectos destacados con badge personalizado
🎬 Lightbox integrado para galerías de proyectos
🎨 Ribbon animado de logos de herramientas con interacción draggable
💬 CTA optimizado en sección de contacto
🖱️ Cards de proyectos completamente interactivas (clickeables en toda el área)
⚡ Performance optimizado sin dependencias externas
♿ Accesible (ARIA labels, navegación por teclado)
🚀 Deploy automático con GitHub Pages
🛠️ Tecnologías

Frontend: HTML5, CSS3, JavaScript ES6+ (Vanilla)
Automatización: GitHub Actions
Hosting: GitHub Pages
Integración: Behance RSS Feed
📋 Estructura de Secciones

🏠 Página Principal (index.html)

Header - Foto de perfil, nombre, título profesional
Mi Enfoque - Descripción del enfoque UX/UI y metodologías
Experiencia Profesional - Timeline con historial laboral
Casos de Estudio - Bento Grid con proyectos (destacados + Behance)
Habilidades - Herramientas, especialidades y metodologías con ribbon animado
Formación - Educación y certificaciones (Bootcamp UX/UI, Diseño Gráfico)
Contacto - CTA principal + información de contacto detallada
📄 Página de Proyecto (project.html)

Hero del proyecto - Imagen destacada, título y roles
Galería interactiva - Grid de imágenes con lightbox
Caso de estudio - Problema, Proceso, Solución y Resultados
Herramientas utilizadas - Logos de tecnologías con ribbon
Navegación - Link para volver al portfolio
📁 Estructura del Proyecto

emmeuve.github.io/
├── .github/
│   └── workflows/
│       └── update-behance.yml    # GitHub Action automática
├── assets/
│   ├── data/
│   │   └── behance-projects.json # Proyectos actualizados automáticamente
│   └── img/
│       ├── profile.jpeg          # Foto de perfil
│       ├── projects/             # Imágenes de proyectos destacados
│       │   ├── project-1.jpg
│       │   ├── project-2.jpg
│       │   └── ...
│       ├── png/                  # Recursos adicionales
│       └── logos/
│           └── official/         # Logos de herramientas
│               ├── photoshop.svg
│               ├── illustrator.svg
│               ├── figma.svg
│               └── ...
├── index.html                    # Página principal
├── project.html                  # Template página de proyecto
├── styles.css                    # Estilos globales
├── script.js                     # JavaScript funcionalidad
└── README.md                     # Este archivo
🚀 Instalación y Uso Local

# Clonar el repositorio
git clone https://github.com/emmeuve/emmeuve.github.io.git

# Navegar al directorio
cd emmeuve.github.io

# Abrir con Live Server (VSCode) o cualquier servidor local
# No requiere instalación de dependencias npm
🤖 GitHub Actions - Actualización Automática de Behance

¿Cómo funciona?

El portafolio utiliza GitHub Actions para actualizar automáticamente los proyectos desde Behance:

Workflow automático se ejecuta diariamente a las 6 AM UTC (3 AM Chile)
Extrae proyectos del RSS feed de Behance (@Emmeuve)
Procesa imágenes optimizando calidad y URLs
Genera JSON con datos estructurados (behance-projects.json)
Commit automático si hay cambios
Site actualizado automáticamente en GitHub Pages
Ejecución Manual

Puedes ejecutar el workflow manualmente:

Ve a Actions en GitHub
Selecciona "Update Behance Projects"
Click en "Run workflow"
Espera 1-2 minutos
Configuración

Frecuencia de actualización (.github/workflows/update-behance.yml):

schedule:
  - cron: '0 6 * * *'  # Diario a las 6 AM UTC
Opciones de frecuencia:

'0 */6 * * *' - Cada 6 horas
'0 0 * * 1' - Cada lunes a medianoche
'0 0 1 * *' - El día 1 de cada mes
Número máximo de proyectos:

const maxProjects = 12; // Ajustar en el workflow
🎯 Características Destacadas

1. Bento Grid Híbrido

Proyectos destacados (manuales): Control total sobre presentación
Proyectos de Behance (automáticos): Portfolio siempre actualizado
Badge "Destacado": Diferencia proyectos principales
Grid asimétrico: Layout inspirado en Frame & Form
Responsive: 3 columnas desktop, 2 tablet, 1 mobile
2. Sistema de Proyectos Dual

Proyectos Destacados:

// En script.js - Control manual completo
const featuredProjects = [
    {
        title: 'Nombre Proyecto',
        tag: 'Categoría',
        description: 'Descripción detallada...',
        image: 'assets/img/projects/proyecto.jpg',
        link: 'project.html?id=proyecto',
        size: 'bento-large',
        featured: true
    }
];
Proyectos de Behance:

Carga automática desde behance-projects.json
Actualización diaria vía GitHub Actions
Fallback a proyectos destacados si falla
3. Navegación Inteligente

Navbar fijo con blur backdrop
Smooth scroll a secciones
Links activos según scroll position
Menú hamburguesa responsive
Transiciones suaves
4. Logo Ribbon Animado e Interactivo

12 herramientas destacadas (Adobe Suite, Figma, VSCode, etc.)
Scroll infinito automático
Draggable con mouse - Desliza los logos para explorar
Pausa automática de animación al interactuar
SVG logos adaptativos al tema
Cursor feedback (grab/grabbing)
5. Bento Cards Completamente Interactivas

Clickeables en toda el área, no solo en el botón
Cursor pointer en hover
Redirección directa a proyectos Behance
Animación smooth al pasar el mouse
6. CTA Optimizado

"¿Tienes un proyecto en mente?"
↓
Descripción del valor
↓
Botón con animación → Email directo
Hover color dinámico con variable CSS
7. Lightbox para Galerías

Modal fullscreen
Navegación con flechas (← →)
Contador de imágenes
Loading spinner
Cierre con ESC o click fuera
Navegación por teclado
8. Modo Oscuro Persistente

Toggle en navbar
Guardado en localStorage
Transiciones suaves entre temas
Iconos animados (☀️ ↔ 🌙)
🎨 Personalización

Cambiar Colores del Tema

Edita las variables CSS en styles.css:

:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a1a1a;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    --border-color: #e5e7eb;
    --accent-color: #2563eb;       /* Color principal */
    --secondary-color: #1d4ed8;    /* Color hover botones */
    --transition: all 0.3s ease;
}

[data-theme="dark"] {
    --bg-primary: #0a0a0a;
    --bg-secondary: #151515;
    --text-primary: #f9fafb;
    --text-secondary: #9ca3af;
    --text-tertiary: #6b7280;
    --border-color: #262626;
    --accent-color: #3b82f6;
    --secondary-color: #2563eb;    /* Color hover tema oscuro */
}
Agregar Proyecto Destacado

En script.js, agrega al array featuredProjects:

{
    id: 'mi-proyecto',
    title: 'Nombre del Proyecto',
    tag: 'Categoría • Subcategoría',
    description: 'Descripción clara del proyecto y su impacto.',
    image: 'assets/img/projects/mi-proyecto.jpg',
    link: 'project.html?id=mi-proyecto',
    size: 'bento-large', // o 'bento-medium'
    featured: true
}
Crear Página de Proyecto

Duplica project.html
Actualiza el contenido del header (título, rol, imagen)
Agrega imágenes a la galería
Describe: Problema → Proceso → Solución
Lista las herramientas utilizadas
Actualizar Username de Behance

En .github/workflows/update-behance.yml, línea 29:

const username = 'TuUsername'; // Cambiar aquí
🌐 Deploy

GitHub Pages (Automático)

El sitio se despliega automáticamente cuando haces push a main:

git add .
git commit -m "Update portfolio"
git push origin main
Cambios visibles en 1-2 minutos en: https://emmeuve.github.io

Dominio Personalizado

Ve a Settings → Pages
En Custom domain, ingresa tu dominio
Configura DNS (A record o CNAME)
Espera propagación DNS (hasta 48h)
📱 Responsive Design

Breakpoints optimizados:

| Dispositivo | Ancho | Columnas Bento Grid |
|---|---|---|
| 📱 Mobile | < 768px | 1 columna |
| 💻 Tablet | 768px - 1024px | 2 columnas |
| 🖥️ Desktop | > 1024px | 3 columnas |

Características responsive:

✅ Imágenes optimizadas por dispositivo
✅ Menú hamburguesa en mobile
✅ Tipografía escalable
✅ Touch-friendly (44px mínimo)
⚡ Performance

✅ Sin dependencias externas (0 npm packages)
✅ CSS y JS optimizados (minificación manual)
✅ Fuentes del sistema (carga instantánea)
✅ Lazy loading de imágenes
✅ Animaciones GPU (transform, opacity)
✅ Código limpio y mantenible
Métricas estimadas:

First Contentful Paint: < 1s
Time to Interactive: < 2s
Lighthouse Score: 95+
🎯 Habilidades y Herramientas

🛠️ Herramientas Principales

Adobe Suite • Photoshop • Illustrator • InDesign • Figma • Canva • VS Code • HTML5 • CSS3 • JavaScript • Ruby on Rails • OpenAI • Gemini

🎨 Especialidades

Diseño UX/UI
Arquitectura de la Información
Diseño de Interacción
Prototipado en Figma
Usabilidad y Testing
Diseño Visual
Branding e Identidad
📊 Metodologías

Design Thinking
Design Sprint
Wireframing
Pruebas de Usabilidad
Investigación de Usuarios
🔗 Enlaces y Contacto

Portafolio: emmeuve.github.io
Behance: @Emmeuve
LinkedIn: Michel Valenzuela
GitHub: @emmeuve
Email: michelvalecastillo@gmail.com
Teléfono: +56 9 4794 7310
Ubicación: Santiago, Chile
🐛 Troubleshooting

GitHub Actions no se ejecuta

Verifica permisos: Settings → Actions → General → "Read and write permissions"
Revisa el workflow en Actions → Update Behance Projects
Ejecuta manualmente con "Run workflow"
Proyectos de Behance no se ven

Abre DevTools (F12) → Console
Busca errores
Verifica que assets/data/behance-projects.json existe
Re-ejecuta el workflow de GitHub Actions
Imágenes no cargan

Verifica rutas en assets/img/projects/
Revisa nombres de archivo (case-sensitive)
Usa placeholder si la imagen falla
Modo oscuro no persiste

Verifica que localStorage está habilitado
Limpia caché del navegador
Revisa Console por errores de JavaScript
Cards no son clickeables

Asegúrate de que el script.js está correctamente vinculado
Verifica que renderProjects() se ejecuta después de loadBehanceProjects()
Abre DevTools → Console para verificar errores
Logo ribbon no es draggable

Verifica que initLogoRibbon() se ejecuta
Comprueba que .logo-ribbon tiene overflow-x: auto en CSS
Limpia caché del navegador
📝 To-Do / Roadmap

 Filtros por categoría en proyectos
 Animaciones con Intersection Observer
 Sistema de blog integrado (Markdown)
 Formulario de contacto funcional (EmailJS)
 Testimonios de clientes
 Versión en inglés (i18n)
 Google Analytics 4
 Optimización WebP
 PWA (Progressive Web App)
 SEO avanzado (Schema.org)
📊 Changelog

v2.1.0 (Octubre 2025)

✅ Cards de proyectos completamente interactivas (clickeables en toda el área)
✅ Logo ribbon draggable con mouse
✅ Pausa automática de animación al interactuar
✅ Mejora en feedback visual (cursores y transiciones)
✅ Variable CSS --secondary-color para hover botones
v2.0.0 (Septiembre 2025)

✅ Integración GitHub Actions + Behance
✅ Sistema de proyectos híbrido (destacados + automáticos)
✅ Bento Grid asimétrico
✅ Badge de proyectos destacados
✅ Mejora en calidad de imágenes
✅ Eliminación del label "Project"
✅ CTA optimizado en contacto
v1.0.0 (Julio 2025)

✅ Lanzamiento inicial
✅ Diseño responsive
✅ Modo oscuro/claro
✅ Navegación con scroll activo
✅ Logo ribbon animado
📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo como referencia o base para tu propio portafolio, pero por favor da crédito y no copies el contenido personal.

👤 Autor

Michel Valenzuela Castillo

Diseñador UX/UI & Estratega Visual enfocado en interfaces intuitivas y soluciones centradas en el usuario. Apasionado por crear experiencias digitales que conecten con las personas y comuniquen de forma efectiva.

"Creo en el poder del diseño para transformar problemas complejos en soluciones simples y memorables."
⭐ Si este portafolio te resultó útil, dale una estrella en GitHub!

🚀 Última actualización: Octubre 2025
🤖 Proyectos de Behance actualizados automáticamente cada día

Hecho con ❤️, ☕ y mucho Figma en Santiago, Chile 🇨🇱
