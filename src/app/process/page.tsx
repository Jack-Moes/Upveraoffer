import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
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
      <section className="paper-noise relative overflow-hidden border-b border-white/10 bg-ink text-ink-foreground">
        <div aria-hidden="true" className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-3xl" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
            <div className="max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <h1 className="font-display text-4xl leading-[1.02] text-ink-foreground sm:text-5xl lg:text-[3.8rem]">
                Four stages. One connected search.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-foreground/65 sm:text-xl">
                We diagnose the real constraint first, then rebuild, rehearse, and stay through the offer.
              </p>
              <div className="mt-9 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-foreground/55">
                <span className="rounded-full border border-white/10 px-4 py-2">No generic plan</span>
                <span className="rounded-full border border-white/10 px-4 py-2">Written feedback</span>
                <span className="rounded-full border border-white/10 px-4 py-2">One team throughout</span>
              </div>
            </div>

            <ol className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
              {steps.map((step, index) => (
                <li key={step.number} className="group grid grid-cols-[auto_1fr] gap-5 border-b border-white/10 p-5 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary-soft">
                    {step.number}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-display text-xl font-semibold sm:text-2xl">{step.title}</h2>
                      {index < steps.length - 1 && <span aria-hidden="true" className="text-primary/60">→</span>}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-foreground/55">{step.summary}</p>
                  </div>
                  <span className="col-start-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-foreground/40 sm:col-start-auto">{step.duration}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

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
