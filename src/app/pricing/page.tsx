import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import {
  PageHeader,
  Card,
  CTABanner,
  SectionHeading,
  FaqAccordion,
} from "@/components/site/Blocks";
import { comparison, pricingFaq, currencySymbol, currency } from "@/content/pricing";
import { getPublicPlans } from "@/lib/managed-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One-time packages for résumé writing, interview preparation, and coding test coaching. No subscriptions, and payment plans if you need them.",
  alternates: { canonical: "/pricing" },
};

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex text-accent-strong" aria-label="Included">
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
          <path
            d="m3.5 8.5 3 3 6-7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-subtle" aria-label="Not included">
        —
      </span>
    );
  }
  return <span className="text-sm text-muted">{value}</span>;
}

export default function PricingPage() {
  const plans = getPublicPlans();
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pick the depth your search needs."
        intro="Three one-time packages. No subscriptions, no retainers, and nothing sold to you halfway through. If you outgrow the one you picked, you pay the difference and nothing more."
      />

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={
                  plan.featured
                    ? "relative flex flex-col border-primary/50 ring-1 ring-primary/25"
                    : "flex flex-col"
                }
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most chosen
                  </span>
                )}

                <h2 className="font-display text-xl font-semibold">{plan.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {plan.tagline}
                </p>

                <p className="mt-6 font-display text-4xl font-semibold">
                  {plan.price === null ? (
                    "Custom"
                  ) : (
                    <>
                      {currencySymbol}
                      {plan.price.toLocaleString("en-US")}
                    </>
                  )}
                </p>
                <p className="mt-1 text-sm text-subtle">
                  {plan.price === null ? "Contact us" : `${currency}, ${plan.cadence}`}
                </p>

                <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-sm text-muted">
                  <span className="font-medium text-foreground">Best for: </span>
                  {plan.bestFor}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] leading-relaxed">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
                          <path
                            d="m3.5 8.5 3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={plan.cta.href}
                  size="lg"
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {plan.cta.label}
                </ButtonLink>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Comparison */}
      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading title="Compare in full" />

          <div className="mt-10 overflow-x-auto rounded-card border border-border bg-background">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">
                Feature comparison across all packages
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-4 font-display text-sm font-semibold">
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className="px-6 py-4 text-center font-display text-sm font-semibold"
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <th
                      scope="row"
                      className="px-6 py-3.5 text-[0.95rem] font-normal text-muted"
                    >
                      {row.feature}
                    </th>
                    {plans.map((p) => (
                      <td key={p.id} className="px-6 py-3.5 text-center">
                        <Cell value={row.values[p.id] ?? false} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Questions about cost" />
          <div className="mt-10">
            <FaqAccordion items={pricingFaq.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </Container>
      </Section>

      <CTABanner
        title="Not sure which package fits?"
        body="Book the free consult. We'll tell you which one your situation actually calls for, including when the answer is the cheapest one."
        secondary={{ href: "/faq", label: "Read the FAQ" }}
      />
    </>
  );
}
