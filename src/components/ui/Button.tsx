import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "contrast" | "contrastOutline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-300 " +
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.99] " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "border border-primary bg-primary text-primary-foreground shadow-[0_12px_28px_-18px_var(--primary)] hover:border-primary-hover hover:bg-primary-hover",
  secondary:
    "border border-foreground/25 bg-background text-foreground hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:bg-surface",
  contrast:
    "border border-[#baf7ff] bg-[#baf7ff] text-[#07121f] shadow-[0_14px_32px_-18px_rgba(0,0,0,0.8)] hover:border-white hover:bg-white",
  contrastOutline:
    "border border-white/55 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#07121f]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm tracking-[-0.01em]",
  lg: "h-14 px-7 text-[0.95rem] tracking-[-0.01em]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={buttonClass(variant, size, className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
    >
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
