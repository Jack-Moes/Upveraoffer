import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader, Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { steps, pillars } from "@/content/process";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Diagnose, build, practice, land. The four stages Upveraoffer runs with every client, and what happens in each one.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Four stages, in the order that actually works."
        intro="We don't hand you a plan on day one. We find out what's wrong first, because the plan depends entirely on the answer."
      />

      <Container className="-mt-8 sm:-mt-10">
        <div className="editorial-grid relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-6 text-ink-foreground shadow-2xl shadow-primary/10 sm:p-9 lg:p-12">
          <div aria-hidden="true" className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-primary/25" />
          <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-7">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary-soft">Your engagement map</p>
              <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">One clear path from stuck to ready.</p>
            </div>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-xs text-accent">Built around your diagnosis</span>
          </div>

          <ol className="relative mt-8 grid gap-3 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-white/15 lg:block" />
            {steps.map((step, index) => (
              <li key={step.number} className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary font-mono text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
                    {step.number}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-foreground/45">{step.duration}</span>
                </div>
                <h2 className="mt-8 font-display text-2xl font-semibold">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/60">{step.summary}</p>
                <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary-soft">Stage {index + 1} of 4</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>

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
        body="Thirty minutes, no charge. You leave with a written read on where your search stands and what to fix first, whether or not you go any further with us."
      />
    </>
  );
}
