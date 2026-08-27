import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

/** Vertical rhythm wrapper. Every page section uses this so spacing stays uniform. */
export function Section({
  className,
  id,
  children,
}: {
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-18 sm:py-24 lg:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-2.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-primary">
      <span aria-hidden="true" className="h-px w-6 bg-primary" />
      <span>{children}</span>
    </p>
  );
}
