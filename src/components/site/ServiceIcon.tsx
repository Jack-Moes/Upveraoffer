import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

const paths: Record<Service["icon"], React.ReactNode> = {
  document: (
    <>
      <path
        d="M7 3.5h6.5L17 7v9.5A1.5 1.5 0 0 1 15.5 18h-9A1.5 1.5 0 0 1 5 16.5v-11A1.5 1.5 0 0 1 6.5 4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 3.5V7h3.5" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 11h6M8 14h4" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  conversation: (
    <>
      <path
        d="M4 6.5A1.5 1.5 0 0 1 5.5 5h7A1.5 1.5 0 0 1 14 6.5v4A1.5 1.5 0 0 1 12.5 12H8l-4 3z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 9h.5A1.5 1.5 0 0 1 18 10.5v4A1.5 1.5 0 0 1 16.5 16H16l-2 2v-2h-2"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="16" height="14" rx="2.5" strokeWidth="1.5" />
      <path
        d="m7 9 2.5 2.2L7 13.4M11.5 13.8h3.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function ServiceIcon({
  icon,
  className,
}: {
  icon: Service["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      {paths[icon]}
    </svg>
  );
}

export function IconBadge({
  icon,
  className,
}: {
  icon: Service["icon"];
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary",
        className,
      )}
    >
      <ServiceIcon icon={icon} />
    </span>
  );
}
