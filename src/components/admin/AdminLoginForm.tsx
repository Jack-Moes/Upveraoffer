"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";

const initialState: AdminLoginState = { error: "" };
const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground " +
  "transition-colors placeholder:text-subtle focus:border-primary focus:outline-none " +
  "focus:ring-2 focus:ring-primary/25";

export function AdminLoginForm({ username }: { username: string }) {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="admin-username" className="mb-1.5 block text-sm font-medium">
          Username
        </label>
        <input
          id="admin-username"
          name="username"
          required
          autoComplete="username"
          defaultValue={username}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={field}
        />
      </div>

      <p aria-live="polite" className="min-h-5 text-sm text-red-600 dark:text-red-300">
        {state.error}
      </p>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
