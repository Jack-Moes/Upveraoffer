import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>
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
    <section id={id} className={cn("py-20 sm:py-28 lg:py-32", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
      <span>{children}</span>
    </p>
  );
}
