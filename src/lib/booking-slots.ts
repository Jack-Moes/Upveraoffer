import "server-only";

export const BUSINESS_TIMEZONE = "America/Chicago";
export const SLOT_DURATION_MINUTES = 30;
export const BOOKING_WINDOW_DAYS = 60;
export const MINIMUM_LEAD_HOURS = 2;

type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const dateTimeFormatters = new Map<string, Intl.DateTimeFormat>();

function formatterFor(timeZone: string): Intl.DateTimeFormat {
  const existing = dateTimeFormatters.get(timeZone);
  if (existing) return existing;
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  dateTimeFormatters.set(timeZone, formatter);
  return formatter;
}

function partsInTimeZone(date: Date, timeZone: string): DateParts {
  const parts = formatterFor(timeZone).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: value("hour"),
    minute: value("minute"),
  };
}

/** Convert a wall-clock time in an IANA zone to its unique UTC instant. */
function zonedDateTimeToUtc(parts: DateParts, timeZone: string): Date {
  const target = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
  );
  let estimate = target;

  // Two passes account for DST offsets around the initial UTC estimate.
  for (let pass = 0; pass < 2; pass += 1) {
    const actual = partsInTimeZone(new Date(estimate), timeZone);
    const actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
    );
    estimate += target - actualAsUtc;
  }

  return new Date(estimate);
}

export function generateBookableSlotStarts(now = new Date()): string[] {
  const centralToday = partsInTimeZone(now, BUSINESS_TIMEZONE);
  const firstDay = Date.UTC(
    centralToday.year,
    centralToday.month - 1,
    centralToday.day,
  );
  const earliest = now.getTime() + MINIMUM_LEAD_HOURS * 60 * 60 * 1000;
  const slots: string[] = [];

  for (let offset = 0; offset <= BOOKING_WINDOW_DAYS; offset += 1) {
    const calendarDay = new Date(firstDay + offset * 24 * 60 * 60 * 1000);
    const weekday = calendarDay.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;

    for (let hour = 9; hour < 17; hour += 1) {
      for (const minute of [0, 30]) {
        const slot = zonedDateTimeToUtc(
          {
            year: calendarDay.getUTCFullYear(),
            month: calendarDay.getUTCMonth() + 1,
            day: calendarDay.getUTCDate(),
            hour,
            minute,
          },
          BUSINESS_TIMEZONE,
        );
        if (slot.getTime() >= earliest) slots.push(slot.toISOString());
      }
    }
  }

  return slots;
}

export function isBookableSlot(slotStart: string, now = new Date()): boolean {
  const parsed = new Date(slotStart);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString() !== slotStart) {
    return false;
  }
  return generateBookableSlotStarts(now).includes(slotStart);
}

export function describeSlot(slotStart: string, timeZone: string) {
  const date = new Date(slotStart);
  const local = partsInTimeZone(date, timeZone);
  const requestedDate = `${local.year}-${String(local.month).padStart(2, "0")}-${String(local.day).padStart(2, "0")}`;
  const requestedTime = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return { requestedDate, requestedTime };
}

export function isSupportedTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format();
    return true;
  } catch {
    return false;
  }
}
