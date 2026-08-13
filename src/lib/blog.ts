import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  contentHtml: string;
}

// Vite reads every .md file in src/content/blog at build time.
// To add a new post: just drop a new .md file in that folder, no code changes needed.
const rawPosts = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const [, frontmatter, body] = match;
  const data: Record<string, string> = {};

  frontmatter.split("\n").forEach((line) => {
    const lineMatch = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (!lineMatch) return;
    const [, key, rawValue] = lineMatch;
    // strip surrounding quotes and [] for the tags array
    const value = rawValue.trim().replace(/^"(.*)"$/, "$1");
    data[key] = value;
  });

  return { data, body: body.trim() };
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim().replace(/^"(.*)"$/, "$1"))
    .filter(Boolean);
}

function slugFromPath(path: string): string {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? path;
}

export const posts: BlogPost[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      title: data.title ?? slugFromPath(path),
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tags: parseTags(data.tags),
      contentHtml: marked.parse(body, { async: false }) as string,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
