import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { PageHeader, Card, CTABanner } from "@/components/site/Blocks";
import { IconBadge } from "@/components/site/ServiceIcon";
import { services } from "@/content/services";
import { images } from "@/content/images";

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

      <Section>
        <Container>
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.slug}
                className="grid gap-8 rounded-card border border-border bg-background p-7 sm:p-9 lg:grid-cols-[1fr_1.2fr]"
              >
                <div>
                  <div className="relative mb-7 aspect-16/9 overflow-hidden rounded-2xl bg-surface-2">
                    <Image
                      src={images[service.slug].src}
                      alt={images[service.slug].alt}
                      fill
                      sizes="(min-width: 1024px) 26rem, 100vw"
                      className="object-cover"
                    />
                  </div>
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

                <div className="rounded-2xl bg-surface p-6">
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
