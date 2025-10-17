# Instrucciones rápidas para agentes AI (proyecto: emmeuve.github.io)

Resumen breve
- Sitio estático de portafolio (single-page) compuesto por `index.html`, `styles.css` y `script.js`.
- No hay build: deploy directo a GitHub Pages desde la rama `main`.

Arquitectura y propósito
- `index.html`: contenido principal — secciones semánticas (About, Experience, Projects, Skills, Contact).
- `styles.css`: variables CSS (tema claro/oscuro), patrones responsive (breakpoint principal: 768px) y utilidades de layout (container, grid).
- `script.js`: lógica mínima de UI — toggle de tema (persistencia en `localStorage`), menú hamburguesa, smooth scroll, IntersectionObserver para animaciones, y normalización de enlaces externos.

Pautas detectadas y convenciones del repo
- Tema: `html` usa atributo `data-theme` con valores `light`/`dark`. CSS define `:root` y `[data-theme="dark"]`.
  Ejemplo: `localStorage.setItem('theme', newTheme)` y `html.setAttribute('data-theme', newTheme)` en `script.js`.
- Variables centrales para personalización: modificar `:root { --bg-primary; --accent-color; --text-primary }` en `styles.css`.
- Responsive: principal breakpoint en `@media (max-width: 768px)`; cambios importantes (perfil, grid, menú).
- Assets: imágenes en `assets/img/` (ej. `profile.jpeg`). Evitar rutas absolutas.

Problemas y observaciones importantes (acción inmediata recomendada)
- `script.js` tiene lógica para resaltar enlace de navegación según sección:
  ```js
  const sections = document.querySelectorAll('section[id]')
  // ... busca .nav-link[href="#${sectionId}"]
  ```
  Pero las secciones en `index.html` no tienen atributos `id`. Para que el resalte en el nav funcione, añadir ids coherentes (`id="resumen"`, `id="proyectos"`, `id="habilidades"`, `id="contacto"`) a las secciones correspondientes.
- No hay tests ni CI. Cambios grandes deben ser verificados manualmente en navegador (Live Server o abrir `index.html`).

Flujo de desarrollo y comandos útiles
- Desarrollo local (no requiere instalación):
  - Clonar y abrir `index.html` en el navegador o usar extensión Live Server.
  - Para deploy: push a `main` (GitHub Pages configura publicación automática).
  Ejemplo rápido:
  ```bash
  git clone <repo>
  cd emmeuve.github.io
  # editar archivos localmente, luego:
  git add . && git commit -m "Cambios" && git push origin main
  ```

Qué cambiar y ejemplos concretos que suelen pedirse
- Cambiar colores del tema: editar variables en `styles.css` (`--accent-color`, `--bg-primary`).
- Actualizar foto de perfil: reemplazar `assets/img/profile.jpeg` (mantener proporciones cuadradas para `object-fit: cover`).
- Añadir/actualizar secciones: duplicar la estructura de una `.section` y añadir `id` para navegación y scroll-highlight.
- Arreglar nav highlight: añadir `id` a cada `<section>` y mantener los `href` de `.nav-link` sin cambios.

Patrones del código que los agentes deben respetar
- Minimalismo: evitar añadir dependencias externas (el proyecto presume 0 dependencias).
- Mínima lógica JS: mantener compatibilidad con navegadores modernos (ES6+) y conservar uso de APIs nativas (IntersectionObserver, scrollIntoView).
- Mantener estructura semántica del HTML y classes existentes (CSS está atado a clases concretas como `.section`, `.profile-image`, `.nav-menu`).

Cómo verificar cambios rápidamente
- Abrir `index.html` en navegador y comprobar:
  - Toggle de tema (persistencia tras recarga).
  - Menú hamburguesa en pantalla estrecha.
  - Animaciones (fade-in) al hacer scroll.
  - Links externos abren en nueva pestaña.

Si algo no es claro
- Pregunta puntual al mantenedor: indicar qué sección (`#resumen`, `#proyectos`, `#habilidades`, `#contacto`) o archivo modificar y si prefieres cambios visuales (colores, tipografía), de contenido (texto, contactos) o funcionales (comportamiento JS). 

Fin — solicita feedback antes de aplicar cambios automáticos.
