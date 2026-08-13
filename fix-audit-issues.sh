#!/bin/bash
set -e
echo "1/7 Rescatando posts del blog si están en la carpeta duplicada src/src..."

if [ -d 'src/src/content/blog' ] && [ ! -d 'src/content/blog' ]; then
  mkdir -p src/content/blog
  cp src/src/content/blog/*.md src/content/blog/ 2>/dev/null || true
  echo "  Posts recuperados a src/content/blog"
fi
rm -rf src/src

echo "2/7 Borrando carpetas duplicadas..."
rm -rf "src/pages 2"
rm -rf "src/components 2"
rm -rf "src/assets 2"
rm -rf "src/hooks 2"
rm -rf "src/data 2"
rm -rf "src/lib 2"
rm -rf "src/test 2"
rm -rf "public/data 2"

echo "3/7 Copiando imagen OG..."
mkdir -p public

cat > public/og-image.jpg.b64 << 'B64_EOF'
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
B64_EOF
base64 -d public/og-image.jpg.b64 > public/og-image.jpg && rm public/og-image.jpg.b64

echo "4/7 Escribiendo index.html, robots.txt, App.tsx, package.json, script de build..."

mkdir -p $(dirname 'index.html')
cat > 'index.html' << 'FILE_EOF_MARKER'
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Michel Valenzuela — Diseñador UX/UI &amp; Full-Stack Developer</title>
    <meta name="description" content="Portafolio de Michel Valenzuela, diseñador UX/UI y desarrollador Full-Stack en Santiago, Chile. Proyectos de diseño, Ruby on Rails, React y notas sobre el proceso." />
    <meta name="author" content="Michel Valenzuela" />
    <link rel="canonical" href="https://emmeuve.github.io/" />

    <meta property="og:title" content="Michel Valenzuela — Diseñador UX/UI & Full-Stack Developer" />
    <meta property="og:description" content="Portafolio de Michel Valenzuela: diseño UX/UI, desarrollo Full-Stack con Ruby on Rails y React, y notas de aprendizaje." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://emmeuve.github.io/" />
    <meta property="og:image" content="https://emmeuve.github.io/og-image.jpg" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@MichelValenzuela" />
    <meta name="twitter:title" content="Michel Valenzuela — Diseñador UX/UI & Full-Stack Developer" />
    <meta name="twitter:description" content="Portafolio de Michel Valenzuela: diseño UX/UI, desarrollo Full-Stack con Ruby on Rails y React, y notas de aprendizaje." />
    <meta name="twitter:image" content="https://emmeuve.github.io/og-image.jpg" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Michel Valenzuela Castillo",
      "url": "https://emmeuve.github.io/",
      "jobTitle": "Diseñador UX/UI & Desarrollador Full-Stack",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santiago",
        "addressCountry": "CL"
      },
      "sameAs": [
        "https://www.linkedin.com/in/michelvalenzuelacastillo",
        "https://www.behance.net/Emmeuve"
      ]
    }
    </script>
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y1foa3rdcd");
</script>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

FILE_EOF_MARKER

mkdir -p $(dirname 'public/robots.txt')
cat > 'public/robots.txt' << 'FILE_EOF_MARKER'
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://emmeuve.github.io/sitemap.xml

FILE_EOF_MARKER

mkdir -p $(dirname 'src/App.tsx')
cat > 'src/App.tsx' << 'FILE_EOF_MARKER'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/:slug" element={<CaseStudy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

FILE_EOF_MARKER

mkdir -p $(dirname 'package.json')
cat > 'package.json' << 'FILE_EOF_MARKER'
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "postbuild": "node scripts/generate-static-files.mjs",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.29.2",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "marked": "^18.0.9",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.20",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "jsdom": "^20.0.3",
    "lovable-tagger": "^1.1.13",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19",
    "vitest": "^3.2.4"
  }
}

FILE_EOF_MARKER

mkdir -p $(dirname 'scripts/generate-static-files.mjs')
cat > 'scripts/generate-static-files.mjs' << 'FILE_EOF_MARKER'
// Runs automatically after `npm run build` (npm's "postbuild" lifecycle hook).
// 1) Copies index.html to 404.html so GitHub Pages serves the SPA for any
//    real route (e.g. /blog, /blog/some-post) instead of a hard 404.
// 2) Generates sitemap.xml from the actual blog posts + case studies.
// 3) Generates llms.txt, a short machine-readable summary of the site.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteUrl = "https://emmeuve.github.io";

// --- 1. 404.html fallback -------------------------------------------------
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));

// --- gather blog post slugs + titles ---------------------------------------
const blogDir = path.join(root, "src", "content", "blog");
const posts = fs.existsSync(blogDir)
  ? fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const raw = fs.readFileSync(path.join(blogDir, f), "utf-8");
        const titleMatch = raw.match(/^title:\s*"?(.*?)"?\s*$/m);
        const dateMatch = raw.match(/^date:\s*"?(.*?)"?\s*$/m);
        return {
          slug: f.replace(/\.md$/, ""),
          title: titleMatch ? titleMatch[1] : f,
          date: dateMatch ? dateMatch[1] : "",
        };
      })
  : [];

// --- gather case study slugs ------------------------------------------------
const projectsFile = path.join(root, "src", "data", "projects.ts");
let projectSlugs = [];
if (fs.existsSync(projectsFile)) {
  const raw = fs.readFileSync(projectsFile, "utf-8");
  projectSlugs = [...raw.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

// --- 2. sitemap.xml ----------------------------------------------------------
const staticUrls = ["/", "/blog"];
const blogUrls = posts.map((p) => `/blog/${p.slug}`);
const projectUrls = projectSlugs.map((slug) => `/case-study/${slug}`);
const allUrls = [...staticUrls, ...blogUrls, ...projectUrls];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

// --- 3. llms.txt ---------------------------------------------------------
const llmsTxt = `# Michel Valenzuela — Portafolio

> Diseñador UX/UI y desarrollador Full-Stack en Santiago, Chile. Trabaja con Ruby on Rails, React y diseño de producto centrado en el usuario.

## Páginas principales

- [Home](${siteUrl}/): presentación, proyectos destacados, sobre mí, contacto.
- [Blog](${siteUrl}/blog): notas y aprendizajes sobre diseño y desarrollo.

## Posts del blog

${posts.map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug})${p.date ? ` — ${p.date}` : ""}`).join("\n") || "- (todavía sin posts)"}

## Proyectos (case studies)

${projectSlugs.map((slug) => `- ${siteUrl}/case-study/${slug}`).join("\n") || "- (sin proyectos listados)"}
`;
fs.writeFileSync(path.join(dist, "llms.txt"), llmsTxt);

console.log(`✅ Generados: 404.html, sitemap.xml (${allUrls.length} URLs), llms.txt (${posts.length} posts)`);

FILE_EOF_MARKER

echo "5/7 Verificando que los posts del blog existan en src/content/blog..."
if [ ! -d "src/content/blog" ] || [ -z "$(ls -A src/content/blog 2>/dev/null)" ]; then
  echo "  ADVERTENCIA: src/content/blog está vacía. Volvé a correr setup-blog.sh."
fi

echo "6/7 Instalando dependencias e instalando build..."
npm install
npm run build

echo "7/7 Listo. Revisá git status antes de subir."
