import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { SectionHeading, Card, CTABanner } from "@/components/site/Blocks";
import { IconBadge } from "@/components/site/ServiceIcon";
import { services } from "@/content/services";
import { steps, pillars } from "@/content/process";
import { currencySymbol } from "@/content/pricing";
import { images } from "@/content/images";
import { getPublicPlans, getPublicTestimonials } from "@/lib/managed-content";
import { TestimonialCard, FeaturedTestimonial } from "@/components/site/Testimonials";
import { getAllPosts, formatDate } from "@/lib/blog";

const stalls = [
  {
    stage: "You apply and hear nothing",
    cause:
      "Your résumé reads like a job description. Screeners and recruiters can't find any evidence that you did the work, so they move on.",
    fix: "Résumé rebuilt around impact",
    href: "/services/resume",
  },
  {
    stage: "You interview and lose",
    cause:
      "You know the material, but the answers wander, it's never clear what you owned, and the interviewer leaves unconvinced.",
    fix: "Mock interviews with real feedback",
    href: "/services/interview",
  },
  {
    stage: "You freeze on the assessment",
    cause:
      "Hundreds of practice problems and still a blank screen, because nothing you practiced trained the first two minutes.",
    fix: "Pattern-first coding coaching",
    href: "/services/coding-test",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const feedback = getPublicTestimonials();
  const plans = getPublicPlans();

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          aria-hidden="true"
          className="ambient-float pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Now accepting new clients
              </span>

              <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.06] sm:text-6xl">
                From résumé
                <br />
                to <span className="text-primary">offer</span>.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Upveraoffer is a job search partner for the whole process. The
                résumé that gets you read, the interviews that get you through,
                and the coding tests standing between you and the offer.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/book" size="lg">
                  Book a free consult
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/process" size="lg" variant="secondary">
                  See how it works
                </ButtonLink>
              </div>

              <p className="mt-5 text-sm text-subtle">
                Thirty minutes, no charge, no obligation. You leave with a written
                read on where your search actually stands.
              </p>
            </div>

            {/* Team photograph with the four-stage journey card overlapping it. */}
            <div className="fade-up-delay relative lg:pl-10">
              <div className="photo-frame relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-border bg-surface-2 shadow-2xl shadow-primary/15">
                <Image
                  src={images.teamMeeting.src}
                  alt={images.teamMeeting.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42rem, 100vw"
                  className="photo-media object-cover"
                />
                {/* Warms the photo toward the brand and lifts card contrast. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink/45 via-transparent to-transparent"
                />
                <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-ink/80 px-4 py-2 text-xs font-medium text-white backdrop-blur">
                  A real working session
                </span>
              </div>

              <div className="mt-6 rounded-3xl border border-border bg-background p-6 shadow-xl shadow-primary/5 lg:absolute lg:-left-2 lg:bottom-8 lg:mt-0 lg:w-72 lg:p-7">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  The path
                </p>
                <ol className="mt-5 space-y-5">
                  {steps.map((step, i) => (
                    <li key={step.number} className="relative flex gap-3.5">
                      {i < steps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-4 top-8 h-[calc(100%+0.35rem)] w-px bg-border"
                        />
                      )}
                      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-[0.65rem] font-semibold text-primary">
                        {step.number}
                      </span>
                      <div className="pt-0.5">
                        <p className="font-display text-sm font-semibold leading-none">
                          {step.title}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted">
                          {step.summary}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ Where it stalls */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title="A job search stalls in one of three places."
            intro="Each one has a different cause and a different fix. Guessing wrong is what turns a three-month search into a nine-month one."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {stalls.map((s) => (
              <Card key={s.stage} className="flex flex-col">
                <h3 className="font-display text-lg font-semibold">{s.stage}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {s.cause}
                </p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {s.fix}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- The services */}
      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Three services, built to be used together."
            intro="Take one if that's all you need. Most people find the pieces build on each other. A stronger résumé gets you more interviews, and interview practice is wasted if the coding test stops you first."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.slug}
                className="group flex flex-col overflow-hidden p-0 hover:border-primary/40"
              >
                <div className="photo-frame relative aspect-16/10 overflow-hidden bg-surface-2">
                  <Image
                    src={images[service.slug].src}
                    alt={images[service.slug].alt}
                    fill
                    sizes="(min-width: 1024px) 22rem, 100vw"
                    className="photo-media object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                <IconBadge icon={service.icon} />
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {service.short}
                </p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex gap-2.5 text-sm text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Explore {service.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- How we work */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="How we work"
                title="Diagnose first. Then prescribe."
                intro="Most career advice is generic because it was written before anyone looked at your situation. We look first."
              />
              <ButtonLink href="/process" variant="secondary" className="mt-8">
                The full process
              </ButtonLink>

                <div className="photo-frame relative mt-10 hidden aspect-4/3 overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-lg shadow-primary/10 lg:block">
                  <Image
                    src={images.coachingSession.src}
                  alt={images.coachingSession.alt}
                  fill
                  sizes="30rem"
                  className="photo-media object-cover"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pillars.map((p) => (
                <Card key={p.title} className="bg-surface">
                  <h3 className="font-display text-base font-semibold">{p.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </Card>
              ))}
              <Card className="bg-primary text-primary-foreground">
                <h3 className="font-display text-base font-semibold">
                  Honest feedback, always
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-primary-foreground/80">
                  If your materials are not ready, we tell you rather than send you
                  out to find out the expensive way.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- What people say */}
      {feedback.length > 0 && (
        <Section className="border-y border-border bg-surface">
          <Container>            <SectionHeading
              eyebrow="What people say"
              title="In their words, not ours."
              intro="Every quote below is published with the client's written permission."
              align="center"
            />
            <div className="mt-12 space-y-5">
              <FeaturedTestimonial t={feedback[0]} />
              {feedback.length > 1 && (
                <div className="grid gap-5 md:grid-cols-3">
                  {feedback.slice(1, 4).map((t) => (
                    <TestimonialCard key={t.quote} t={t} />
                  ))}
                </div>
              )}
            </div>
            <p className="mt-10 text-center">
              <Link
                href="/success-stories"
                className="font-medium text-primary underline underline-offset-4"
              >
                Read all client results
              </Link>
            </p>
          </Container>
        </Section>
      )}

      {/* ------------------------------------------------- Pricing preview */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Pick the depth your search needs."
            intro="One-time packages, no subscriptions, no retainer. Payment plans available on request."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={
                  plan.featured
                    ? "relative border-primary/50 ring-1 ring-primary/25"
                    : ""
                }
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most chosen
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{plan.bestFor}</p>
                <p className="mt-5 font-display text-3xl font-semibold">
                  {plan.price === null ? (
                    "Custom"
                  ) : (
                    <>
                      {currencySymbol}
                      {plan.price.toLocaleString("en-US")}
                      <span className="ml-1.5 text-sm font-normal text-subtle">
                        {plan.cadence}
                      </span>
                    </>
                  )}
                </p>
                <ButtonLink
                  href={plan.cta.href}
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {plan.cta.label}
                </ButtonLink>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-subtle">
            Full feature comparison on the{" "}
            <Link href="/pricing" className="text-primary underline underline-offset-4">
              pricing page
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* ----------------------------------------------------- Blog teaser */}
      {posts.length > 0 && (
        <Section>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Resources"
                title="Free, and genuinely useful."
                intro="The same material we teach clients, written up so you can use it whether or not you ever hire us."
              />
              <ButtonLink href="/blog" variant="secondary">
                All articles
              </ButtonLink>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="flex h-full flex-col overflow-hidden p-0 group-hover:border-primary/40">
                    {post.cover && (
                      <div className="photo-frame relative aspect-[16/9] overflow-hidden bg-surface-2">
                        <Image
                          src={post.cover}
                          alt={post.coverAlt}
                          fill
                          sizes="(min-width: 768px) 22rem, 100vw"
                          className="photo-media object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-subtle">
                      <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">
                        {post.category}
                      </span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                      {post.description}
                    </p>
                    <p className="mt-5 text-xs text-subtle">{formatDate(post.date)}</p>
                    </div>
                  </Card>
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
