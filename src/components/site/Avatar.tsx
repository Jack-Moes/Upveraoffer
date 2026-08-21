import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Reviewer avatar.
 *
 * Renders a real photograph when one is supplied, and otherwise a generated
 * monogram. The monogram is deliberate: a stock photo of a stranger attached
 * to a review they did not write misuses that person's likeness to endorse
 * the business. Monograms are honest and read as a design choice.
 */

const TINTS = [
  "bg-primary-soft text-primary",
  "bg-accent-soft text-accent-strong",
  "bg-surface-2 text-foreground",
] as const;

/** Stable per-name tint, so a given reviewer always looks the same. */
function tintFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return TINTS[hash % TINTS.length];
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const SIZES = {
  sm: { box: "h-10 w-10", text: "text-xs", px: 40 },
  md: { box: "h-12 w-12", text: "text-sm", px: 48 },
  lg: { box: "h-16 w-16", text: "text-lg", px: 64 },
} as const;

export function Avatar({
  name,
  photo,
  size = "md",
  className,
}: {
  name: string;
  photo?: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const s = SIZES[size];

  if (photo) {
    return (
      <Image
        src={photo}
        alt={`Portrait of ${name}`}
        width={s.px}
        height={s.px}
        className={cn(
          s.box,
          "shrink-0 rounded-full border border-border object-cover",
          className,
        )}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        s.box,
        s.text,
        tintFor(name),
        "inline-flex shrink-0 items-center justify-center rounded-full border border-border font-display font-semibold tracking-tight",
        className,
      )}
    >
      {initialsFor(name)}
    </span>
  );
}

/** Five stars with `value` filled. Announced once for screen readers. */
export function Rating({ value, className }: { value: number; className?: string }) {
  const rounded = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <span className="sr-only">{rounded} out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={cn("h-4 w-4", i < rounded ? "text-accent-strong" : "text-border")}
          fill="currentColor"
        >
          <path d="M10 1.8l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 7.5l5.4-.8L10 1.8z" />
        </svg>
      ))}
    </span>
  );
}
