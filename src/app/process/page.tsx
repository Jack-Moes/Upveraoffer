import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { steps, pillars } from "@/content/process";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Diagnose, build, practice, land. The four stages Upveraoffer runs with every client, and what happens in each one.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <section className="paper-noise editorial-grid relative overflow-hidden border-b border-border bg-surface">
        <div aria-hidden="true" className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-accent/50 blur-3xl" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
            <div className="max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <h1 className="font-display text-5xl leading-[0.94] sm:text-6xl lg:text-[4.8rem]">
                Four stages. One connected search.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                We diagnose the real constraint first, then rebuild, rehearse, and stay through the offer.
              </p>
              <div className="mt-9 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                <span className="rounded-full border border-border bg-background px-4 py-2">No generic plan</span>
                <span className="rounded-full border border-border bg-background px-4 py-2">Written feedback</span>
                <span className="rounded-full border border-border bg-background px-4 py-2">One team throughout</span>
              </div>
            </div>

            <ol className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-primary/10">
              {steps.map((step, index) => (
                <li key={step.number} className="group grid grid-cols-[auto_1fr] gap-5 border-b border-border p-5 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary-soft font-mono text-xs font-bold text-primary">
                    {step.number}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-display text-xl font-semibold sm:text-2xl">{step.title}</h2>
                      {index < steps.length - 1 && <span aria-hidden="true" className="text-primary/60">→</span>}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.summary}</p>
                  </div>
                  <span className="col-start-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle sm:col-start-auto">{step.duration}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <figure className="mb-16 grid overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-primary/10 lg:grid-cols-[1.35fr_.65fr]">
            <div className="photo-frame relative min-h-80 overflow-hidden bg-surface-2 lg:min-h-[30rem]">
              <Image
                src={images.processDiagnostic.src}
                alt={images.processDiagnostic.alt}
                fill
                sizes="(min-width: 1024px) 68vw, 100vw"
                className="photo-media object-cover"
              />
            </div>
            <figcaption className="flex flex-col justify-between bg-ink p-8 text-ink-foreground sm:p-10">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary-soft">Before the plan</span>
              <div className="mt-20">
                <h2 className="font-display text-3xl leading-tight">Find the leak before adding more effort.</h2>
                <p className="mt-5 leading-relaxed text-ink-foreground/65">We map the applications, conversations, and assessments first. The work that follows is built around the evidence—not a template.</p>
              </div>
            </figcaption>
          </figure>

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

          <figure className="mt-16">
            <div className="photo-frame relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-xl shadow-primary/10">
              <Image
                src={images.processTechnical.src}
                alt={images.processTechnical.alt}
                fill
                sizes="(min-width: 1152px) 72rem, 100vw"
                className="photo-media object-cover"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.14em] text-subtle">
              <span>Practice under realistic constraints.</span>
              <span className="font-mono text-primary">Build · Practice · Review</span>
            </figcaption>
          </figure>
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
