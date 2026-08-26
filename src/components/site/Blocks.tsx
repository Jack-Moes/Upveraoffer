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
    <div className="paper-noise editorial-grid relative overflow-hidden border-b border-white/10 bg-ink text-ink-foreground">
      <div aria-hidden="true" className="absolute right-[-6rem] top-[-7rem] h-80 w-80 rounded-full border border-primary/30" />
      <div aria-hidden="true" className="absolute right-[-2rem] top-[-3rem] h-56 w-56 rounded-full border border-primary/20" />
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-4xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl leading-[1.02] text-ink-foreground sm:text-5xl lg:text-[4rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/65 sm:text-xl">{intro}</p>
          )}
          <div aria-hidden="true" className="signal-rule mt-10 h-px max-w-xl bg-primary" />
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
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
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
        "rounded-card border border-border bg-background p-7 shadow-[0_18px_50px_-42px_hsl(var(--shadow-color)/.5)] transition-all duration-300 hover:border-foreground/20",
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
    <div className="divide-y divide-border overflow-hidden rounded-card border border-border bg-background shadow-[0_24px_70px_-55px_hsl(var(--shadow-color)/.45)]">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-6 sm:px-8 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl text-foreground sm:text-2xl">
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
          <p className="mt-4 max-w-3xl pr-10 text-[0.95rem] leading-relaxed text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function CTABanner({
  title = "Find out what's actually blocking your search.",
  body = "The consult is free, takes thirty minutes, and ends with a written read on where you stand, whether or not you work with us.",
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
        <div className="paper-noise editorial-grid relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink px-8 py-12 text-ink-foreground sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-40 h-96 w-96 rounded-full border border-primary/30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-primary/20"
          />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-soft">
                <span className="h-2 w-2 rounded-full bg-primary" /> Your next move
              </p>
              <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/65">
                {body}
              </p>
            </div>
            <div className="flex min-w-60 flex-col gap-3">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink
                href={secondary.href}
                size="lg"
                variant="secondary"
                className="border-white/20 bg-transparent text-ink-foreground hover:bg-white/10"
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
