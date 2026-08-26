import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { SectionHeading, Card, CTABanner } from "@/components/site/Blocks";
import { services } from "@/content/services";
import { steps } from "@/content/process";
import { currencySymbol } from "@/content/pricing";
import { images } from "@/content/images";
import { getPublicPlans } from "@/lib/managed-content";
import { getAllPosts, formatDate } from "@/lib/blog";

const stalls = [
  {
    number: "01",
    stage: "No replies",
    signal: "Applications disappear into silence.",
    diagnosis: "Your résumé is hiding the evidence a recruiter needs to see.",
    action: "Fix the signal",
    href: "/services/resume",
  },
  {
    number: "02",
    stage: "No next round",
    signal: "The conversation feels fine. The rejection still arrives.",
    diagnosis: "Your answers are not making ownership and judgment clear.",
    action: "Rehearse the room",
    href: "/services/interview",
  },
  {
    number: "03",
    stage: "No finished test",
    signal: "You know the material. The timer changes everything.",
    diagnosis: "Your practice is training volume, not the first two minutes.",
    action: "Train the pattern",
    href: "/services/coding-test",
  },
] as const;

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const plans = getPublicPlans();

  return (
    <>
      <section className="paper-noise editorial-grid relative overflow-hidden bg-ink text-ink-foreground">
        <div aria-hidden="true" className="absolute -right-24 top-8 h-80 w-80 rounded-full border border-primary/25" />
        <div aria-hidden="true" className="absolute right-16 top-32 h-48 w-48 rounded-full border border-primary/15" />
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="fade-up">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-soft">
                <span className="h-2 w-2 rounded-full bg-primary" /> Houston-built · Working worldwide
              </p>
              <h1 className="mt-7 max-w-4xl font-display text-[3.1rem] leading-[.96] sm:text-6xl lg:text-[5.2rem]">
                Stop guessing.<br /><span className="text-primary-soft">Find the break.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/65 sm:text-xl">
                Upveraoffer diagnoses the exact point your job search is failing—résumé, interview, or coding assessment—then helps you fix that first.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/book" size="lg">Book a free diagnostic <ArrowRight /></ButtonLink>
                <ButtonLink href="/process" size="lg" variant="secondary" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                  See the method
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-ink-foreground/40">30 minutes · No charge · Written next steps</p>
            </div>

            <div className="fade-up-delay relative">
              <div className="photo-frame relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                <Image src={images.teamMeeting.src} alt={images.teamMeeting.alt} fill priority sizes="(min-width: 1024px) 42rem, 100vw" className="photo-media object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 rounded-2xl border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                  <div>
                    <p className="text-xs uppercase tracking-[.16em] text-white/50">The Upveraoffer team</p>
                    <p className="mt-1 font-display text-2xl">Six people. One standard.</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Meet the team</span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="grid grid-cols-2 divide-x divide-white/10 py-0 sm:grid-cols-4">
            {[["6", "people, one context"], ["1:1", "human coaching"], ["24h", "written follow-up"], ["$149", "packages from"]].map(([value, label]) => (
              <div key={label} className="px-4 py-6 first:pl-0 sm:px-7">
                <p className="font-display text-3xl text-primary-soft">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[.12em] text-white/40">{label}</p>
              </div>
            ))}
          </Container>
        </div>
      </section>

      <Section>
        <Container>
          <SectionHeading eyebrow="The diagnosis" title="Your search is not broken everywhere." intro="Find the stage that is leaking opportunities. Fixing anything else first is expensive motion without progress." />
          <div className="mt-14 divide-y divide-border border-y border-border">
            {stalls.map((stall) => (
              <Link key={stall.number} href={stall.href} className="group grid gap-5 py-8 transition-colors hover:bg-surface sm:grid-cols-[5rem_1fr_1fr_auto] sm:items-center sm:px-5">
                <span className="font-mono text-xs text-primary">/{stall.number}</span>
                <div><h3 className="font-display text-3xl">{stall.stage}</h3><p className="mt-2 text-sm text-muted">{stall.signal}</p></div>
                <p className="max-w-md text-sm leading-relaxed text-muted">{stall.diagnosis}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">{stall.action} <ArrowRight className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="What we fix" title="Three interventions. No mystery bundle." intro="Use the part you need, or connect the whole path from first scan to signed offer." />
            <ButtonLink href="/services" variant="secondary">Compare services</ButtonLink>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className={index === 0 ? "group lg:col-span-6" : "group lg:col-span-3"}>
                <article className="editorial-grid relative flex h-full min-h-[23rem] flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background p-7 sm:p-8">
                  <span className="font-mono text-xs text-primary">/0{index + 1}</span>
                  <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-primary/20" />
                  <div className="mt-auto">
                    <h3 className="font-display text-3xl lg:text-4xl">{service.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Explore <ArrowRight className="transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-ink-foreground">
        <Container>
          <SectionHeading eyebrow="The method" title="Four moves. In the right order." intro="The work changes by client. The sequence does not: establish the evidence, build the assets, rehearse under pressure, close deliberately." />
          <div className="mt-14 grid border-y border-white/10 md:grid-cols-4 md:divide-x md:divide-white/10">
            {steps.map((step) => (
              <div key={step.number} className="border-b border-white/10 py-8 md:border-b-0 md:px-7 first:pl-0 last:pr-0">
                <p className="font-mono text-xs text-primary-soft">/{step.number}</p>
                <h3 className="mt-8 font-display text-4xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-foreground/55">{step.summary}</p>
                <p className="mt-6 text-xs uppercase tracking-[.14em] text-ink-foreground/35">{step.duration}</p>
              </div>
            ))}
          </div>
          <ButtonLink href="/process" variant="secondary" className="mt-10 border-white/20 bg-transparent text-white hover:bg-white/10">See the complete process</ButtonLink>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionHeading eyebrow="The people" title="Small enough to remember the whole story." intro="Four senior developers and two customer-assistance specialists. Your context does not disappear between calls." />
              <ButtonLink href="/about" variant="secondary" className="mt-8">Meet all six</ButtonLink>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-3">
              {[["4", "Senior engineers"], ["2", "Client-care specialists"], ["1", "Shared client context"]].map(([value, label]) => (
                <div key={label} className="flex min-h-56 flex-col justify-between bg-surface p-7 sm:p-8">
                  <span className="font-mono text-xs uppercase tracking-[.14em] text-primary">Team structure</span>
                  <div><p className="font-display text-6xl text-foreground">{value}</p><p className="mt-3 text-sm leading-relaxed text-muted">{label}</p></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Simple pricing" title="One decision. One payment." intro="No subscription, surprise retainer, or mystery call count." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={plan.id} className={plan.featured ? "relative border-primary bg-ink text-ink-foreground" : "relative"}>
                <p className="font-mono text-xs text-primary">/0{index + 1}</p>
                <h3 className="mt-8 font-display text-4xl">{plan.name}</h3>
                <p className={`mt-3 min-h-12 text-sm leading-relaxed ${plan.featured ? "text-white/55" : "text-muted"}`}>{plan.bestFor}</p>
                <p className="mt-8 font-display text-5xl">{plan.price === null ? "Custom" : `${currencySymbol}${plan.price.toLocaleString("en-US")}`}</p>
                <p className={`mt-2 text-xs uppercase tracking-[.12em] ${plan.featured ? "text-white/35" : "text-subtle"}`}>{plan.cadence}</p>
                <ButtonLink href={plan.cta.href} variant={plan.featured ? "primary" : "secondary"} className="mt-8 w-full">{plan.cta.label}</ButtonLink>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {posts.length > 0 && (
        <Section className="border-t border-border bg-surface">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-8"><SectionHeading eyebrow="Field notes" title="Useful before you ever hire us." intro="Clear thinking for résumés, interviews, and technical screens." /><ButtonLink href="/blog" variant="secondary">Read all notes</ButtonLink></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {posts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background p-6">
                    <span className="font-mono text-xs text-primary">/0{index + 1}</span>
                    <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-accent/15" />
                    <div className="mt-auto"><p className="font-mono text-xs text-primary">{post.category} · {post.readingTime} min</p><h3 className="mt-4 font-display text-2xl leading-tight group-hover:text-primary">{post.title}</h3><p className="mt-5 text-xs text-subtle">{formatDate(post.date)}</p></div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABanner />
    </>
  );
}
