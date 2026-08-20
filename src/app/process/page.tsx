import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { steps, pillars } from "@/content/process";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Diagnose, build, practice, land — the four-stage process Upveraoffer runs with every client, and what happens at each stage.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Four stages, in the order that actually works."
        intro="We do not hand you a plan on day one. We find out what is wrong first, because the plan depends entirely on the answer."
      />

      <Section>
        <Container>
          <ol className="space-y-6">
            {steps.map((step) => (
              <li key={step.number}>
                <div className="grid gap-8 rounded-card border border-border bg-background p-7 sm:p-9 lg:grid-cols-[auto_1fr_20rem]">
                  <div className="flex items-start gap-5 lg:flex-col lg:items-center">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-mono text-lg font-semibold text-primary-foreground">
                      {step.number}
                    </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-subtle lg:mt-3">
                      {step.duration}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-semibold">
                      {step.title}
                    </h2>
                    <p className="mt-1.5 font-display text-base text-primary">
                      {step.summary}
                    </p>
                    <p className="mt-4 max-w-xl leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-surface p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                      In this stage
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {step.detail.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Principles"
            title="What stays constant across every engagement."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title}>
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner
        title="Start with the diagnostic."
        body="Thirty minutes, no charge. You leave with a written read on where your search stands and what to fix first — whether or not you go further with us."
      />
    </>
  );
}
