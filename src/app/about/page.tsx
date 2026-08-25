import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { site } from "@/content/site";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Upveraoffer's four-person Houston team approaches resume writing, interview preparation, and technical coaching.",
  alternates: { canonical: "/about" },
};

const disciplines = [
  {
    number: "01",
    title: "Hiring signal",
    body: "We find the evidence recruiters and hiring managers need, then make it easy to see in your resume and portfolio.",
  },
  {
    number: "02",
    title: "Interview systems",
    body: "We turn scattered experience into clear stories you can deliver naturally under pressure.",
  },
  {
    number: "03",
    title: "Technical practice",
    body: "We coach the reasoning, communication, and recovery habits that coding assessments actually expose.",
  },
  {
    number: "04",
    title: "Search strategy",
    body: "We connect every application, conversation, and result so the next move is based on evidence instead of guesswork.",
  },
];

const beliefs = [
  {
    number: "01",
    title: "The market is not a meritocracy",
    body: "Excellent candidates go unseen because their materials hide the evidence. Presentation is not the same as substance, but a search needs both.",
  },
  {
    number: "02",
    title: "Feedback must be specific",
    body: "'Be more confident' changes nothing. We show you the exact sentence, decision, or habit to fix, and what to do instead.",
  },
  {
    number: "03",
    title: "Practice beats advice",
    body: "The gains come from doing the work under realistic pressure, reviewing it honestly, and repeating with a clearer target.",
  },
  {
    number: "04",
    title: "Honesty is the product",
    body: "We will tell you when a target is unrealistic, when your materials are not ready, and when you do not need to hire us.",
  },
];

const developerProfiles = [
  {
    image: images.indianDeveloper,
    label: "Senior developer",
    detail: "U.S.-based · Core team",
  },
  {
    image: images.vietnameseDeveloper,
    label: "Senior developer",
    detail: "U.S.-based · Core team",
  },
  {
    image: images.chineseDeveloper,
    label: "Senior developer",
    detail: "U.S.-based · Core team",
  },
];

