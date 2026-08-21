"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { plans } from "@/content/pricing";
import { services } from "@/content/services";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-[0.95rem] text-foreground " +
  "placeholder:text-subtle transition-colors focus:border-primary focus:outline-none " +
  "focus:ring-2 focus:ring-primary/25";

const label = "mb-1.5 block text-sm font-medium text-foreground";

export function ContactForm() {
  const params = useSearchParams();
  const presetPlan = params.get("plan") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-accent/40 bg-accent-soft p-8">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Message received.
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          We reply to every message within one business day. If your search is
          time-sensitive, mention the deadline in a follow-up and we’ll jump
          the queue for you.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-primary underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Do not fill this in</label>
        <input id="company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Your name <span className="text-primary">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="currentRole">
            Current role
          </label>
          <input
            id="currentRole"
            name="currentRole"
            placeholder="e.g. Backend Engineer, 3 years"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="targetRole">
            Target role
          </label>
          <input
            id="targetRole"
            name="targetRole"
            placeholder="e.g. Senior Backend Engineer"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="service">
            What do you need most?
          </label>
          <select id="service" name="service" defaultValue="" className={field}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Everything">Everything, the full search</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="plan">
            Package of interest
          </label>
          <select id="plan" name="plan" defaultValue={presetPlan} className={field}>
            <option value="">Undecided</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          Where are you stuck? <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What is happening in your search right now? How many applications, what stage you get to, where it falls apart."
          className={field}
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-border accent-[var(--primary)]"
        />
        <span>
          I agree that Upveraoffer may contact me about this message and store the
          details I have submitted, as described in the privacy policy.
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>

      <p className="text-sm text-subtle">
        We reply within one business day, and nothing you send goes anywhere else.
      </p>
    </form>
  );
}
