/**
 * Push the local seed JSON into Firestore.
 *
 *   1. Firebase console → Project settings → Service accounts → Generate key
 *   2. Save it as firebase/serviceAccountKey.json  (git-ignored)
 *   3. npm run seed
 *
 * Safe to re-run: documents are written by slug, so it updates in place
 * rather than duplicating. It never deletes anything.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const here = dirname(fileURLToPath(import.meta.url));
const seedDir = join(here, '..', 'src', 'content', 'seed');
const keyPath = join(here, 'serviceAccountKey.json');

function credentials() {
  if (existsSync(keyPath)) return JSON.parse(readFileSync(keyPath, 'utf8'));
  if (process.env.FIREBASE_SERVICE_ACCOUNT) return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  console.error(
    'No credentials found.\n' +
    `Put a service account key at ${keyPath}, or set FIREBASE_SERVICE_ACCOUNT.`,
  );
  process.exit(1);
}

initializeApp({ credential: cert(credentials()) });
const db = getFirestore();

const COLLECTIONS = [
  ['categories',  'categories.json'],
  ['services',    'services.json'],
  ['sectors',     'sectors.json'],
  ['instruments', 'instruments.json'],
  ['projects',    'projects.json'],
  ['team',        'team.json'],
];

for (const [name, file] of COLLECTIONS) {
  const rows = JSON.parse(readFileSync(join(seedDir, file), 'utf8'));
  const batch = db.batch();
  for (const row of rows) {
    if (!row.slug) throw new Error(`${file}: every document needs a slug`);
    batch.set(db.collection(name).doc(row.slug), { published: true, ...row }, { merge: true });
  }
  await batch.commit();
  console.log(`${name.padEnd(12)} ${rows.length} documents written`);
}

console.log('\nDone. Set NEXT_PUBLIC_FIREBASE_* in .env.local and the site reads Firestore instead of the seed files.');
process.exit(0);
