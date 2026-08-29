import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { PageHeader, Card, CTABanner } from "@/components/site/Blocks";
import { IconBadge } from "@/components/site/ServiceIcon";
import { services } from "@/content/services";
import { images } from "@/content/images";

const serviceVisuals = {
  resume: images.servicesOverviewResume,
  interview: images.servicesOverviewInterview,
  "coding-test": images.servicesOverviewCoding,
} as const;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Résumé and CV writing, interview preparation, and coding test coaching: the three services that cover an entire job search.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything a job search actually requires."
        intro="Three services that map to the three places a search stalls. Take one, or run all three as a single sequence."
      />

      <Container className="-mt-8 sm:-mt-10">
        <div className="photo-frame relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-xl shadow-primary/10">
          <Image
            src={images.workshop.src}
            alt={images.workshop.alt}
            fill
            priority
            sizes="(min-width: 1152px) 72rem, 100vw"
            className="photo-media object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/35 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 rounded-full bg-ink/80 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            Practical coaching, live feedback, real repetition
          </p>
        </div>
      </Container>

      <Section>
        <Container>
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className="grid overflow-hidden rounded-2xl border border-border bg-background shadow-lg shadow-primary/5 lg:grid-cols-12"
              >
                <figure className={`photo-frame relative min-h-72 overflow-hidden bg-surface-2 lg:col-span-5 ${index % 2 === 1 ? "lg:order-3" : ""}`}>
                  <Image
                    src={serviceVisuals[service.slug].src}
                    alt={serviceVisuals[service.slug].alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="photo-media object-cover"
                  />
                </figure>

                <div className="p-7 sm:p-9 lg:col-span-3">
                  <IconBadge icon={service.icon} />
                  <h2 className="mt-5 font-display text-2xl font-semibold">
                    {service.name}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{service.intro}</p>
                  <ButtonLink href={`/services/${service.slug}`} className="mt-7">
                    See what you get
                    <ArrowRight />
                  </ButtonLink>
                </div>

                <div className="border-t border-border bg-surface p-7 sm:p-9 lg:col-span-4 lg:border-l lg:border-t-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                    You get
                  </p>
                  <ul className="mt-4 space-y-3">
                    {service.deliverables.slice(0, 4).map((d) => (
                      <li key={d.title} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <div>
                          <p className="font-medium leading-snug">{d.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {d.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {service.deliverables.length > 4 && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      + {service.deliverables.length - 4} more
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-6 bg-surface text-center">
            <h2 className="font-display text-xl font-semibold">
              Not sure which one you need?
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
              That’s what the diagnostic is for. Book a free consult and we’ll
              tell you where your search is actually breaking down, including if
              the answer is that you don’t need us.
            </p>
            <ButtonLink href="/book" className="mt-6">
              Book a free consult
            </ButtonLink>
          </Card>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
