import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "upveraoffer_admin";
const SESSION_LIFETIME_SECONDS = 8 * 60 * 60;
const MIN_PASSWORD_LENGTH = 6;

type SessionPayload = {
  role: "admin";
  expiresAt: number;
};

function credentials() {
  return {
    username: process.env.ADMIN_USERNAME?.trim() || "admin",
    password: process.env.ADMIN_PASSWORD || "",
    secret: process.env.ADMIN_SESSION_SECRET || "",
  };
}

function safeEqual(left: string, right: string): boolean {
  const leftDigest = createHash("sha256").update(left, "utf8").digest();
  const rightDigest = createHash("sha256").update(right, "utf8").digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function sessionCookieOptions(maxAge = SESSION_LIFETIME_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/admin",
    maxAge,
    priority: "high" as const,
  };
}

export function getAdminConfiguration() {
  const config = credentials();

  return {
    configured:
      config.password.length >= MIN_PASSWORD_LENGTH && config.secret.length >= 32,
    username: config.username,
  };
}

export function validateAdminCredentials(
  username: string,
  password: string,
): boolean {
  const config = credentials();
  if (
    config.password.length < MIN_PASSWORD_LENGTH ||
    config.secret.length < 32
  ) {
    return false;
  }

  return (
    safeEqual(username, config.username) && safeEqual(password, config.password)
  );
}

export async function createAdminSession(): Promise<void> {
  const { secret } = credentials();
  if (secret.length < 32) throw new Error("Admin session is not configured.");

  const session: SessionPayload = {
    role: "admin",
    expiresAt: Date.now() + SESSION_LIFETIME_SECONDS * 1000,
  };
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString(
    "base64url",
  );
  const value = `${payload}.${sign(payload, secret)}`;

  (await cookies()).set(COOKIE_NAME, value, sessionCookieOptions());
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const { configured } = getAdminConfiguration();
  const { secret } = credentials();
  if (!configured) return false;

  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;

  const separator = value.lastIndexOf(".");
  if (separator < 1) return false;

  const payload = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  if (!safeEqual(signature, sign(payload, secret))) return false;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;

    return session.role === "admin" && Number(session.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

export async function deleteAdminSession(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, "", sessionCookieOptions(0));
}
