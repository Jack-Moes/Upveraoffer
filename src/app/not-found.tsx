import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const suggestions = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <Section className="py-28">
      <Container className="max-w-xl text-center">
        <p className="font-mono text-sm font-semibold tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold">
          This page is not here.
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          The link may be out of date, or the page may have moved. Here is where
          most people are heading.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary/40 hover:text-primary"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <ButtonLink href="/" size="lg" className="mt-8">
          Back to the home page
        </ButtonLink>
      </Container>
    </Section>
  );
}
