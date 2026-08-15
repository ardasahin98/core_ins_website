# Firestore schema

One rule throughout: **the document ID is the `slug`**, and the slug is also stored as a
field. That makes every URL stable, makes re-seeding idempotent, and makes a future admin
app trivial to write.

Every public collection has a `published: boolean`. The security rules only allow public
reads of `published == true`, so unpublished documents are genuinely private drafts, not
hidden-by-convention.

---

## `sectors/{slug}`

The six markets. A sector page lists what gets measured there, its projects, and the
instruments typically used.

| Field             | Type       | Notes                                              |
| ----------------- | ---------- | -------------------------------------------------- |
| `slug`            | string     | e.g. `dams` — also the document ID                  |
| `name`            | string     | "Dams & Reservoirs"                                 |
| `summary`         | string     | One line, used on the cards                         |
| `intro`           | string     | Longer opening paragraph on the sector page         |
| `measures`        | string[]   | Quantities measured in this sector                  |
| `instrumentSlugs` | string[]   | References into `instruments`                       |
| `heroImage`       | string     | Storage download URL                                |
| `order`           | number     | Display order                                       |
| `published`       | boolean    |                                                     |

## `projects/{slug}`

The credibility engine. Keep the three-part story filled in — it is what turns a gallery
into a case study.

| Field             | Type                              | Notes                          |
| ----------------- | --------------------------------- | ------------------------------ |
| `slug`            | string                            |                                |
| `title`           | string                            |                                |
| `client`          | string                            | Omit if under NDA              |
| `location`        | string                            | City or region                 |
| `country`         | string                            |                                |
| `year`            | number                            | Sorts newest first             |
| `sectorSlugs`     | string[]                          | A project can sit in several   |
| `summary`         | string                            | Card and hero text             |
| `challenge`       | string                            | What the problem was           |
| `solution`        | string                            | What we installed and why      |
| `outcome`         | string                            | What the client got out of it  |
| `stats`           | `{ label, value }[]`              | Three reads best               |
| `instrumentSlugs` | string[]                          |                                |
| `heroImage`       | string                            | Storage URL, 16:10             |
| `images`          | string[]                          |                                |
| `featured`        | boolean                           | Shown on the homepage          |
| `published`       | boolean                           |                                |

## `instruments/{slug}`

| Field          | Type                                        | Notes                              |
| -------------- | ------------------------------------------- | ---------------------------------- |
| `slug`         | string                                      |                                    |
| `name`         | string                                      |                                    |
| `categorySlug` | string                                      | → `categories`                     |
| `summary`      | string                                      | Card text                          |
| `measures`     | string                                      | Plain-language "what it measures"  |
| `description`  | string                                      | How it works                       |
| `applications` | string[]                                    |                                    |
| `features`     | string[]                                    |                                    |
| `specs`        | `{ label, value, imperial? }[]`             | `imperial` powers the unit toggle  |
| `datasheetUrl` | string                                      | Storage URL to the PDF             |
| `manualUrl`    | string                                      |                                    |
| `heroImage`    | string                                      |                                    |
| `images`       | string[]                                    |                                    |
| `rentable`     | boolean                                     | Shows the "Rental" tag             |
| `order`        | number                                      |                                    |
| `published`    | boolean                                     |                                    |

**On `specs.imperial`:** fill it in. US clients read instrumentation specs in psi, feet and
inches; the rest of the continent does not. A row without an imperial value simply shows
the metric one in both modes, so it degrades safely — but every row you fill in is one less
conversion an American engineer has to do while comparing you to a competitor.

## `categories/{slug}`

`slug`, `name`, `summary`, `order`. Public read, no `published` flag.

## `services/{slug}`

`slug`, `name`, `summary`, `bullets: string[]`, `order`.

## `team/{slug}`

`slug`, `name`, `role`, `bio`, `photo` (Storage URL), `location`, `order`, `published`.

## `inquiries/{auto-id}`

Written by the site, never read by it.

| Field             | Type      | Notes                                  |
| ----------------- | --------- | -------------------------------------- |
| `name`            | string    | required                               |
| `email`           | string    | required, validated in the rules       |
| `company`         | string    |                                        |
| `phone`           | string    |                                        |
| `country`         | string    |                                        |
| `projectType`     | string    |                                        |
| `message`         | string    | required                               |
| `instrumentSlugs` | string[]  | Set when the request came from a product page |
| `attachmentPath`  | string    | Storage path of an uploaded spec / BOQ |
| `source`          | string    | `website`                              |
| `createdAt`       | string    | ISO timestamp from the server route    |
| `status`          | string    | `new` → your own workflow              |

Reads are admin-only. Give yourself the claim once:

```js
// one-off, with the Admin SDK
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

---

## Storage layout

```
instruments/{slug}/datasheet.pdf
instruments/{slug}/manual.pdf
instruments/{slug}/images/01.jpg
projects/{slug}/images/01.jpg
team/{slug}.jpg
inquiries/{inquiryId}/{filename}      ← write-only from the public form
```

Images: upload at 2000px on the long edge, JPEG, and let the site scale them down. Datasheets
as PDF/A if the parent company produces them that way — it is what procurement teams archive.

---

## Indexes

Nothing custom is needed yet. The site fetches whole collections filtered by `published` and
sorts in memory, which is correct at this size — a few hundred documents at most. If the
instrument catalogue grows past a thousand, add a composite index on
`(published, categorySlug, order)` and paginate; not before.
