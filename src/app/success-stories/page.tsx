import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader, Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { TestimonialGrid } from "@/components/site/Testimonials";
import { getTestimonials, getMetrics } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Client feedback from Upveraoffer: what changed, how long it took, and in the clients' own words.",
  alternates: { canonical: "/success-stories" },
};

const commitments = [
  {
    title: "Diagnosis before prescription",
    body: "Nobody gets a plan on day one. We find out which part of your search is actually failing first, because the plan depends entirely on the answer.",
  },
  {
    title: "Feedback in writing, every session",
    body: "Not “be more confident”. Specific sentences to cut, specific reframes to apply, delivered in writing so you can act on them before the next session.",
  },
  {
    title: "We tell you when it is not working",
    body: "If your materials are not ready, or your target list is unrealistic, you will hear it from us early. A service that only agrees with you is worth nothing.",
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
            : "Upveraoffer is newly established. We would rather leave this page empty than fill it with invented feedback, so it stays like this until we have results worth publishing."
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
            title="What every engagement has in common."
            intro="Whatever package you take, three things hold across all of them."
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
