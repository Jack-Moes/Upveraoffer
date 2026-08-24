"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminSession,
  deleteAdminSession,
  getAdminConfiguration,
  validateAdminCredentials,
} from "@/lib/admin-auth";

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
