import Link from "next/link";
import { site } from "@/content/site";
import { BookingRequestForm } from "@/components/site/BookingRequestForm";

/**
 * Uses Cal.com when a handle is configured. Otherwise the built-in request
 * form saves calls directly to the private admin booking tracker.
 */
export function BookingEmbed() {
  const handle = site.calcom;

  if (!handle) return <BookingRequestForm />;

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
        and we will book you in by hand.
      </p>
    </div>
  );
}
