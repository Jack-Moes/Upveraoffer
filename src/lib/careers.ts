import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CAREERS_DIR = path.join(process.cwd(), "src", "content", "careers");

export type Workplace = "Remote" | "Hybrid" | "On-site";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type JobMeta = {
  slug: string;
  title: string;
  department: string;
  location: string;
  workplace: Workplace;
  employmentType: EmploymentType;
  experience: string;
  summary: string;
  /** ISO yyyy-mm-dd */
  postedDate: string;
  /** ISO yyyy-mm-dd. Empty means no fixed closing date. */
  closingDate: string;
  /** Set false to keep the file but hide the role from the site. */
  open: boolean;
  salary: {
    min: number | null;
    max: number | null;
    currency: string;
    period: "year" | "month" | "day" | "hour";
  };
  /** Short bullets shown on the listing card. */
  highlights: string[];
  applyEmail: string;
  /**
   * Countries you can actually employ in, for JobPosting structured data.
   * Google expects real country names here, so "Worldwide" is not valid —
   * leave this empty and the field is omitted rather than emitted wrong.
   */
  applicantCountries: string[];
};

export type Job = JobMeta & { html: string };

function readFileFor(slug: string) {
  const file = path.join(CAREERS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

function num(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function toMeta(slug: string, data: Record<string, unknown>): JobMeta {
  const salary = (data.salary ?? {}) as Record<string, unknown>;
  return {
    slug,
    title: String(data.title ?? slug),
    department: String(data.department ?? "General"),
    location: String(data.location ?? "Remote"),
    workplace: (String(data.workplace ?? "Remote") as Workplace),
    employmentType: (String(data.employmentType ?? "Full-time") as EmploymentType),
    experience: String(data.experience ?? ""),
    summary: String(data.summary ?? ""),
    postedDate: String(data.postedDate ?? ""),
    closingDate: String(data.closingDate ?? ""),
    open: data.open !== false,
    salary: {
      min: num(salary.min),
      max: num(salary.max),
      currency: String(salary.currency ?? "USD"),
      period: (String(salary.period ?? "year") as JobMeta["salary"]["period"]),
    },
    highlights: Array.isArray(data.highlights) ? data.highlights.map(String) : [],
    applyEmail: String(data.applyEmail ?? ""),
    applicantCountries: Array.isArray(data.applicantCountries)
      ? data.applicantCountries.map(String)
      : [],
  };
}

export function getJobSlugs(): string[] {
  if (!fs.existsSync(CAREERS_DIR)) return [];
  return fs
    .readdirSync(CAREERS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Open roles only, newest first — what the careers page lists. */
export function getOpenJobs(): JobMeta[] {
  return getJobSlugs()
    .map((slug) => {
      const raw = readFileFor(slug);
      if (!raw) return null;
      return toMeta(slug, matter(raw).data);
    })
    .filter((j): j is JobMeta => j !== null && j.open)
    .sort((a, b) => (a.postedDate < b.postedDate ? 1 : -1));
}

export async function getJob(slug: string): Promise<Job | null> {
  const raw = readFileFor(slug);
  if (!raw) return null;
  const { data, content } = matter(raw);
  const html = await marked.parse(content, { async: true });
  return { ...toMeta(slug, data), html };
}

/** Departments present across open roles, for the filter chips. */
export function getDepartments(): string[] {
  return [...new Set(getOpenJobs().map((j) => j.department))].sort();
}

export function formatSalary(salary: JobMeta["salary"]): string | null {
  const { min, max, currency, period } = salary;
  if (min === null && max === null) return null;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  const per = period === "year" ? "per year" : `per ${period}`;
  if (min !== null && max !== null) return `${fmt(min)} – ${fmt(max)} ${per}`;
  return `${fmt((min ?? max) as number)} ${per}`;
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
