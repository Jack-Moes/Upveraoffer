import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Wordmark + mark. A continuous U rises into an arrow: momentum, made clear. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <defs>
        <linearGradient
          id="upvera-mark"
          x1="5"
          y1="4"
          x2="27"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7C5CFC" />
          <stop offset="1" stopColor="#4A38CC" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9.5" fill="url(#upvera-mark)" />
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="8.75"
        fill="none"
        stroke="white"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <path
        d="M8.75 9.75v7.9c0 4.2 2.65 6.85 6.65 6.85s6.6-2.65 6.6-6.85V9.8"
        stroke="white"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="m17.75 13.85 4.25-4.2 4.25 4.2"
        stroke="white"
        strokeWidth="2.7"
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
        "inline-flex items-center gap-2.5 rounded-lg font-display text-[1.05rem] font-semibold tracking-[-0.025em] text-foreground",
        className,
      )}
      aria-label={`${site.name} — home`}
    >
      <LogoMark className="h-9 w-9" />
      <span className="leading-none">
        Upvera<span className="text-primary">offer</span>
      </span>
    </Link>
  );
}
