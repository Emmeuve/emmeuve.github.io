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

