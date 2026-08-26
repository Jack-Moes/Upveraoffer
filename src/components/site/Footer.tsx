import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { site, footerNav } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="paper-noise editorial-grid mt-auto overflow-hidden bg-ink text-ink-foreground">
      <Container className="py-16 sm:py-20">
        <div className="border-b border-white/10 pb-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-soft">
            Ready when you are
          </p>
          <p className="mt-5 max-w-5xl font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
            Better feedback.<br />Fewer wasted applications.
          </p>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo className="[&_span]:text-ink-foreground" />
            <p className="mt-5 text-sm leading-relaxed text-ink-foreground/60">
              {site.tagline} A job search partner for the whole thing: résumés,
              interviews, and coding assessments.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-soft">
              {site.location} · Remote worldwide
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-semibold text-ink-foreground/55 underline-offset-4 transition-colors hover:text-primary-soft hover:underline"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-primary-soft">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-foreground/55 transition-colors hover:text-ink-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-ink-foreground/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {site.legalName}. All rights reserved.</p>
          <a
            href={`mailto:${site.email}`}
            className="underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
