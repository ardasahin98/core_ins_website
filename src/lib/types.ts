/** Shared content types. These mirror the Firestore documents exactly —
 *  see firebase/schema.md. */

export type Sector = {
  slug: string;
  name: string;
  /** one line, used on the homepage grid */
  summary: string;
  /** longer intro on the sector page */
  intro?: string;
  /** what typically gets measured here — drives the "what we monitor" list */
  measures?: string[];
  /** instrument slugs commonly used on this sector */
  instrumentSlugs?: string[];
  heroImage?: string;
  order?: number;
  published?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  location?: string;
  country?: string;
  year?: number;
  sectorSlugs: string[];
  summary: string;
  /** the three-part story: what the problem was, what we installed, what happened */
  challenge?: string;
  solution?: string;
  outcome?: string;
  /** headline figures, e.g. { label: 'Sensors installed', value: '480' } */
  stats?: { label: string; value: string }[];
  instrumentSlugs?: string[];
  images?: string[];
  heroImage?: string;
  featured?: boolean;
  published?: boolean;
};

export type InstrumentSpec = {
  label: string;
  /** metric value as written, e.g. "0–350 kPa" */
  value: string;
  /** optional imperial equivalent, shown when the user toggles units */
  imperial?: string;
};

export type Instrument = {
  slug: string;
  name: string;
  categorySlug: string;
  summary: string;
  description?: string;
  /** what it measures, in plain words */
  measures?: string;
  applications?: string[];
  specs?: InstrumentSpec[];
  features?: string[];
  /** Firebase Storage download URLs */
  datasheetUrl?: string;
  manualUrl?: string;
  images?: string[];
  heroImage?: string;
  rentable?: boolean;
  order?: number;
  published?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  summary?: string;
  order?: number;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  bullets?: string[];
  order?: number;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  location?: string;
  order?: number;
  published?: boolean;
};

export type Inquiry = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  projectType?: string;
  message: string;
  instrumentSlugs?: string[];
  attachmentPath?: string;
  createdAt?: string;
  source?: string;
};
