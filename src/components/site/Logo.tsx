import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** A diagnostic pulse resolving into an upward move. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("h-10 w-10", className)}>
      <rect width="40" height="40" rx="12" fill="var(--foreground)" />
      <path
        d="M8 23h6l3.25-7 5 12 3.5-8H32"
        stroke="var(--background)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M25 11h7v7"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="m31 12-8 8" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 rounded-lg text-[1rem] font-extrabold tracking-[-0.04em] text-foreground",
        className,
      )}
      aria-label={`${site.name} — home`}
    >
      <LogoMark className="h-10 w-10" />
      <span className="leading-none">
        upvera<span className="text-primary">offer</span>
      </span>
    </Link>
  );
}
