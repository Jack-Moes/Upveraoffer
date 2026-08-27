"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

type AvailabilityResponse = {
  ok?: boolean;
  slots?: string[];
  durationMinutes?: number;
  businessTimeZone?: string;
  error?: string;
};

const TIME_ZONES = [
  ["America/Chicago", "Central Time"],
  ["America/New_York", "Eastern Time"],
  ["America/Denver", "Mountain Time"],
  ["America/Los_Angeles", "Pacific Time"],
  ["America/Phoenix", "Arizona Time"],
  ["Europe/London", "London"],
  ["Europe/Paris", "Central European Time"],
  ["Asia/Kolkata", "India Standard Time"],
  ["Asia/Ho_Chi_Minh", "Vietnam Time"],
  ["Asia/Tokyo", "Japan Time"],
  ["UTC", "UTC"],
] as const;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-[0.95rem] text-foreground " +
  "placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
const label = "mb-1.5 block text-sm font-semibold text-foreground";

function dateParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return { year: value("year"), month: value("month"), day: value("day") };
}

function dateKey(date: Date, timeZone: string) {
  const parts = dateParts(date, timeZone);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function monthKey(date: Date, timeZone: string) {
  const parts = dateParts(date, timeZone);
  return `${parts.year}-${parts.month}`;
}

function monthName(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthNumber - 1, 1)));
}

