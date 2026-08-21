import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader, Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { TestimonialGrid, SampleNotice } from "@/components/site/Testimonials";
import { getTestimonials, getMetrics, previewingSamples } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Client feedback from Upveraoffer — what changed, how long it took, and in the clients' own words.",
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
    body: "We do not build “representative” clients out of several real ones, and we never attach a stranger's photograph to a review they did not write.",
  },
];

export default function SuccessStoriesPage() {
  const items = getTestimonials();
  const metrics = getMetrics();
  const hasStories = items.length > 0;

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
            ? "Real clients, real outcomes, published with their permission."
            : "Upveraoffer is newly established. Rather than fill this page with invented feedback — which is both dishonest and, in most places, unlawful advertising — we are leaving it empty until we have results worth publishing."
        }
      />

      {hasStories ? (
        <>
          {metrics.length > 0 && (
            <div className="border-b border-border bg-surface">
              <Container className="py-12">
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
            </div>
          )}

          <Section>
            <Container>
              {previewingSamples && <SampleNotice />}
              <TestimonialGrid items={items} />
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
                So would we. Until this page has real feedback on it, judge us on
                the free consult instead: thirty minutes, no charge, and you leave
                with a written diagnosis of your search whether or not you hire us.
                That is a much better test than a wall of five-star quotes.
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
            title="How we publish feedback."
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
