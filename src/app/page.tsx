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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [allPosts, plans] = await Promise.all([
    getAllPosts(),
    getPublicPlans(),
  ]);
  const posts = allPosts.slice(0, 3);

  return (
    <>
      <section className="paper-noise editorial-grid relative overflow-hidden border-b border-border bg-surface">
        <div aria-hidden="true" className="absolute -bottom-[26rem] left-1/2 h-[52rem] w-[52rem] -translate-x-1/2 rounded-full border-[7rem] border-accent/45" />
        <div aria-hidden="true" className="absolute -bottom-[20rem] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full border-[5rem] border-primary/10" />
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <div className="fade-up mx-auto max-w-6xl text-center">
            <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary" /> Houston-built · Working worldwide <span className="h-px w-8 bg-primary" />
            </p>
            <h1 className="mt-8 font-display text-[3.5rem] leading-[0.9] sm:text-7xl lg:text-[7rem]">
              Stop guessing.<br /><span className="text-primary">Find the break.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              Upveraoffer diagnoses the exact point your job search is failing—résumé, interview, or coding assessment—then helps you fix that first.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/book" size="lg">Book a free diagnostic <ArrowRight /></ButtonLink>
              <ButtonLink href="/process" size="lg" variant="secondary">See the method</ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {[["6", "people, one context"], ["1:1", "human coaching"], ["24h", "written follow-up"], ["$149", "packages from"]].map(([value, label]) => (
                <div key={label} className="rounded-full border border-border bg-background/85 px-4 py-2 text-sm shadow-sm backdrop-blur">
                  <strong className="font-display text-foreground">{value}</strong>
                  <span className="ml-2 text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up-delay photo-frame mt-16 overflow-hidden rounded-2xl border border-border bg-ink shadow-2xl shadow-primary/10 sm:mt-20">
            <div className="relative aspect-[3/2]">
              <Image src={images.teamMeeting.src} alt={images.teamMeeting.alt} fill priority sizes="(min-width: 1440px) 86rem, 100vw" className="photo-media object-cover object-center" />
            </div>
            <div className="flex flex-col gap-3 border-t border-white/20 bg-black p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-accent">Upveraoffer · Houston</p>
                <p className="mt-2 font-display text-2xl sm:text-3xl">Six people. One shared client context.</p>
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-accent">
                Meet the team <ArrowRight />
              </Link>
            </div>
          </div>
        </Container>
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
                <article className="editorial-grid relative flex h-full min-h-[23rem] flex-col overflow-hidden rounded-xl border border-border bg-background p-7 sm:p-8">
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
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
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
                  <article className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-xl border border-border bg-background p-6">
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