function shiftMonth(month: string, amount: number) {
  const [year, monthNumber] = month.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, monthNumber - 1 + amount, 1));
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}`;
}

function calendarCells(month: string): Array<number | null> {
  const [year, monthNumber] = month.split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const cells: Array<number | null> = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function displayDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function displayTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function BookingRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [timezone, setTimezone] = useState("America/Chicago");
  const [month, setMonth] = useState(() => monthKey(new Date(), "America/Chicago"));
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [confirmation, setConfirmation] = useState<{ slot: string; timeZone: string } | null>(null);

  const refreshAvailability = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const response = await fetch("/api/bookings", { cache: "no-store" });
      const result = (await response.json()) as AvailabilityResponse;
      if (!response.ok || !result.ok || !Array.isArray(result.slots)) {
        throw new Error(result.error || "Could not load available times.");
      }
      setSlots(result.slots);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load available times.");
      setStatus("error");
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) {
        setTimezone(detected);
        setMonth(monthKey(new Date(), detected));
      }
      void refreshAvailability();
    });
    const interval = window.setInterval(() => void refreshAvailability(), 30_000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, [refreshAvailability]);

  const slotsByDate = useMemo(() => {
    const grouped = new Map<string, string[]>();
    for (const slot of slots) {
      const key = dateKey(new Date(slot), timezone);
      grouped.set(key, [...(grouped.get(key) ?? []), slot]);
    }
    return grouped;
  }, [slots, timezone]);

  const availableDates = useMemo(() => new Set(slotsByDate.keys()), [slotsByDate]);
  const selectedDaySlots = selectedDate ? slotsByDate.get(selectedDate) ?? [] : [];
  const cells = calendarCells(month);
  const currentMonth = monthKey(new Date(), timezone);
  const lastMonth = slots.length
    ? monthKey(new Date(slots[slots.length - 1]), timezone)
    : currentMonth;

  function changeTimezone(next: string) {
    setTimezone(next);
    setMonth(monthKey(new Date(), next));
    setSelectedDate("");
    setSelectedSlot("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) {
      setStatus("error");
      setError("Choose an available date and time first.");
      return;
    }

    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as AvailabilityResponse;
      if (!response.ok || !result.ok) {
        if (response.status === 409) {
          setSelectedSlot("");
          setSelectedDate("");
          await refreshAvailability();
        }
        throw new Error(result.error || "Could not save the booking request.");
      }
      setConfirmation({ slot: selectedSlot, timeZone: timezone });
      form.reset();
      await refreshAvailability();
      setStatus("sent");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    }
  }

  if (status === "sent" && confirmation) {
    const confirmedDate = new Date(confirmation.slot);
    return (
      <div className="rounded-card border border-primary/30 bg-primary-soft p-8 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-3xl font-bold">Your time is held.</h2>
        <p className="mt-3 text-lg font-semibold text-foreground">
          {displayDate(confirmedDate, confirmation.timeZone)} at {displayTime(confirmedDate, confirmation.timeZone)}
        </p>
        <p className="mt-2 leading-relaxed text-muted">
          Nobody else can request this time. We will email the final call details after review.
        </p>
        <button
          type="button"
          onClick={() => {
            setConfirmation(null);
            setSelectedDate("");
            setSelectedSlot("");
            setStatus("idle");
          }}
          className="mt-6 text-sm font-bold text-primary underline underline-offset-4"
        >
          Book another time
        </button>
      </div>
    );
  }

  const [year, monthNumber] = month.split("-").map(Number);

  return (
    <form onSubmit={onSubmit} className="overflow-hidden rounded-card border border-border bg-background shadow-[0_24px_70px_-55px_hsl(var(--shadow-color))]">
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="booking-company-website">Do not fill this in</label>
        <input id="booking-company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="slotStart" value={selectedSlot} />
      <input type="hidden" name="timezone" value={timezone} />

      <div className="border-b border-border px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Schedule your call</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Choose an available time.</h2>
            <p className="mt-2 text-sm text-muted">30-minute consultation · Times update automatically</p>
          </div>
          <div>
            <label htmlFor="booking-timezone" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-subtle">Timezone</label>
            <select
              id="booking-timezone"
              value={timezone}
              onChange={(event) => changeTimezone(event.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {!TIME_ZONES.some(([value]) => value === timezone) && <option value={timezone}>{timezone.replaceAll("_", " ")}</option>}
              {TIME_ZONES.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid min-h-[31rem] lg:grid-cols-[1.15fr_.85fr]">
        <section className="border-b border-border p-5 sm:p-8 lg:border-b-0 lg:border-r" aria-label="Choose a date">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">{monthName(month)}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous month"
                disabled={month <= currentMonth}
                onClick={() => setMonth(shiftMonth(month, -1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true"><path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={month >= lastMonth}
                onClick={() => setMonth(shiftMonth(month, 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((weekday) => <div key={weekday} className="pb-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-subtle">{weekday}</div>)}
            {cells.map((day, index) => {
              if (day === null) return <span key={`blank-${index}`} aria-hidden="true" />;
              const key = `${year}-${String(monthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const available = availableDates.has(key);
              const selected = selectedDate === key && available;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!available || loadingSlots}
                  aria-label={`${available ? "Choose" : "Unavailable"} ${key}`}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedDate(key);
                    setSelectedSlot("");
                  }}
                  className={cn(
                    "relative mx-auto flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition sm:h-12 sm:w-12",
                    selected && "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
                    !selected && available && "hover:bg-primary-soft hover:text-primary",
                    !available && "cursor-not-allowed text-subtle/35",
                  )}
                >
                  {day}
                  {available && !selected && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-subtle">
            <span className="h-2 w-2 rounded-full bg-primary" /> Dates with available times
          </div>
        </section>

        <section className="bg-surface p-6 sm:p-8" aria-label="Choose a time">
          {loadingSlots ? (
            <div className="flex h-full min-h-64 items-center justify-center text-sm text-muted">Loading available times…</div>
          ) : selectedDate && selectedDaySlots.length > 0 ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Available times</p>
              <h3 className="mt-2 font-display text-xl font-bold">{displayDate(new Date(selectedDaySlots[0]), timezone)}</h3>
              <p className="mt-1 text-sm text-muted">Shown in {timezone.replaceAll("_", " ")}</p>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {selectedDaySlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={selectedSlot === slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "rounded-lg border px-3 py-3 text-sm font-bold transition",
                      selectedSlot === slot
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "border-border bg-background hover:border-primary hover:text-primary",
                    )}
                  >
                    {displayTime(new Date(slot), timezone)}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background text-primary">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">Choose a date</h3>
              <p className="mt-2 max-w-56 text-sm leading-relaxed text-muted">Select a date with a green dot to see its open times.</p>
            </div>
          )}
        </section>
      </div>

      <div className="space-y-5 border-t border-border p-6 sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Your details</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Where should we send the invite?</h3>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className={label} htmlFor="booking-name">Name</label><input id="booking-name" name="name" required autoComplete="name" className={field} /></div>
          <div><label className={label} htmlFor="booking-email">Email</label><input id="booking-email" name="email" type="email" required autoComplete="email" className={field} /></div>
        </div>
        <div><label className={label} htmlFor="booking-service">Main goal</label><select id="booking-service" name="service" defaultValue="" className={field}><option value="">Not sure yet</option><option>Resume and CV</option><option>Interview preparation</option><option>Coding test coaching</option><option>Full job-search support</option></select></div>
        <div><label className={label} htmlFor="booking-notes">Anything we should know?</label><textarea id="booking-notes" name="notes" rows={4} className={field} placeholder="Your target role, deadline, or where the search is stuck." /></div>

        {status === "error" && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={status === "sending" || !selectedSlot}>
            {status === "sending" ? "Reserving…" : selectedSlot ? `Reserve ${displayTime(new Date(selectedSlot), timezone)}` : "Choose a time first"}
          </Button>
          {selectedSlot && <p className="text-sm text-muted">This slot becomes unavailable to others after you reserve it.</p>}
        </div>
      </div>
    </form>
  );
}
