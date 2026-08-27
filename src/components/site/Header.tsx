"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  // The drawer is stored as "open for this path" rather than a plain boolean,
  // so any navigation — link click, back button, redirect — closes it by
  // derivation instead of by an effect that fires after the render.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (next: boolean) => setOpenFor(next ? pathname : null);

  // Prevent background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-5">
          <Logo />

          <nav aria-label="Main" className="hidden h-full items-center gap-1 lg:flex">
            {nav.map((item) =>
              "children" in item && item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex h-full items-center gap-1 border-b-2 px-3.5 text-sm font-semibold transition-colors",
                      isActive(item.href)
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                      <path
                        d="m3 4.5 3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-0 top-full w-60 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-xl border border-border bg-background p-2 shadow-2xl shadow-black/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex h-full items-center border-b-2 px-3.5 text-sm font-semibold transition-colors",
                    isActive(item.href)
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ButtonLink href="/book" className="hidden lg:inline-flex">
              Book a free consult
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
                {open ? (
                  <path
                    d="m5 5 10 10M15 5 5 15"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3.5 6h13M3.5 10h13M3.5 14h13"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-b border-border bg-background shadow-2xl lg:hidden">
          <Container className="py-4">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-border/70 last:border-0">
                  <Link
                    href={item.href}
                    className="block py-3.5 text-base font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <ul className="mb-3 ml-3 flex flex-col gap-1 border-l border-border pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-1.5 text-sm text-muted"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <ButtonLink href="/book" size="lg" className="mt-5 w-full">
              Book a free consult
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
