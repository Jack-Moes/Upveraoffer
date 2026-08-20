import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  readingTime: number; // minutes
  author: string;
};

export type Post = PostMeta & { html: string };

function readFileFor(slug: string) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

function toMeta(slug: string, data: Record<string, unknown>, body: string): PostMeta {
  const words = body.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? "Guides"),
    author: String(data.author ?? "Upveraoffer"),
    readingTime: Math.max(1, Math.round(words / 220)),
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const raw = readFileFor(slug);
      if (!raw) return null;
      const { data, content } = matter(raw);
      return toMeta(slug, data, content);
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const raw = readFileFor(slug);
  if (!raw) return null;
  const { data, content } = matter(raw);
  const html = await marked.parse(content, { async: true });
  return { ...toMeta(slug, data, content), html };
}

export function getCategories(): string[] {
  return [...new Set(getAllPosts().map((p) => p.category))].sort();
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
