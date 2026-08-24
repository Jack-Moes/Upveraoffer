import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";
import { updateAdminStore } from "@/lib/admin-store";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function str(value: unknown, max = 1000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const requestedDate = str(body.requestedDate, 10);
  const requestedTime = str(body.requestedTime, 10);
  const timezone = str(body.timezone, 120);
  const service = str(body.service, 160) || "Not sure yet";
  const notes = str(body.notes, 3000);

  if (!name || !EMAIL_RE.test(email) || !requestedDate || !requestedTime || !timezone) {
    return NextResponse.json(
      { ok: false, error: "Name, email, date, time, and timezone are required." },
      { status: 400 },
    );
  }

  const booking = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    requestedDate,
    requestedTime,
    timezone,
    service,
    notes,
    internalNotes: "",
    scheduledAt: "",
    status: "requested" as const,
  };

  try {
    await updateAdminStore((store) => {
      store.bookings.unshift(booking);
      return store;
    });
  } catch (error) {
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
