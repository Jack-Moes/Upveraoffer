import "server-only";

import fs from "node:fs";
import path from "node:path";

export type MessageStatus = "new" | "read" | "replied" | "archived";
export type BookingStatus =
  | "requested"
  | "confirmed"
  | "completed"
  | "cancelled";

export type StoredMessage = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  currentRole: string;
  targetRole: string;
  service: string;
  plan: string;
  message: string;
  status: MessageStatus;
};

export type StoredBooking = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  requestedDate: string;
  requestedTime: string;
  /** Canonical UTC start for calendar-based bookings. */
  slotStart?: string;
  timezone: string;
  service: string;
  notes: string;
  internalNotes: string;
  scheduledAt: string;
  status: BookingStatus;
};

export type StoredPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  cover: string;
  coverAlt: string;
  coverCredit: string;
  coverCreditUrl: string;
  body: string;
  published: boolean;
};

export type PlanOverride = {
  id: string;
  name?: string;
  price?: number | null;
  cadence?: string;
  tagline?: string;
  bestFor?: string;
  features?: string[];
  ctaLabel?: string;
  featured?: boolean;
};

export type StoredFeedback = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  service: string;
  outcome: string;
  rating: number | null;
  photo: string;
  published: boolean;
};

export type AdminStore = {
  version: 1;
  updatedAt: string;
  messages: StoredMessage[];
  bookings: StoredBooking[];
  posts: StoredPost[];
  hiddenPostSlugs: string[];
  planOverrides: PlanOverride[];
  feedback: StoredFeedback[];
  hiddenFeedbackIds: string[];
};

function emptyStore(): AdminStore {
  return {
    version: 1,
    updatedAt: new Date(0).toISOString(),
    messages: [],
    bookings: [],
    posts: [],
    hiddenPostSlugs: [],
    planOverrides: [],
    feedback: [],
    hiddenFeedbackIds: [],
  };
}

function dataFile(): string {
  const directory = process.env.ADMIN_DATA_DIR?.trim()
    ? path.resolve(process.env.ADMIN_DATA_DIR)
    : path.join(process.cwd(), ".data");
  return path.join(directory, "control-center.json");
}

function normalize(value: Partial<AdminStore>): AdminStore {
  const fallback = emptyStore();
  return {
    ...fallback,
    ...value,
    version: 1,
    messages: Array.isArray(value.messages) ? value.messages : [],
    bookings: Array.isArray(value.bookings) ? value.bookings : [],
    posts: Array.isArray(value.posts) ? value.posts : [],
    hiddenPostSlugs: Array.isArray(value.hiddenPostSlugs)
      ? value.hiddenPostSlugs
      : [],
    planOverrides: Array.isArray(value.planOverrides)
      ? value.planOverrides
      : [],
    feedback: Array.isArray(value.feedback) ? value.feedback : [],
    hiddenFeedbackIds: Array.isArray(value.hiddenFeedbackIds)
      ? value.hiddenFeedbackIds
      : [],
  };
}

export function readAdminStore(): AdminStore {
  const file = dataFile();
  if (!fs.existsSync(file)) return emptyStore();

  try {
    return normalize(JSON.parse(fs.readFileSync(file, "utf8")) as AdminStore);
  } catch (error) {
    console.error("[admin-store] Could not read control-center.json", error);
    return emptyStore();
  }
}

let writeQueue: Promise<void> = Promise.resolve();

export function updateAdminStore(
  mutate: (store: AdminStore) => AdminStore | void,
): Promise<void> {
  const operation = writeQueue.then(async () => {
    const current = readAdminStore();
    const result = mutate(current) ?? current;
    result.updatedAt = new Date().toISOString();

    const file = dataFile();
    const directory = path.dirname(file);
    const temporary = `${file}.${process.pid}.tmp`;
    await fs.promises.mkdir(directory, { recursive: true });
    await fs.promises.writeFile(
      temporary,
      `${JSON.stringify(result, null, 2)}\n`,
      "utf8",
    );
    await fs.promises.rename(temporary, file);
  });

  writeQueue = operation.catch(() => undefined);
  return operation;
}

export function adminDataLocation(): string {
  return dataFile();
}
