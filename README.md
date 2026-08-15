# CORE Instrumentation & Monitoring — website

Next.js 14 (App Router) + TypeScript + Tailwind, with all content in Firebase.

The site runs **before Firebase exists**: every content read falls back to the JSON in
`src/content/seed/`, and a banner across the top tells you it is doing so. That means you
can design, review and demo today, and switch to live content by filling in one env file.

---

## Run it

```bash
npm install
cp .env.example .env.local     # can stay empty for now
npm run dev                    # http://localhost:3000
```

Node 18.17+ or 20+.

## Connect Firebase

1. Create a Firebase project (no billing needed to start; Firestore in production mode).
2. Add a **Web app** in project settings, copy the config values into `.env.local`:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=…
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=…
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=…
   NEXT_PUBLIC_FIREBASE_APP_ID=…
   NEXT_PUBLIC_PLATFORM_URL=https://your-platform/login
   ```

   These keys are safe to expose — they identify the project, they do not grant access.
   Access is controlled by the rules below.

3. Publish the security rules:

   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

   (`firebase/firestore.rules` and `firebase/storage.rules`.)

4. Load the placeholder content so the collections exist with the right shape:

   ```bash
   # Project settings → Service accounts → Generate new private key
   # save as firebase/serviceAccountKey.json  (git-ignored)
   npm run seed
   ```

5. Restart `npm run dev`. The placeholder banner disappears and the site is reading Firestore.

### Editing content

Day to day, edit documents in the **Firebase console** → Firestore. Set `published: false`
to hide something without deleting it — the rules stop unpublished documents being read
publicly, so drafts are genuinely private.

A small admin app is the obvious next step so non-technical staff never see the console.
The schema is designed for that: every document has a `slug` as its document ID.

---

## Content model

Full field list in [`firebase/schema.md`](firebase/schema.md). In short:

| Collection    | What it holds                                              |
| ------------- | ---------------------------------------------------------- |
| `sectors`     | The six markets. Each opens to its projects and instruments |
| `projects`    | Completed work — challenge / solution / outcome and stats   |
| `instruments` | Catalogue, with specs in metric and imperial                |
| `categories`  | Instrument grouping                                        |
| `services`    | What we do end to end                                       |
| `team`        | People on the About page                                    |
| `inquiries`   | Quote requests from the site (write-only from the public)   |

Files — datasheets, manuals, project photos, team photos — go in Firebase **Storage** and
you paste the download URL into the document. Paths are laid out in `storage.rules`.

---

## Pages

```
/                     home
/sectors              all six
/sectors/[slug]       sector → what we measure, its projects, typical instruments
/projects             all projects
/projects/[slug]      challenge / solution / outcome, stats, instruments used
/instruments          catalogue, grouped by category
/instruments/[slug]   specs with a metric/imperial toggle, datasheet links
/services             the five services and how an engagement runs
/platform             what the monitoring platform does + login button
/about                story, stats, EMPTY core values, team, credentials
/contact              quote request form (writes to Firestore)
/privacy /terms /accessibility   stubs — need real content before launch
```

Pages are statically generated and revalidated every 5 minutes (`export const revalidate`),
so Firestore is read on a schedule rather than on every visit. That keeps it fast and keeps
the bill near zero.

---

## The animations

Deliberately restrained — the Apple pattern of *content arrives once as you reach it*,
not parallax and not scroll-jacking.

- `Reveal` (`src/components/Reveal.tsx`) fades and lifts a block 18px the first time it
  enters the viewport, then **stops observing** so nothing re-animates on the way back up.
- The hero's ground strata drift a few pixels apart on scroll — one rAF-throttled listener
  writing a CSS variable, and it stops when the hero is off-screen.
- The logo's three arcs draw themselves in once on load.
- Everything is disabled by `prefers-reduced-motion`, and content is visible on first paint
  if JavaScript never runs.

If you want more, add it in `Reveal` and the hero — not scattered through the pages.

---

## Still to do before launch

- [ ] Replace every `PLACEHOLDER` and `[BRACKETED]` string — search the repo for both
- [ ] Write the **core values** (`src/app/about/page.tsx`) — the five cards are empty by design
- [ ] Real project photography, datasheets, team photos
- [ ] Parent company name, founding year, project counts
- [ ] Office addresses, phone numbers, email addresses
- [ ] Set `SITE_URL` in `src/app/layout.tsx` to the real domain
- [ ] Wire an email notification on new `inquiries` (Firestore trigger → SendGrid/Resend)
- [ ] Enable Firebase App Check so the inquiry endpoint cannot be scripted
- [ ] Legal pages reviewed by counsel per country (US, Canada, Brazil LGPD)
- [ ] Spanish translation — the content model is ready for it, see below

### Adding Spanish later

Nothing here blocks it. The route structure moves to `src/app/[locale]/…`, and each
Firestore document gains an `es` sub-object with the translatable fields (`name`,
`summary`, `intro`, `description`). Slugs stay shared so both languages point at the same
document. Doing it this way now would double the content work before you have any content,
which is why it is staged second.

---

## Design

Colours, type and the logo come from the brand pack in `../Brand`. Tokens are mirrored in
`tailwind.config.ts` and `src/app/globals.css` — change them in both, or import
`core-tokens.css` and drop the duplicates.

`preview/index.html` is a static design preview of the homepage that opens in any browser
with nothing installed. It is a mock-up for review, not the real site.
# core_ins_website
