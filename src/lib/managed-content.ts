import "server-only";

import { plans, type Plan } from "@/content/pricing";
import {
  testimonials,
  type Testimonial,
} from "@/content/testimonials";
import {
  readAdminStore,
  type StoredFeedback,
} from "@/lib/admin-store";

export type FeedbackEntry = StoredFeedback & { isBuiltIn: boolean };

function feedbackId(item: Testimonial, index: number): string {
  const name = item.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `built-in-${name || "feedback"}-${index + 1}`;
}

function builtInFeedback(): FeedbackEntry[] {
  return testimonials.map((item, index) => ({
    id: feedbackId(item, index),
    quote: item.quote,
    name: item.name,
    role: item.role,
    company: item.company ?? "",
    service: item.service ?? "",
    outcome: item.outcome ?? "",
    rating: item.rating ?? null,
    photo: item.photo ?? "",
    published: true,
    isBuiltIn: true,
  }));
}

export function getPublicPlans(): Plan[] {
  const overrides = new Map(
    readAdminStore().planOverrides.map((override) => [override.id, override]),
  );

  return plans.map((plan) => {
    const override = overrides.get(plan.id);
    if (!override) return plan;
    return {
      ...plan,
      ...(override.name !== undefined ? { name: override.name } : {}),
      ...(override.price !== undefined ? { price: override.price } : {}),
      ...(override.cadence !== undefined
        ? { cadence: override.cadence }
        : {}),
      ...(override.tagline !== undefined
        ? { tagline: override.tagline }
        : {}),
      ...(override.bestFor !== undefined
        ? { bestFor: override.bestFor }
        : {}),
      ...(override.features !== undefined
        ? { features: override.features }
        : {}),
      ...(override.featured !== undefined
        ? { featured: override.featured }
        : {}),
      cta: {
        ...plan.cta,
        ...(override.ctaLabel !== undefined
          ? { label: override.ctaLabel }
          : {}),
      },
    };
  });
}

export function getAdminFeedbackEntries(): FeedbackEntry[] {
  const store = readAdminStore();
  const overrides = new Map(store.feedback.map((item) => [item.id, item]));
  const builtIns = builtInFeedback()
    .filter((item) => !store.hiddenFeedbackIds.includes(item.id))
    .map((item) => ({
      ...item,
      ...(overrides.get(item.id) ?? {}),
      isBuiltIn: true,
    }));
  const custom = store.feedback
    .filter((item) => !item.id.startsWith("built-in-"))
    .map((item) => ({ ...item, isBuiltIn: false }));
  return [...builtIns, ...custom];
}

export function getPublicTestimonials(): Testimonial[] {
  return getAdminFeedbackEntries()
    .filter((item) => item.published)
    .map((item) => ({
      quote: item.quote,
      name: item.name,
      role: item.role,
      ...(item.company ? { company: item.company } : {}),
      ...(item.service ? { service: item.service } : {}),
      ...(item.outcome ? { outcome: item.outcome } : {}),
      ...(item.rating ? { rating: item.rating } : {}),
      ...(item.photo ? { photo: item.photo } : {}),
    }));
}
