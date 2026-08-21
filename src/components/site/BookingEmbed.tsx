import Link from "next/link";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Cal.com scheduling embed.
 *
 * Set `calcom` in src/content/site.ts to "<username>/<event-slug>" to turn
 * this on. Until then it renders an honest fallback that routes people to the
 * contact form rather than showing a broken iframe.
 */
export function BookingEmbed() {
  const handle = site.calcom;

  if (!handle) {
    return (
      <div className="rounded-card border border-dashed border-border bg-surface p-10 text-center">
        <h2 className="font-display text-xl font-semibold">
          Online booking is opening shortly
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Self-serve booking isn’t live yet. Send us a message with a couple of
          times that suit you and we’ll confirm a slot the same day.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact">Request a consult</ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            Email us
          </ButtonLink>
        </div>
      </div>
    );
  }

  const src = `https://cal.com/${handle}?embed=true&layout=month_view`;

  return (
    <div className="overflow-hidden rounded-card border border-border bg-background">
      <iframe
        src={src}
        title={`Book a consultation with ${site.name}`}
        loading="lazy"
        className="h-[720px] w-full border-0"
        allow="camera; microphone; fullscreen; payment"
      />
      <p className="border-t border-border px-5 py-3 text-sm text-subtle">
        Scheduler not loading?{" "}
        <Link href="/contact" className="text-primary underline underline-offset-4">
          Send us a message
        </Link>{" "}
        and we’ll book you in by hand.
      </p>
    </div>
  );
}
