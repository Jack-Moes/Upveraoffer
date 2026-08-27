import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { readAdminStore, type StoredPost } from "@/lib/admin-store";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  readingTime: number; // minutes
  author: string;
  /** Path under /public, e.g. "/images/blog/foo.jpg". Empty = no cover. */
  cover: string;
  /** Describes the image for screen readers. Never leave this empty. */
  coverAlt: string;
  /** Photographer name — see public/images/CREDITS.md. */
  coverCredit: string;
  coverCreditUrl: string;
};

export type Post = PostMeta & { html: string };
export type PostDraft = PostMeta & {
  body: string;
  published: boolean;
  isBuiltIn: boolean;
};

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
    cover: String(data.cover ?? ""),
    coverAlt: String(data.coverAlt ?? ""),
    coverCredit: String(data.coverCredit ?? ""),
    coverCreditUrl: String(data.coverCreditUrl ?? ""),
  };
}

function getMarkdownPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function storedToMeta(post: StoredPost): PostMeta {
  return toMeta(post.slug, post, post.body);
}

export async function getPostSlugs(): Promise<string[]> {
  const store = await readAdminStore();
  const visibleMarkdown = getMarkdownPostSlugs().filter(
    (slug) => !store.hiddenPostSlugs.includes(slug),
  );
  const stored = store.posts
    .filter((post) => post.published)
    .map((post) => post.slug);
  return [...new Set([...visibleMarkdown, ...stored])];
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const store = await readAdminStore();
  const stored = new Map(store.posts.map((post) => [post.slug, post]));
  const markdown = getMarkdownPostSlugs()
    .filter((slug) => !store.hiddenPostSlugs.includes(slug))
    .map((slug) => {
      const override = stored.get(slug);
      if (override) return override.published ? storedToMeta(override) : null;
      const raw = readFileFor(slug);
      if (!raw) return null;
      const { data, content } = matter(raw);
      return toMeta(slug, data, content);
    })
    .filter((p): p is PostMeta => p !== null);
  const custom = store.posts
    .filter(
      (post) =>
        post.published && !getMarkdownPostSlugs().includes(post.slug),
    )
    .map(storedToMeta);

  return [...markdown, ...custom]
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const store = await readAdminStore();
  const stored = store.posts.find((post) => post.slug === slug);
  if (stored) {
    if (!stored.published) return null;
    const html = await marked.parse(stored.body, { async: true });
    return { ...storedToMeta(stored), html };
  }
  if (store.hiddenPostSlugs.includes(slug)) return null;

  const raw = readFileFor(slug);
  if (!raw) return null;
  const { data, content } = matter(raw);
  const html = await marked.parse(content, { async: true });
  return { ...toMeta(slug, data, content), html };
}

export async function getAllPostDrafts(): Promise<PostDraft[]> {
  const store = await readAdminStore();
  const stored = new Map(store.posts.map((post) => [post.slug, post]));
  const builtIns = getMarkdownPostSlugs()
    .filter((slug) => !store.hiddenPostSlugs.includes(slug))
    .map((slug) => {
      const override = stored.get(slug);
      if (override) {
        return {
          ...storedToMeta(override),
          body: override.body,
          published: override.published,
          isBuiltIn: true,
        };
      }
      const raw = readFileFor(slug);
      if (!raw) return null;
      const { data, content } = matter(raw);
      return {
        ...toMeta(slug, data, content),
        body: content.trim(),
        published: true,
        isBuiltIn: true,
      };
    })
    .filter((post): post is PostDraft => post !== null);
  const custom = store.posts
    .filter((post) => !getMarkdownPostSlugs().includes(post.slug))
    .map((post) => ({
      ...storedToMeta(post),
      body: post.body,
      published: post.published,
      isBuiltIn: false,
    }));

  return [...builtIns, ...custom].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export async function getCategories(): Promise<string[]> {
  return [...new Set((await getAllPosts()).map((p) => p.category))].sort();
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
