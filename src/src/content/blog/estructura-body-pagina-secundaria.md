---
title: "Cómo separo el estilo de las páginas internas sin tocar el CSS original"
date: "2026-08-05"
excerpt: "Un patrón simple que uso en este mismo portafolio: una clase en el body para sobreescribir el grid del home."
tags: ["css", "arquitectura"]
---

Uno de los problemas típicos al armar un sitio con una home muy visual (grid, animaciones, etc.) es que ese mismo CSS termina "rompiendo" el layout de las páginas internas (about, contacto, un post como este).

La solución que uso acá es simple: agrego una clase al `body` solo en las páginas secundarias, por ejemplo `body.pagina-secundaria`, y con eso puedo sobreescribir puntualmente las reglas del grid del home sin tocar el CSS original ni duplicar archivos.

Ventajas:

- No hay que reescribir el CSS del home.
- Es fácil de revertir: se saca la clase y listo.
- Queda explícito en el markup qué páginas usan el layout "especial".

Es un patrón chico, pero evita bastante dolor de cabeza cuando el sitio crece.
