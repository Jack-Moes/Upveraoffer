# Upveraoffer

Company website for **Upveraoffer** — an end-to-end job search partner covering
résumé writing, interview preparation, and coding test coaching.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.
Deployed on Cloudflare Workers with Cloudflare D1 for durable admin data.

---

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build          # production build
npm start              # serve the production build
npm run lint           # eslint
npm run check:lang     # English-only check on tracked files and filenames
npm run check:lang:all # same, plus every commit message and file version
```

### English-only guard

This project is English-only, and that is enforced rather than assumed.
`npm run check:lang` scans every tracked file, filename, commit message and
historical file version for Hangul, Chinese and Japanese characters, and
fails with an exact file and line if it finds any. CI runs the deep version
on every push.

**Use this instead of grep.** Git Bash on Windows runs in a non-UTF-8 locale,
so `grep "[<hangul-range>]"` matches byte-wise rather than by character and
reports false positives on almost every file, binaries included. That is a
property of the shell, not of the repository.

The checker's own source is deliberately pure ASCII: it writes its character
ranges as backslash-u escape sequences rather than literal characters. If you
replace those with literals, the script will match its own source and fail on
every run.

---

## Editing the site content

**You almost never need to touch a page component to change copy.** All the
text lives in `src/content/`:

| File | Controls |
|---|---|
| `site.ts` | Company name, tagline, email, domain, social links, nav and footer menus |
| `services.ts` | The three service offerings and every detail page |
| `pricing.ts` | Packages, prices, the comparison table, pricing FAQ |
| `process.ts` | The four-stage process and the guiding principles |
| `faq.ts` | The FAQ page |
| `testimonials.ts` | Client results (currently empty — see below) |
| `blog/*.md` | Blog articles |

### Adding a blog post

Create a new `.md` file in `src/content/blog/`. The filename becomes the URL
(`my-post.md` → `/blog/my-post`). Start it with frontmatter:

```markdown
---
title: "Your headline"
description: "One sentence shown in listings and search results."
date: "2026-09-01"
category: "Interviews"
author: "Upveraoffer"
---

Your article in normal markdown.
```

Reading time is calculated automatically. The post appears in the blog index,
the home page teaser, and the sitemap with no other changes.

---

## Before you launch — required changes

Search the codebase for `PLACEHOLDER` and `TODO(founder)` and work through
each one. The important ones:

1. **`src/content/site.ts`** — set `url` to your real domain, `email` to a real
   inbox, and fix the LinkedIn/GitHub links. `legalName` must be your
   registered entity.
2. **`src/content/pricing.ts`** — every price is invented. Set real numbers.
3. **`src/app/about/page.tsx`** — replace the story paragraphs with your own,
   and add coach bios with real credentials. This is the strongest trust
   signal on the site.
4. **`src/app/privacy/page.tsx` and `src/app/terms/page.tsx`** — these are
   **starting drafts, not legal advice**. Have a lawyer in your jurisdiction
   review them before you take a single payment.
5. **Booking** — set `calcom` in `site.ts` to your Cal.com handle
   (`"username/event-slug"`). Until then `/book` shows a fallback that routes
   people to the contact form.
6. **Contact form** — see below.

### Testimonials

`src/content/testimonials.ts` is **intentionally empty**. Upveraoffer has no
client results yet, and publishing invented testimonials is dishonest and, in
most jurisdictions, unlawful advertising. `/success-stories` detects the empty
array and renders an honest "results publishing soon" state instead.

When you have real, permissioned client results, add them to that array and the
page switches to the full layout automatically.

---

## Contact form setup

The form at `/contact` posts to `src/app/api/contact/route.ts`. Every valid
message is saved to the private admin inbox. [Resend](https://resend.com) is
optional and adds an email notification.

1. Create a Resend account and verify your sending domain.
2. Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL="Upveraoffer <hello@yourdomain.com>"
CONTACT_TO_EMAIL=you@yourdomain.com
```

3. Upload the same three values as Cloudflare Worker secrets with Wrangler,
   then redeploy.

Until those are set, messages are still accepted and remain available in
`/admin`; only the email notification is skipped.

The route includes a honeypot field and a simple in-memory rate limit
(5 submissions per IP per hour). The rate limit resets on cold start and is
per-instance; move it to Cloudflare KV or Durable Objects if volume ever
justifies it.

---

## Admin dashboard

The private control center is available at `/admin`. It manages client
messages, consultation requests, prices, blog drafts and publishing, and
client feedback. It also shows integration status and launch-readiness
warnings. It is not linked from public navigation and is excluded from search
indexing.

Configure these server-only variables locally and as Cloudflare Worker secrets
before signing in:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=use-at-least-6-characters
ADMIN_SESSION_SECRET=use-a-random-32-character-secret
```

The dashboard uses a signed, HTTP-only, eight-hour session cookie. Login
attempts are rate limited. Do not commit real credentials.

Production admin changes and private submissions are stored in Cloudflare D1.
Local Next.js development uses `.data/control-center.json`, which is ignored
by Git. Local Wrangler development uses a local D1 database.

The `/book` page uses the built-in consultation request form when no Cal.com
handle is configured. Requests appear immediately in the admin booking
tracker, where they can be confirmed, completed, or cancelled.

---

## Project structure

```
src/
├─ app/                     Routes (App Router)
│  ├─ page.tsx              Home
│  ├─ layout.tsx            Shell, fonts, metadata, JSON-LD
│  ├─ globals.css           Design tokens + Tailwind theme
│  ├─ icon.svg              Favicon
│  ├─ opengraph-image.tsx   Generated social share card
│  ├─ sitemap.ts / robots.ts
│  ├─ admin/                 Protected operations dashboard
│  ├─ services/[slug]/      Service detail pages
│  ├─ blog/[slug]/          Blog posts
│  └─ api/contact/          Contact form handler
├─ components/
│  ├─ site/                 Header, Footer, Logo, forms, page blocks
│  └─ ui/                   Container, Section, Button primitives
├─ content/                 All editable copy (see table above)
└─ lib/                     Blog loader, helpers
```

### Design system

Colors, fonts, and radii are CSS custom properties defined once in
`src/app/globals.css` — light values on `:root`, dark overrides on `.dark`, and
both mapped into Tailwind via `@theme inline`. Use the semantic utilities
(`bg-surface`, `text-muted`, `border-border`, `text-primary`) rather than raw
color values, and the whole site restyles from one place.

Dark mode follows the system preference by default and can be overridden with
the header toggle; the choice persists in `localStorage`. An inline script in
`layout.tsx` applies it before first paint so there is no flash.

### Adding photography

The deployed Worker serves local image files directly, so photographs are
managed in the repository rather than uploaded through the admin dashboard.

1. Export the final image as WebP: 1600px wide for landscapes, 900x1200 for
   portraits, or 512x512 for avatars. Keep most files below 350 KB.
2. Put it in the matching directory under `public/images/` (`home`, `site`,
   `people`, `services`, `process`, `about`, `blog`, or `testimonials`).
3. Register permanent site imagery, alt text, and credit information in
   `src/content/images.ts`.
4. Add its production/source record to `public/images/CREDITS.md`.
5. Blog covers and testimonial portraits may then use the deployed
   `/images/...` path in Admin. Admin edits paths and metadata; it does not
   write binary files into an immutable Worker deployment.

Every responsive `Image` using `fill` must include an accurate `sizes` value.
Use a dedicated asset per placement rather than repeating a photograph across
unrelated pages.

---

## Deployment

The free production deployment runs on Cloudflare Workers. The first-time
setup is:

```bash
npx wrangler login
npx wrangler d1 migrations apply upveraoffer --remote
npx wrangler secret bulk .env.local
npm run deploy:cloudflare
```

For later releases, run `npm run deploy:cloudflare`. The production site is
`https://www.upveraoffer.workers.dev`; a custom domain can be attached
later.
