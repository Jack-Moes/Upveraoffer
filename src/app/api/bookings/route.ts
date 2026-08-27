import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";
import { readAdminStore, updateAdminStore } from "@/lib/admin-store";
import {
  BUSINESS_TIMEZONE,
  SLOT_DURATION_MINUTES,
  describeSlot,
  generateBookableSlotStarts,
  isBookableSlot,
  isSupportedTimeZone,
} from "@/lib/booking-slots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = Record<string, unknown>;

function str(value: unknown, max = 1000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

class SlotUnavailableError extends Error {}

export async function GET() {
  const store = await readAdminStore();
  const occupied = new Set(
    store.bookings
      .filter((booking) => booking.status !== "cancelled" && booking.slotStart)
      .map((booking) => booking.slotStart as string),
  );
  const slots = generateBookableSlotStarts().filter((slot) => !occupied.has(slot));

  return NextResponse.json(
    {
      ok: true,
      slots,
      durationMinutes: SLOT_DURATION_MINUTES,
      businessTimeZone: BUSINESS_TIMEZONE,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (str(body.companyWebsite)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 240);
  const slotStart = str(body.slotStart, 40);
  const timezone = str(body.timezone, 120);
  const service = str(body.service, 160) || "Not sure yet";
  const notes = str(body.notes, 3000);

  if (
    !name ||
    !EMAIL_RE.test(email) ||
    !slotStart ||
    !timezone ||
    !isSupportedTimeZone(timezone)
  ) {
    return NextResponse.json(
      { ok: false, error: "Name, email, timezone, and an available time are required." },
      { status: 400 },
    );
  }

  if (!isBookableSlot(slotStart)) {
    return NextResponse.json(
      { ok: false, error: "That time is no longer available. Please choose another." },
      { status: 409 },
    );
  }

  const { requestedDate, requestedTime } = describeSlot(slotStart, timezone);

  const booking = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    requestedDate,
    requestedTime,
    slotStart,
    timezone,
    service,
    notes,
    internalNotes: "",
    scheduledAt: "",
    status: "requested" as const,
  };

  try {
    await updateAdminStore((store) => {
      const alreadyBooked = store.bookings.some(
        (item) => item.status !== "cancelled" && item.slotStart === slotStart,
      );
      if (alreadyBooked) throw new SlotUnavailableError();
      store.bookings.unshift(booking);
      return store;
    });
  } catch (error) {
    if (error instanceof SlotUnavailableError) {
      return NextResponse.json(
        { ok: false, error: "Someone just booked that time. Please choose another." },
        { status: 409 },
      );
    }
    console.error("[booking] Could not save request:", error);
    return NextResponse.json(
      { ok: false, error: "We could not save that booking request. Please try again." },
      { status: 500 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (apiKey && from) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: [to],
        replyTo: email,
        subject: `New consultation request — ${name}`,
        text: [
          `New booking request from ${site.name}`,
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Requested: ${requestedDate} at ${requestedTime}`,
          `Timezone: ${timezone}`,
          `Service: ${service}`,
          "",
          "Notes:",
          notes || "—",
        ].join("\n"),
      });
    } catch (error) {
      console.error("[booking] Email notification failed:", error);
    }
  }

  return NextResponse.json({ ok: true, bookingId: booking.id });
}
