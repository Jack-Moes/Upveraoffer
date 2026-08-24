"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-[0.95rem] text-foreground " +
  "placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
const label = "mb-1.5 block text-sm font-medium text-foreground";

export function BookingRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Could not save the booking request.");
      }
      form.reset();
      setStatus("sent");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-accent/40 bg-accent-soft p-8">
        <h2 className="font-display text-2xl font-semibold">Request received.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          We will review your preferred time and email you when the call is confirmed.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-sm font-semibold text-primary underline underline-offset-4">
          Request another time
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-card border border-border bg-background p-6 shadow-sm sm:p-8">
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="booking-company-website">Do not fill this in</label>
        <input id="booking-company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Request a time</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Choose what works for you.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">The call is confirmed after the team reviews your request.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="booking-name">Name</label>
          <input id="booking-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="booking-email">Email</label>
          <input id="booking-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="requested-date">Preferred date</label>
          <input id="requested-date" name="requestedDate" type="date" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="requested-time">Preferred time</label>
          <input id="requested-time" name="requestedTime" type="time" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="booking-timezone">Timezone</label>
          <input id="booking-timezone" name="timezone" required placeholder="e.g. Central Time" className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="booking-service">Main goal</label>
        <select id="booking-service" name="service" defaultValue="" className={field}>
          <option value="">Not sure yet</option>
          <option>Resume and CV</option>
          <option>Interview preparation</option>
          <option>Coding test coaching</option>
          <option>Full job-search support</option>
        </select>
      </div>

      <div>
        <label className={label} htmlFor="booking-notes">Anything we should know?</label>
        <textarea id="booking-notes" name="notes" rows={4} className={field} placeholder="Your target role, deadline, or where the search is stuck." />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Saving..." : "Request consultation"}
      </Button>
    </form>
  );
}
