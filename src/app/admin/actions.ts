"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminSession,
  deleteAdminSession,
  getAdminConfiguration,
  isAdminAuthenticated,
  validateAdminCredentials,
} from "@/lib/admin-auth";
import {
  updateAdminStore,
  type BookingStatus,
  type MessageStatus,
} from "@/lib/admin-store";

export type AdminLoginState = {
  error: string;
};

const attempts = new Map<string, number[]>();
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

async function requestIp(): Promise<string> {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (attempt) => now - attempt < ATTEMPT_WINDOW_MS,
  );
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  if (!getAdminConfiguration().configured) {
    return { error: "Admin access has not been configured on this server." };
  }

  const ip = await requestIp();
  if (isRateLimited(ip)) {
    return { error: "Too many sign-in attempts. Try again in 15 minutes." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!validateAdminCredentials(username, password)) {
    return { error: "The username or password is incorrect." };
  }

  attempts.delete(ip);
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  await deleteAdminSession();
  redirect("/admin");
}

function value(formData: FormData, name: string, max = 10000): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
}

function refresh(...paths: string[]) {
  revalidatePath("/admin");
  paths.forEach((path) => revalidatePath(path));
}

export async function updatePlan(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = value(formData, "id", 80);
  if (!id) throw new Error("Missing plan id.");
  const rawPrice = value(formData, "price", 20);
  const parsedPrice = rawPrice.toLowerCase() === "custom" || rawPrice === ""
    ? null
    : Number(rawPrice);
  if (parsedPrice !== null && (!Number.isFinite(parsedPrice) || parsedPrice < 0)) {
    throw new Error("Price must be a positive number or Custom.");
  }

  await updateAdminStore((store) => {
    const next = {
      id,
      name: value(formData, "name", 120),
      price: parsedPrice,
      cadence: value(formData, "cadence", 80),
      tagline: value(formData, "tagline", 500),
      bestFor: value(formData, "bestFor", 500),
      features: value(formData, "features", 5000)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      ctaLabel: value(formData, "ctaLabel", 120),
      featured: formData.get("featured") === "on",
    };
    store.planOverrides = [
      ...store.planOverrides.filter((item) => item.id !== id),
      next,
    ];
    return store;
  });
  refresh("/", "/pricing", "/contact");
}

function cleanSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

export async function savePost(formData: FormData): Promise<void> {
  await requireAdmin();
  const originalSlug = cleanSlug(value(formData, "originalSlug", 100));
  const slug = cleanSlug(value(formData, "slug", 100));
  const title = value(formData, "title", 200);
  const body = value(formData, "body", 100000);
  if (!slug || !title || !body) throw new Error("Slug, title, and article body are required.");
  const coverInput = value(formData, "cover", 500);
  const cover = coverInput.startsWith("/") ? coverInput : "";

  await updateAdminStore((store) => {
    if (originalSlug && originalSlug !== slug) {
      store.posts = store.posts.filter((post) => post.slug !== originalSlug);
      if (!store.hiddenPostSlugs.includes(originalSlug)) {
        store.hiddenPostSlugs.push(originalSlug);
      }
    }
    store.posts = [
      ...store.posts.filter((post) => post.slug !== slug),
      {
        slug,
        title,
        description: value(formData, "description", 600),
        date: value(formData, "date", 10),
        category: value(formData, "category", 100) || "Guides",
        author: value(formData, "author", 120) || "Upveraoffer",
        cover,
        coverAlt: value(formData, "coverAlt", 300),
        coverCredit: value(formData, "coverCredit", 120),
        coverCreditUrl: value(formData, "coverCreditUrl", 500),
        body,
        published: formData.get("published") === "on",
      },
    ];
    store.hiddenPostSlugs = store.hiddenPostSlugs.filter((item) => item !== slug);
    return store;
  });
  refresh("/", "/blog", `/blog/${slug}`);
}

export async function deletePost(slug: string): Promise<void> {
  await requireAdmin();
  const clean = cleanSlug(slug);
  await updateAdminStore((store) => {
    store.posts = store.posts.filter((post) => post.slug !== clean);
    if (!store.hiddenPostSlugs.includes(clean)) store.hiddenPostSlugs.push(clean);
    return store;
  });
  refresh("/", "/blog", `/blog/${clean}`);
}

export async function saveFeedback(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = value(formData, "id", 160) || randomUUID();
  const quote = value(formData, "quote", 4000);
  const name = value(formData, "name", 160);
  const role = value(formData, "role", 200);
  if (!quote || !name || !role) throw new Error("Quote, name, and role are required.");
  const ratingRaw = Number(value(formData, "rating", 2));
  const rating = Number.isInteger(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5
    ? ratingRaw
    : null;

  await updateAdminStore((store) => {
    store.feedback = [
      ...store.feedback.filter((item) => item.id !== id),
      {
        id,
        quote,
        name,
        role,
        company: value(formData, "company", 200),
        service: value(formData, "service", 160),
        outcome: value(formData, "outcome", 300),
        rating,
        photo: value(formData, "photo", 500),
        published: formData.get("published") === "on",
      },
    ];
    store.hiddenFeedbackIds = store.hiddenFeedbackIds.filter((item) => item !== id);
    return store;
  });
  refresh("/", "/success-stories");
}

export async function deleteFeedback(id: string): Promise<void> {
  await requireAdmin();
  await updateAdminStore((store) => {
    store.feedback = store.feedback.filter((item) => item.id !== id);
    if (id.startsWith("built-in-") && !store.hiddenFeedbackIds.includes(id)) {
      store.hiddenFeedbackIds.push(id);
    }
    return store;
  });
  refresh("/", "/success-stories");
}

export async function updateMessage(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const allowed: MessageStatus[] = ["new", "read", "replied", "archived"];
  const status = value(formData, "status", 20) as MessageStatus;
  if (!allowed.includes(status)) throw new Error("Invalid message status.");
  await updateAdminStore((store) => {
    store.messages = store.messages.map((message) =>
      message.id === id ? { ...message, status } : message,
    );
    return store;
  });
  refresh();
}

export async function updateBooking(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const allowed: BookingStatus[] = ["requested", "confirmed", "completed", "cancelled"];
  const status = value(formData, "status", 20) as BookingStatus;
  if (!allowed.includes(status)) throw new Error("Invalid booking status.");
  await updateAdminStore((store) => {
    store.bookings = store.bookings.map((booking) =>
      booking.id === id
        ? {
            ...booking,
            status,
            scheduledAt: value(formData, "scheduledAt", 40),
            internalNotes: value(formData, "internalNotes", 3000),
          }
        : booking,
    );
    return store;
  });
  refresh();
}

export async function createBooking(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = value(formData, "name", 120);
  const email = value(formData, "email", 240);
  if (!name || !email) throw new Error("Name and email are required.");
  const status = (value(formData, "status", 20) || "confirmed") as BookingStatus;
  await updateAdminStore((store) => {
    store.bookings.unshift({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      requestedDate: value(formData, "requestedDate", 10),
      requestedTime: value(formData, "requestedTime", 10),
      timezone: value(formData, "timezone", 120),
      service: value(formData, "service", 160),
      notes: value(formData, "notes", 3000),
      internalNotes: value(formData, "internalNotes", 3000),
      scheduledAt: value(formData, "scheduledAt", 40),
      status,
    });
    return store;
  });
  refresh();
}
