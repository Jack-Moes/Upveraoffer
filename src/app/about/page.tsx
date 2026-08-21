import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { PageHeader, Card, CTABanner, SectionHeading } from "@/components/site/Blocks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Upveraoffer exists, what we believe about job searching, and how we work with the people we take on.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "The market isn’t a meritocracy",
    body: "Plenty of excellent engineers go unhired for months because their materials misrepresent them and nobody ever tells them why. Presentation isn’t the same as substance, but a search fails without both.",
  },
  {
    title: "Feedback has to be specific to be useful",
    body: "“Be more confident” isn’t feedback. “You spent ninety seconds on setup and thirty on your own decisions, so flip that” is. We give the second kind, in writing, after every session.",
  },
  {
    title: "Practice beats advice",
    body: "Nobody has ever read their way to being good at interviews. The gains come from doing it under pressure and getting corrected straight afterwards.",
  },
  {
    title: "Honesty is the whole product",
    body: "We’ll tell you when your résumé isn’t ready, when your target is unrealistic, and when you don’t need to hire us at all. A service that only ever agrees with you is worth nothing.",
  },
];

export default function AboutPage() {
  // Only render the founder block once there is a real photo and name to show.
  const founder = site.founder;
  const showFounder = Boolean(founder.name && founder.photo);

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We built the service we wanted during our own job searches."
        intro="Upveraoffer exists because the gap between being capable and being hired is real, unfair, and mostly fixable with structure and honest feedback."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
            <div className="max-w-2xl">
              <Eyebrow>Our story</Eyebrow>
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                {/* TODO(founder): replace the three paragraphs below with your
                    real story: why you started this, what you did before, and
                    what you saw that made the gap obvious. Specific beats
                    polished; people hire the person, not the prose. */}
                <p>
                  Every job search has the same quiet moment. Dozens of
                  applications sent, no replies, and no way to tell whether the
                  problem is the market, the résumé, or something invisible in
                  between. Nobody writes back to explain.
                </p>
                <p>
                  We started {site.name} to close that loop. Not with
                  motivational advice, and not with a template. With a
                  diagnostic that tells you which part of your search is
                  failing, and then the work to fix it.
                </p>
                <p>
                  We work with a deliberately small number of clients at once.
                  The work is hands-on, the feedback is direct, and we’d rather
                  turn someone away than take their money for a package that
                  doesn’t match what they need.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Card className="bg-surface">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Founded
                </p>
                <p className="mt-2 font-display text-3xl font-semibold">
                  {site.foundedYear}
                </p>
              </Card>
              <Card className="bg-surface">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Where we work
                </p>
                <p className="mt-2 font-display text-xl font-semibold">
                  Remote, worldwide
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Sessions run on your time zone, not ours.
                </p>
              </Card>
              <Card className="bg-surface">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Get in touch
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block font-display text-lg font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {showFounder && (
        <Section className="border-t border-border bg-surface">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[20rem_1fr]">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-surface-2">
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} at ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 20rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <Eyebrow>{founder.role}</Eyebrow>
                <h2 className="font-display text-3xl font-semibold">
                  {founder.name}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  {founder.bio}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section className="border-y border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Four things that shape how we work."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {beliefs.map((b) => (
              <Card key={b.title}>
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* TODO(founder): add a team section here once you have coach bios:
          name, photo, one paragraph of relevant credentials. Real credentials
          are the single strongest trust signal on a page like this. */}

      <CTABanner
        title="Talk to us before you decide anything."
        body="The consult is genuinely free and genuinely useful. Worst case, you get an honest outside read on your search and go do the rest yourself."
        secondary={{ href: "/faq", label: "Read the FAQ" }}
      />
    </>
  );
}
