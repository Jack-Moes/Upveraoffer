import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";

/** Standard top-of-page banner used by every inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-background p-6 transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Accordion built on <details>/<summary> so it works with JavaScript
 * disabled and stays keyboard accessible for free.
 */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-border rounded-card border border-border bg-background">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-base font-medium text-foreground">
            {item.q}
            <span className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-45">
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M10 4.5v11M4.5 10h11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pr-10 text-[0.95rem] leading-relaxed text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function CTABanner({
  title = "Find out what is actually blocking your search.",
  body = "The consult is free, thirty minutes, and ends with a written read on where you stand — whether or not you work with us.",
  primary = { href: "/book", label: "Book a free consult" },
  secondary = { href: "/pricing", label: "See pricing" },
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 sm:px-14 sm:py-16">
          {/* Decorative gradient wash; purely presentational. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-foreground/70">
              {body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink
                href={secondary.href}
                size="lg"
                variant="secondary"
                className="border-white/20 bg-white/5 text-ink-foreground hover:bg-white/10"
              >
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