const gallery = [
  {
    image: images.teamHoliday,
    kicker: "Holiday night",
    title: "One last evening before the year wrapped up.",
    note: "Warm drinks, cold weather, and nothing left on the agenda.",
    layout: "lg:col-span-7",
    frame: "h-[28rem] lg:h-[34rem]",
  },
  {
    image: images.teamSightseeing,
    kicker: "A day out",
    title: "A new place with no schedule to keep.",
    note: "Phones mostly away. Cameras occasionally out.",
    layout: "lg:col-span-5",
    frame: "h-[28rem] lg:h-[34rem]",
  },
  {
    image: images.teamSailing,
    kicker: "On the water",
    title: "An afternoon with the weather in charge.",
    note: "No deck. No stand-up. A very different kind of teamwork.",
    layout: "lg:col-span-7",
    frame: "h-[25rem] lg:h-[29rem]",
  },
  {
    image: images.teamHike,
    kicker: "Trail day",
    title: "We took the longer route.",
    note: "An early start, a clear day, and a view worth the climb.",
    layout: "lg:col-span-5",
    frame: "h-[25rem] lg:h-[29rem]",
  },
  {
    image: images.teamLounge,
    kicker: "Slow morning",
    title: "Coffee before anyone made a plan.",
    note: "The conversation lasted longer than the coffee did.",
    layout: "lg:col-span-6",
    frame: "h-[25rem] lg:h-[30rem]",
  },
  {
    image: images.teamVolunteer,
    kicker: "Community day",
    title: "An afternoon spent being useful.",
    note: "Packing, sorting, and working alongside local volunteers.",
    layout: "lg:col-span-6",
    frame: "h-[25rem] lg:h-[30rem]",
  },
  {
    image: images.teamGolf,
    kicker: "Weekend round",
    title: "Eighteen holes. Zero work talk.",
    note: "The scores stayed private. The photos did not.",
    layout: "lg:col-span-5",
    frame: "h-[25rem] lg:h-[29rem]",
  },
  {
    image: images.teamDinner,
    kicker: "Late table",
    title: "The best conversation started after dinner.",
    note: "No occasion required. Just time together at the end of a long week.",
    layout: "lg:col-span-7",
    frame: "h-[25rem] lg:h-[29rem]",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div
          aria-hidden="true"
          className="ambient-float absolute -right-40 -top-48 h-[38rem] w-[38rem] rounded-full bg-primary/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-56 left-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
            <div className="fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-soft">
                About Upveraoffer
              </p>
              <h1 className="mt-6 max-w-xl font-display text-5xl font-semibold leading-[1.03] sm:text-6xl">
                Four people. One clear standard for feedback.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/70 sm:text-xl">
                We are a small Houston team that helps technical candidates find
                the exact place their search is breaking, fix it, and move with
                more confidence.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <ButtonLink href="/book" size="lg">
                  Book a free consult <ArrowRight />
                </ButtonLink>
                <a
                  href="#how-we-work"
                  className="text-sm font-semibold text-white underline decoration-white/30 underline-offset-8 transition hover:decoration-white"
                >
                  How we work
                </a>
              </div>
            </div>

            <figure className="fade-up-delay">
              <div className="photo-frame relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
                <Image
                  src={images.teamMeeting.src}
                  alt={images.teamMeeting.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className="photo-media object-cover object-center"
                />
              </div>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.14em] text-ink-foreground/45">
                Focused work. Straight conversation.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <Section id="how-we-work">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="photo-frame relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface-2 shadow-xl shadow-primary/10">
              <Image
                src={images.coachingSession.src}
                alt={images.coachingSession.alt}
                fill
                sizes="(min-width: 1024px) 38rem, 100vw"
                className="photo-media object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Why we started
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                A job search should be a diagnosis, not a guessing game.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  Applications disappear, interviews stall, or a timed assessment
                  turns preparation into a blank screen. Most candidates never get
                  told which part broke.
                </p>
                <p>
                  Upveraoffer closes that loop. We look at the whole sequence,
                  identify the constraint, and work on the smallest set of changes
                  that can move the search forward.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["4", "People"],
                  ["1:1", "Coaching"],
                  ["24h", "Follow-up"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-border bg-surface p-4">
                    <p className="font-display text-2xl font-semibold text-primary">{value}</p>
                    <p className="mt-1 text-xs leading-snug text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The team"
              title="Four senior developers. One shared method."
              intro="We keep the team small so context never gets lost between a resume review, an interview session, and technical practice."
            />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Based in {site.location}. Working with candidates across U.S. and
              international time zones.
            </p>
          </div>

          <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-border bg-background shadow-xl shadow-primary/10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="photo-frame relative min-h-[28rem] overflow-hidden bg-surface-2 lg:min-h-[32rem]">
              <Image
                src={images.founderPortrait.src}
                alt={images.founderPortrait.alt}
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="photo-media object-cover object-center"
              />
            </div>
            <div className="relative flex flex-col justify-center overflow-hidden bg-ink p-8 text-ink-foreground sm:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
              />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-soft">
                  {site.founder.role}
                </p>
                <h3 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Engineering leadership that stays close to the work.
                </h3>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/70">
                  {site.founder.bio}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Senior software engineer", "Team of four", "Client work oversight"].map(
                    (label) => (
                      <span
                        key={label}
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-ink-foreground/75"
                      >
                        {label}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                The rest of the team
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                Three senior developers, three distinct perspectives.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              The same people stay close to the work from the first review through
              the final practice session.
            </p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {developerProfiles.map((member) => (
              <figure
                key={member.image.src}
                className="group overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-lg shadow-primary/5"
              >
                <div className="photo-frame relative aspect-[4/5] overflow-hidden bg-surface-2">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="photo-media object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="font-display text-lg font-semibold">{member.label}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                    {member.detail}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
            What the team covers
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((item) => (
              <Card key={item.number} className="group min-h-64 p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-primary">{item.number}</span>
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
                  />
                </div>
                <h3 className="mt-12 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden border-y border-border bg-surface">
        <div
          aria-hidden="true"
          className="absolute -left-48 top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-48 bottom-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <Container className="relative">
          <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Team, off duty
              </p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                We work hard. We also leave the office.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Eight real days with the people behind Upveraoffer: holiday evenings,
                time outdoors, community work, and meals that ran late.
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                <span className="h-px w-10 bg-primary" />
                Photo notes · 01—08
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-12 lg:gap-6">
            {gallery.map((item, index) => (
              <figure
                key={item.title}
                className={`group relative ${item.layout}`}
              >
                <div
                  className={`photo-frame relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink shadow-2xl shadow-primary/10 ${item.frame}`}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="photo-media object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/15 transition-colors duration-700 group-hover:via-black/5"
                  />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md sm:left-6 sm:top-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-[1.7]" />
                    {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                      {item.kicker}
                    </p>
                    <h3 className="mt-2 max-w-xl font-display text-2xl font-semibold leading-tight sm:text-3xl">
                      {item.title}
                    </h3>
                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity,transform] duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:translate-y-3 lg:group-hover:grid-rows-[1fr] lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="max-w-lg pt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-ink text-ink-foreground">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-soft">
                Space to think
              </p>
              <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight sm:text-4xl">
                A calm setting for exacting work.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-foreground/65">
                Quiet focus for deep work, then a clear room for the conversations
                that move a search forward. No theater, no crowded handoffs.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { image: images.officeExterior, label: "Arrival" },
                { image: images.officeInterior, label: "Workspace" },
              ].map((item) => (
                <figure key={item.label}>
                  <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 640px) 22rem, 100vw"
                      className="photo-media object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-foreground/50">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Four things that shape every engagement."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {beliefs.map((belief) => (
              <Card key={belief.number} className="group relative overflow-hidden p-7 sm:p-8">
                <span className="font-mono text-xs font-semibold text-primary">{belief.number}</span>
                <h3 className="mt-5 font-display text-xl font-semibold">{belief.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{belief.body}</p>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-3 font-display text-8xl font-semibold text-primary/5"
                >
                  {belief.number}
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner
        title="Talk to the team before you decide anything."
        body="The consult is free and useful on purpose. Bring the materials and the history of your search; we will tell you what we see."
        secondary={{ href: "/faq", label: "Read the FAQ" }}
      />
    </>
  );
}
