import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { site } from "@/content/site";
import { updateAdminStore } from "@/lib/admin-store";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Very small in-memory rate limit. Good enough to blunt casual abuse of a
 * marketing contact form; it resets on cold start and is per-instance, so
 * move to a durable store (Upstash, Vercel KV) if volume ever justifies it.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill every field they find.
  if (str(body.companyWebsite)) {
    // Report success so the bot does not learn what happened.
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look right." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this address. Try again later." },
      { status: 429 },
    );
  }

  const currentRole = str(body.currentRole) || "—";
  const targetRole = str(body.targetRole) || "—";
  const service = str(body.service) || "—";
  const plan = str(body.plan) || "—";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  try {
    await updateAdminStore((store) => {
      store.messages.unshift({
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        name,
        email,
        currentRole,
        targetRole,
        service,
        plan,
        message,
        status: "new",
      });
      return store;
    });
  } catch (error) {
    console.error("[contact] Could not save message to the admin inbox:", error);
    return NextResponse.json(
      {
        ok: false,
        error: `We could not save that. Please email ${site.email} directly.`,
      },
      { status: 500 },
    );
  }

  // Email is an optional notification. The private inbox is the source of
  // truth even when Resend has not been connected yet.
  if (!apiKey || !from) {
    return NextResponse.json({ ok: true, notification: "stored-only" });
  }

  const text = [
    `New enquiry from the ${site.name} website`,
    "",
    `Name:         ${name}`,
    `Email:        ${email}`,
    `Current role: ${currentRole}`,
    `Target role:  ${targetRole}`,
    `Needs:        ${service}`,
    `Package:      ${plan}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New enquiry — ${name}${plan !== "—" ? ` (${plan})` : ""}`,
      text,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json({ ok: true, notification: "email-failed" });
    }

    return NextResponse.json({ ok: true, notification: "email-sent" });
  } catch (err) {
    console.error("[contact] Unexpected failure:", err);
    return NextResponse.json({ ok: true, notification: "email-failed" });
  }
}
