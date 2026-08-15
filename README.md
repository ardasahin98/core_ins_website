# CORE Instrumentation & Monitoring — website

Plain HTML, CSS and JavaScript. **No npm, no build step, no framework.**
Vercel serves the files exactly as they are, so a deploy cannot fail on a
compile error — there is nothing to compile.

## Run it locally

Double-click `index.html`, or — better, because the links are absolute:

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>. That is the same thing Vercel does.

## Deploy it

Push to GitHub and import the repo at vercel.com. When it asks for a framework,
choose **Other**, and leave the build command and output directory **empty**.
There is nothing to build.

`vercel.json` turns on clean URLs, so `/about.html` is served at `/about`.

---

## What is where

```
index.html          home
sectors.html        the six sectors
sector.html         one sector          /sector?s=dams
projects.html       all projects
project.html        one project         /project?p=metro-line-settlement
instruments.html    catalogue by category
instrument.html     one instrument      /instrument?i=vw-piezometer
services.html       the five services
platform.html       the monitoring platform + login button
about.html          story, values (empty), team, credentials
contact.html        quote request form
privacy / terms / accessibility        legal stubs — need real content
404.html

assets/core.css              all styling, one file
assets/core.js               behaviour and rendering, one file
assets/data.js               the placeholder content
assets/firebase-config.js    ← the only file you must edit to go live
assets/firestore.js          talks to Firestore over its REST API

brand/              logo, favicons, lockups
firebase/           security rules and the schema documentation
build.py            regenerates the .html files from shared templates
```

### About `build.py`

Every page shares a header, footer and `<head>`. Rather than copy that into 15
files and let them drift, `build.py` writes them. If you change the navigation
or the footer, edit `build.py` and run `python3 build.py`.

If you would rather not use it, that is fine — the `.html` files are ordinary
HTML and you can edit them directly. Just know that a change to the header then
has to be made in each file.

---

## Connecting Firebase

Until you do this, the site runs off `assets/data.js` and shows a banner saying
so. To go live with real content:

1. Create a Firebase project, and add a **Web app** in project settings.
2. Copy `projectId` and `apiKey` into `assets/firebase-config.js`.
3. Publish the rules — Firebase console → Firestore → Rules, paste in
   `firebase/firestore.rules`. Same for Storage with `firebase/storage.rules`.
4. Create the collections and add documents. Field names are in
   `firebase/schema.md`; the document ID must be the `slug`.

The two config values are safe to publish. They identify the project; they do
not grant access. Access is controlled by the rules, which allow the public to
read only documents marked `published: true`, and to create an inquiry but
never read one back.

**Getting the placeholder content into Firestore:** open `assets/data.js`, and
for each entry create a document in the matching collection with the document
ID set to that entry's `slug`. Tedious the first time; after that you are
editing real content, not seeding it.

### The quote form

Submissions are written straight to the `inquiries` collection from the
browser. That works because the rules allow create-but-not-read. To get an
email when one arrives, add a Firestore trigger in the Firebase console — or
just check the collection until the volume justifies more.

---

## Before you go live

- [ ] Replace every `PLACEHOLDER` and `[BRACKETED]` string — search the whole folder for both
- [ ] Write the **core values** — `about.html`, five cards, empty by design
- [ ] Real project photos, datasheets, team photos
- [ ] Parent company name, founding year, project counts
- [ ] Office addresses, phone numbers, email addresses
- [ ] `assets/firebase-config.js` — the platform login URL is in there too
- [ ] `robots.txt` — it currently blocks search engines **on purpose**, while the
      site is full of placeholder text. Delete the `Disallow` lines when ready.
- [ ] `sitemap.xml` — replace `www.yourdomain.com`
- [ ] Legal pages reviewed by counsel per country (US, Canada, Brazil LGPD)

---

## The animations

Content arrives once as it comes into view, and never re-animates on the way
back up. The hero's ground layers drift a few pixels apart as you scroll. The
logo's three arcs draw themselves in on load.

All of it is switched off by `prefers-reduced-motion`, and every page's content
is in the HTML, so nothing disappears if JavaScript fails. Worth keeping that
way: your users are often on a laptop in a site office on a bad connection.

## A known trade-off

The instrument and project lists are rendered by JavaScript from Firestore.
Google does execute JavaScript, but it indexes server-rendered text more
reliably. If organic search for specific instrument names becomes important,
the fix is to write those pages out as static HTML — `build.py` already has the
structure to do it.
