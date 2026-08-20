import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Wordmark + mark. The mark is an ascending bar chart resolving into an
 * upward arrow — "up" and "offer" in one shape.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M9 21.5v-4.2M15.5 21.5v-7.4M22 21.5v-2"
        stroke="currentColor"
        className="text-primary-foreground/55"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9.5 17 15.5 11.5 19 14.5 24 9.5"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 9.5h4.5V14"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg font-display text-lg font-semibold tracking-tight text-foreground",
        className,
      )}
      aria-label={`${site.name} — home`}
    >
      <LogoMark />
      <span>
        Upvera<span className="text-primary">offer</span>
      </span>
    </Link>
  );
}
