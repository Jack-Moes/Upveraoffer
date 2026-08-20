import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader, Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { testimonials, metrics } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Client outcomes from Upveraoffer — what changed, how long it took, and in the clients' own words.",
  alternates: { canonical: "/success-stories" },
};

const commitments = [
  {
    title: "Every quote is real and permissioned",
    body: "We publish a client's words only with their written permission, exactly as they wrote them, at the level of identification they chose.",
  },
  {
    title: "Every number is verifiable",
    body: "If we say a client accepted an offer in six weeks, we can show the dates. We do not publish figures we cannot substantiate.",
  },
  {
    title: "No composites, no stock people",
    body: "We do not build “representative” clients out of several real ones, and we do not pair invented quotes with stock photography.",
  },
];

export default function SuccessStoriesPage() {
  const hasStories = testimonials.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Results"
        title={
          hasStories
            ? "What changed for the people we worked with."
            : "Our first client outcomes are being written up."
        }
        intro={
          hasStories
            ? "Real clients, real outcomes, published with permission."
            : "Upveraoffer is newly established. Rather than fill this page with invented testimonials — which is both dishonest and, in most places, unlawful advertising — we are leaving it empty until we have results worth publishing."
        }
      />

      {hasStories ? (
        <>
          {metrics.length > 0 && (
            <Section className="border-b border-border bg-surface">
              <Container>
                <div className="grid gap-6 sm:grid-cols-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-display text-4xl font-semibold text-primary">
                        {m.value}
                      </p>
                      <p className="mt-2 text-sm text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </Container>
            </Section>
          )}

          <Section>
            <Container>
              <div className="grid gap-5 md:grid-cols-2">
                {testimonials.map((t) => (
                  <Card key={t.quote} className="flex flex-col">
                    {t.outcome && (
                      <span className="mb-4 inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
                        {t.outcome}
                      </span>
                    )}
                    <blockquote className="flex-1 text-lg leading-relaxed text-foreground">
                      {t.quote}
                    </blockquote>
                    <footer className="mt-6 border-t border-border pt-4 text-sm">
                      <p className="font-medium text-foreground">{t.name}</p>
                      <p className="text-muted">
                        {t.role}
                        {t.company ? ` · ${t.company}` : ""}
                      </p>
                    </footer>
                  </Card>
                ))}
              </div>
            </Container>
          </Section>
        </>
      ) : (
        <Section>
          <Container>
            <Card className="bg-surface p-10 text-center">
              <h2 className="font-display text-2xl font-semibold">
                Would you rather see proof than promises?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
                So would we. Until this page has real case studies on it, judge us
                on the free consult instead: thirty minutes, no charge, and you
                leave with a written diagnosis of your search whether or not you
                hire us. That is a much better test than a wall of five-star
                quotes.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/book" size="lg">
                  Book a free consult
                </ButtonLink>
                <ButtonLink href="/blog" size="lg" variant="secondary">
                  Read our free material
                </ButtonLink>
              </div>
            </Card>
          </Container>
        </Section>
      )}

      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Our commitment"
            title="How we will publish results."
            intro="Career services is an industry with a testimonial credibility problem. These are the rules we hold ourselves to."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {commitments.map((c) => (
              <Card key={c.title}>
                <h3 className="font-display text-base font-semibold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
