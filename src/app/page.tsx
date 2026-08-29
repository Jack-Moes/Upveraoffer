import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { SectionHeading, Card, CTABanner } from "@/components/site/Blocks";
import { services } from "@/content/services";
import { steps } from "@/content/process";
import { currencySymbol } from "@/content/pricing";
import { getPublicPlans } from "@/lib/managed-content";
import { getAllPosts, formatDate } from "@/lib/blog";
import { images } from "@/content/images";

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

const serviceVisuals = {
  resume: images.homeResume,
  interview: images.homeInterview,
  "coding-test": images.homeCoding,
} as const;

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
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div className="fade-up">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-8 bg-primary" /> Houston-built · Working worldwide
              </p>
              <h1 className="mt-8 font-display text-[3.5rem] leading-[0.9] sm:text-7xl lg:text-[5.5rem]">
                Stop guessing.<br /><span className="text-primary">Find the break.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                Upveraoffer diagnoses the exact point your job search is failing—résumé, interview, or coding assessment—then helps you fix that first.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/book" size="lg">Book a free diagnostic <ArrowRight /></ButtonLink>
                <ButtonLink href="/process" size="lg" variant="secondary">See the method</ButtonLink>
              </div>
            </div>

            <figure className="fade-up-delay">
              <div className="photo-frame relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-primary/10">
                <Image
                  src={images.homeHero.src}
                  alt={images.homeHero.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  className="photo-media object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em] text-subtle">
                <span>Six people. One shared client context.</span>
                <span className="font-mono text-primary">Studio / 01</span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {[["6", "people, one context"], ["1:1", "human coaching"], ["24h", "written follow-up"], ["$149", "packages from"]].map(([value, label]) => (
              <div key={label} className="bg-background/90 px-5 py-4 backdrop-blur">
                <strong className="font-display text-xl text-foreground">{value}</strong>
                <span className="ml-2 text-sm text-muted">{label}</span>
              </div>
            ))}
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
                <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/10">
                  <div className="photo-frame relative aspect-[4/3] overflow-hidden bg-surface-2">
                    <Image
                      src={serviceVisuals[service.slug].src}
                      alt={serviceVisuals[service.slug].alt}
                      fill
                      sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
                      className="photo-media object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <span className="font-mono text-xs text-primary">/0{index + 1}</span>
                    <div className="mt-auto pt-12">
                    <h3 className="font-display text-3xl lg:text-4xl">{service.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Explore <ArrowRight className="transition-transform group-hover:translate-x-1" /></span>
                    </div>
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
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <figure>
              <div className="photo-frame relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-xl shadow-primary/10">
                <Image
                  src={images.homeEngineers.src}
                  alt={images.homeEngineers.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="photo-media object-cover"
                />
              </div>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.14em] text-subtle">
                Three disciplines. One engineering standard.
              </figcaption>
            </figure>
            <div>
              <SectionHeading eyebrow="The people" title="Small enough to remember the whole story." intro="Four senior developers and two customer-assistance specialists. Your context does not disappear between calls." />
              <ButtonLink href="/about" variant="secondary" className="mt-8">Meet all six</ButtonLink>
            </div>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {[["4", "Senior engineers"], ["2", "Client-care specialists"], ["1", "Shared client context"]].map(([value, label]) => (
              <div key={label} className="flex items-end justify-between gap-5 bg-surface p-7 sm:p-8">
                <span className="font-display text-5xl text-foreground">{value}</span>
                <span className="max-w-32 text-right text-sm leading-relaxed text-muted">{label}</span>
              </div>
            ))}
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
