import { Avatar, Rating } from "./Avatar";
import { Card } from "./Blocks";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/** Shown above sample content so it can never be mistaken for real feedback. */
export function SampleNotice() {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-card border border-dashed border-primary/50 bg-primary-soft px-5 py-4">
      <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true">
        <path
          d="M10 2.5 18 17H2L10 2.5Z M10 8v3.5 M10 14h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-sm leading-relaxed text-foreground">
        <strong className="font-semibold">Example layout, not real feedback.</strong>{" "}
        These entries are placeholders so you can see the finished section. They
        are never shown on the live site — replace them with real, permissioned
        client feedback in{" "}
        <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
          src/content/testimonials.ts
        </code>
        .
      </p>
    </div>
  );
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      aria-hidden="true"
      className={cn("h-7 w-7 text-primary/25", className)}
      fill="currentColor"
    >
      <path d="M0 24V13.2C0 5.9 4.2 1.2 12 0l1.4 3.9C9 5.3 6.6 8 6.5 11.2H12V24H0Zm18 0V13.2C18 5.9 22.2 1.2 30 0l1.4 3.9c-4.4 1.4-6.8 4.1-6.9 7.3H30V24H18Z" />
    </svg>
  );
}

/** Attribution row: avatar, name, role, optional company. */
function Attribution({ t, size = "md" }: { t: Testimonial; size?: "md" | "lg" }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={t.name} photo={t.photo} size={size} />
      <div className="min-w-0">
        <p className={cn("font-display font-semibold text-foreground", size === "lg" && "text-lg")}>
          {t.name}
        </p>
        <p className="truncate text-sm text-muted">
          {t.role}
          {t.company ? ` · ${t.company}` : ""}
        </p>
      </div>
    </div>
  );
}

/** Standard card used in the grid. */
export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <QuoteMark />
        {typeof t.rating === "number" && <Rating value={t.rating} />}
      </div>

      <blockquote className="mt-4 flex-1 leading-relaxed text-foreground">
        {t.quote}
      </blockquote>

      {(t.outcome || t.service) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {t.outcome && (
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-strong">
              {t.outcome}
            </span>
          )}
          {t.service && (
            <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
              {t.service}
            </span>
          )}
        </div>
      )}

      <footer className="mt-6 border-t border-border pt-5">
        <Attribution t={t} />
      </footer>
    </Card>
  );
}

/** Large treatment for the strongest single piece of feedback. */
export function FeaturedTestimonial({ t }: { t: Testimonial }) {
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative">
        <QuoteMark className="h-10 w-10" />
        <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
          {t.quote}
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <Attribution t={t} size="lg" />
          <div className="flex flex-wrap items-center gap-2">
            {typeof t.rating === "number" && <Rating value={t.rating} />}
            {t.outcome && (
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
                {t.outcome}
              </span>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/** Featured quote plus a grid of the rest. */
export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  const [featured, ...rest] = items;

  return (
    <div className="space-y-6">
      <FeaturedTestimonial t={featured} />
      {rest.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((t) => (
            <TestimonialCard key={t.quote} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}
