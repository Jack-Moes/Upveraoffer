import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "./Logo";
import { site, footerNav } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-tight">
                Upvera<span className="text-primary">offer</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.tagline} A job search partner for the whole thing: résumés,
              interviews, and coding assessments.
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-subtle">
              {site.location} · Remote worldwide
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            <a
              href={`mailto:${site.email}`}
              className="underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
