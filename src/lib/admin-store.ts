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

type D1RunResult = {
  success?: boolean;
  meta?: { changes?: number };
};

type D1PreparedStatementLike = {
  bind(...values: unknown[]): D1PreparedStatementLike;
  first<T>(): Promise<T | null>;
  run(): Promise<D1RunResult>;
};

type D1DatabaseLike = {
  prepare(query: string): D1PreparedStatementLike;
};

type D1StoreRow = {
  value: string;
  version: number;
};

const STORE_KEY = "control-center";
const MAX_D1_UPDATE_ATTEMPTS = 6;

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

function readLocalAdminStore(): AdminStore {
  const file = dataFile();
  if (!fs.existsSync(file)) return emptyStore();

  try {
    return normalize(JSON.parse(fs.readFileSync(file, "utf8")) as AdminStore);
  } catch (error) {
    console.error("[admin-store] Could not read control-center.json", error);
    return emptyStore();
  }
}

async function cloudflareDatabase(): Promise<D1DatabaseLike | null> {
  if (process.env.ADMIN_STORAGE !== "d1") return null;

  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const context = await getCloudflareContext({ async: true });
  const database = (context.env as CloudflareEnv & { DB?: D1DatabaseLike }).DB;
  if (!database) {
    throw new Error(
      "ADMIN_STORAGE is set to d1, but the Cloudflare DB binding is missing.",
    );
  }
  return database;
}

async function readD1Row(database: D1DatabaseLike): Promise<D1StoreRow | null> {
  return database
    .prepare("SELECT value, version FROM admin_store WHERE key = ?")
    .bind(STORE_KEY)
    .first<D1StoreRow>();
}

function parseStore(value: string): AdminStore {
  try {
    return normalize(JSON.parse(value) as AdminStore);
  } catch (error) {
    console.error("[admin-store] Could not parse the stored D1 state", error);
    return emptyStore();
  }
}

export async function readAdminStore(): Promise<AdminStore> {
  const database = await cloudflareDatabase();
  if (!database) return readLocalAdminStore();

  const row = await readD1Row(database);
  return row ? parseStore(row.value) : emptyStore();
}

let writeQueue: Promise<void> = Promise.resolve();

async function updateD1AdminStore(
  database: D1DatabaseLike,
  mutate: (store: AdminStore) => AdminStore | void,
): Promise<void> {
  for (let attempt = 0; attempt < MAX_D1_UPDATE_ATTEMPTS; attempt += 1) {
    const row = await readD1Row(database);
    const current = row ? parseStore(row.value) : emptyStore();
    const result = normalize(mutate(current) ?? current);
    result.updatedAt = new Date().toISOString();
    const serialized = JSON.stringify(result);

    const write = row
      ? await database
          .prepare(
            "UPDATE admin_store SET value = ?, version = version + 1, updated_at = ? WHERE key = ? AND version = ?",
          )
          .bind(serialized, result.updatedAt, STORE_KEY, row.version)
          .run()
      : await database
          .prepare(
            "INSERT OR IGNORE INTO admin_store (key, value, version, updated_at) VALUES (?, ?, 1, ?)",
          )
          .bind(STORE_KEY, serialized, result.updatedAt)
          .run();

    if (write.meta?.changes === 1) return;
  }

  throw new Error(
    "The admin data changed repeatedly while saving. Please try again.",
  );
}

export async function updateAdminStore(
  mutate: (store: AdminStore) => AdminStore | void,
): Promise<void> {
  const database = await cloudflareDatabase();
  if (database) return updateD1AdminStore(database, mutate);

  const operation = writeQueue.then(async () => {
    const current = readLocalAdminStore();
    const result = normalize(mutate(current) ?? current);
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
  return process.env.ADMIN_STORAGE === "d1"
    ? "Cloudflare D1 (DB/admin_store)"
    : dataFile();
}
