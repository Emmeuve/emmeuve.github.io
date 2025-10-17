# Portfolio Michel Valenzuela

Portafolio web minimalista y profesional de Michel Valenzuela, Diseñador UX/UI & Estratega Visual especializado en interfaces intuitivas y soluciones centradas en el usuario.

🔗 **[Ver sitio en vivo](https://emmeuve.github.io)**

## 👨‍🎨 Sobre Mí

Diseñador UX/UI con sólida base en diseño gráfico y comunicación visual. Mi enfoque es centrado en el usuario; transformo problemas complejos en interfaces digitales intuitivas y funcionales. Especializado en la creación de experiencias coherentes que alinean los objetivos del negocio con las necesidades del usuario utilizando metodologías como Design Thinking y Design Sprint.

## ✨ Características del Portafolio

- 🎨 Diseño minimalista inspirado en Frame & Form
- 🌓 Modo oscuro/claro con persistencia (localStorage)
- 📱 Completamente responsive (mobile, tablet, desktop)
- 🎯 Navegación fija con scroll activo
- 🖼️ Bento Grid para proyectos (estilo asimétrico)
- 🎬 Lightbox para galerías de proyectos
- 🎨 Ribbon animado de logos de herramientas
- 💬 CTA (Call to Action) en sección de contacto
- ⚡ Performance optimizado
- ♿ Accesible (ARIA labels, navegación por teclado)
- 🚀 Deploy automático con GitHub Pages

## 🛠️ Tecnologías

- HTML5 (Semántico)
- CSS3 (Variables CSS, Grid, Flexbox, Animations)
- JavaScript ES6+ (Vanilla)
- GitHub Pages (Hosting)

## 📋 Secciones

### Página Principal (index.html)
- **Header** - Foto de perfil, nombre, título y bio
- **Mi Enfoque** - Descripción del enfoque profesional y metodologías
- **Experiencia Profesional** - Timeline con historial laboral
- **Casos de Estudio** - Bento Grid con proyectos destacados
- **Habilidades** - Herramientas, especialidades y metodologías con ribbon animado
- **Formación** - Educación y certificaciones
- **Contacto** - CTA principal + información de contacto

### Página de Proyecto (project.html)
- **Hero del proyecto** - Imagen destacada, título y rol
- **Galería** - Grid de imágenes con lightbox
- **Descripción** - Problema, Proceso, Solución
- **Herramientas** - Logos de tecnologías utilizadas
- **Navegación** - Volver al portfolio

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/emmeuve/emmeuve.github.io.git

# Navegar al directorio
cd emmeuve.github.io

# Abrir con Live Server o cualquier servidor local
```

## 📁 Estructura del Proyecto

```
emmeuve.github.io/
├── index.html              # Página principal
├── project.html            # Template de página de proyecto
├── styles.css              # Estilos globales
├── script.js               # JavaScript funcionalidad
├── README.md               # Este archivo
└── assets/
    └── img/
        ├── profile.jpeg    # Foto de perfil
        ├── projects/       # Imágenes de proyectos
        │   ├── project-1.jpg
        │   ├── project-2.jpg
        │   └── ...
        ├── png/            # Recursos PNG
        └── logos/
            └── official/   # Logos de herramientas
                ├── photoshop.svg
                ├── illustrator.svg
                ├── indesign.svg
                ├── figma.svg
                ├── canva.svg
                ├── vscode.svg
                ├── html5.svg
                ├── css3.svg
                ├── js.svg
                ├── rails.svg
                ├── openai.svg
                └── gemini.svg
```

## 🎯 Características Destacadas

### 1. **Bento Grid (Casos de Estudio)**
Diseño inspirado en Frame & Form con grid asimétrico:
- Proyectos grandes: 2 columnas
- Proyectos medianos: 1 columna
- Hover elegante con transform
- Links directos a casos de estudio

### 2. **Navegación Inteligente**
- Navbar fijo con blur backdrop
- Links activos según scroll
- Menú hamburguesa responsive
- Smooth scroll a secciones

### 3. **Logo Ribbon Animado**
- Scroll infinito automático
- Pausa al hover
- Logos SVG adaptativos al tema
- 12 herramientas destacadas

### 4. **CTA Optimizado**
- Título impactante
- Descripción del valor
- Botón con animación al hover
- Link directo a email

### 5. **Lightbox para Galerías**
- Modal fullscreen
- Navegación con flechas
- Contador de imágenes
- Loading spinner
- Cierre con ESC o click fuera

### 6. **Modo Oscuro Persistente**
- Toggle en navbar
- Guardado en localStorage
- Transiciones suaves
- Iconos animados (sol/luna)

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a1a1a;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    --border-color: #e5e7eb;
    --accent-color: #2563eb;
    --secondary-color: #1e40af;
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
}
```

### Agregar Nuevo Proyecto al Bento Grid

```html
<div class="bento-item bento-large">
    <div class="bento-image">
        <img src="assets/img/projects/tu-proyecto.jpg" alt="Nombre Proyecto">
    </div>
    <div class="bento-content">
        <span class="bento-project-label">Project</span>
        <h3 class="bento-project-name">Nombre del Proyecto</h3>
        <p class="bento-tag">Categoría del Proyecto</p>
        <p class="bento-description">
            Descripción breve del proyecto y su impacto.
        </p>
        <a href="project.html" class="bento-link">Ver proyecto →</a>
    </div>
</div>
```

Clases disponibles:
- `.bento-large` - 2 columnas
- `.bento-medium` - 1 columna

### Crear Nueva Página de Proyecto

1. Duplica `project.html`
2. Actualiza el contenido del header
3. Agrega imágenes a la galería
4. Modifica las secciones descriptivas
5. Actualiza las herramientas utilizadas

## 🌐 Deploy

Este sitio se despliega automáticamente con GitHub Pages cuando haces push a la rama `main`.

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Los cambios se reflejarán en https://emmeuve.github.io en 1-2 minutos.

## 📱 Responsive Design

Breakpoints optimizados para:
- 📱 Mobile (< 768px) - Grid 1 columna
- 💻 Tablet (768px - 1024px) - Grid 2 columnas
- 🖥️ Desktop (> 1024px) - Grid 3 columnas

## ⚡ Performance

- ✅ Sin dependencias externas
- ✅ CSS y JS optimizados
- ✅ Fuentes del sistema nativa
- ✅ Lazy loading de imágenes
- ✅ Animaciones con CSS transforms
- ✅ Código limpio y mantenible

## 🎯 Especialidades

### Herramientas
- Adobe Suite (Photoshop, Illustrator, InDesign)
- Figma
- Canva
- VS Code
- HTML5, CSS3, JavaScript
- Ruby on Rails
- OpenAI / Gemini

### Áreas de Expertise
- **Diseño UX/UI**
- **Arquitectura de la Información**
- **Diseño de Interacción**
- Prototipado
- Usabilidad
- Diseño Visual
- Branding

### Metodologías
- **Design Thinking**
- **Design Sprint**
- Wireframing
- Pruebas de Usabilidad

## 🔗 Enlaces

- **Portafolio:** [emmeuve.github.io](https://emmeuve.github.io)
- **Behance:** [@Emmeuve](https://www.behance.net/Emmeuve)
- **LinkedIn:** [Michel Valenzuela](https://www.linkedin.com/in/michelvalenzuelacastillo/)
- **GitHub:** [@emmeuve](https://github.com/emmeuve)

## 📫 Contacto

- **Email:** michelvalecastillo@gmail.com
- **Teléfono:** +56 9 4794 7310
- **Ubicación:** Puente Alto, Santiago, Chile
- **Disponibilidad:** Proyectos remotos y presenciales

## 🐛 Características del Lightbox

- Navegación con teclado (←, →, ESC)
- Click fuera de la imagen para cerrar
- Indicador de carga (spinner)
- Contador de imágenes
- Caption opcional
- Animaciones suaves de entrada/salida
- Accesible (ARIA labels)

## 📝 To-Do / Mejoras Futuras

- [ ] Agregar filtros por categoría en proyectos
- [ ] Implementar animaciones Framer Motion
- [ ] Agregar testimonios de clientes
- [ ] Sistema de blog integrado
- [ ] Formulario de contacto funcional
- [ ] Animaciones de scroll (Intersection Observer)
- [ ] Métricas con Google Analytics
- [ ] Optimización de imágenes con WebP
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo como referencia o base para tu propio portafolio.

## 👤 Autor

**Michel Valenzuela Castillo**

Diseñador UX/UI & Estratega Visual enfocado en interfaces intuitivas y soluciones centradas en el usuario. Apasionado por crear experiencias digitales que conecten con las personas y comuniquen de forma efectiva.

---

⭐ Si te gustó este portafolio, dale una estrella en GitHub!

Hecho con ❤️ y ☕ en Santiago, Chile 🇨🇱