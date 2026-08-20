import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { Card, CTABanner } from "@/components/site/Blocks";
import { IconBadge } from "@/components/site/ServiceIcon";
import { services, getService } from "@/content/services";
import { site } from "@/content/site";
import { images } from "@/content/images";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.name} — ${site.name}`, description: service.short },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
    url: `${site.url}/services/${service.slug}`,
  };

  return (
    <>
      <div className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="max-w-2xl">
              <IconBadge icon={service.icon} className="mb-6" />
              <Eyebrow>{service.name}</Eyebrow>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
                {service.headline}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">{service.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/book" size="lg">
                  Book a free consult
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/pricing" size="lg" variant="secondary">
                  See pricing
                </ButtonLink>
              </div>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl shadow-primary/5">
              <Image
                src={images[service.slug].src}
                alt={images[service.slug].alt}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* ------------------------------------------------ Problem framing */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Eyebrow>Sound familiar?</Eyebrow>
              <p className="font-display text-2xl font-medium leading-snug text-foreground">
                {service.problem}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold">What you get</h2>
              <ul className="mt-6 space-y-5">
                {service.deliverables.map((d) => (
                  <li key={d.title} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                        <path
                          d="m3.5 8.5 3 3 6-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-display font-semibold">{d.title}</p>
                      <p className="mt-1.5 leading-relaxed text-muted">{d.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Sequence */}
      <Section className="border-y border-border bg-surface">
        <Container>
          <h2 className="font-display text-3xl font-semibold">How it runs</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li key={step}>
                <Card className="h-full">
                  <span className="font-mono text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 leading-relaxed text-muted">{step}</p>
                </Card>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-card border border-border bg-background p-7">
            <h3 className="font-display text-lg font-semibold">
              What is different afterwards
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- Other services */}
      <Section>
        <Container>
          <h2 className="font-display text-2xl font-semibold">
            The other pieces of the search
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((other) => (
              <Link key={other.slug} href={`/services/${other.slug}`} className="group">
                <Card className="flex h-full flex-col overflow-hidden p-0 group-hover:border-primary/40">
                  <div className="relative aspect-16/9 overflow-hidden bg-surface-2">
                    <Image
                      src={images[other.slug].src}
                      alt={images[other.slug].alt}
                      fill
                      sizes="(min-width: 768px) 24rem, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <IconBadge icon={other.icon} />
                    <h3 className="mt-5 font-display text-lg font-semibold group-hover:text-primary">
                      {other.name}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">
                      {other.short}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </>
  );
}
