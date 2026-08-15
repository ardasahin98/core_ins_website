import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, firebaseEnabled } from './firebase';
import type {
  Category, Instrument, Project, Sector, Service, TeamMember,
} from './types';

import sectorsSeed from '@/content/seed/sectors.json';
import projectsSeed from '@/content/seed/projects.json';
import instrumentsSeed from '@/content/seed/instruments.json';
import categoriesSeed from '@/content/seed/categories.json';
import servicesSeed from '@/content/seed/services.json';
import teamSeed from '@/content/seed/team.json';

/**
 * Every read goes through here.
 *
 * If Firebase is configured we read the collection; if not — or if the read
 * fails for any reason — we fall back to the JSON in src/content/seed.
 * That means the site is never broken by a Firebase outage or a missing key,
 * and it runs today with placeholder content before anything is uploaded.
 *
 * `publishedOnly` filters on the `published` flag. Collections that carry no
 * such flag (categories, services) pass false and are read whole — which
 * matches the security rules, where those two are world-readable.
 *
 * Pages using these are statically generated and revalidated (see each page's
 * `revalidate`), so a busy site does not hammer Firestore on every request.
 */
async function read<T>(
  name: string,
  seed: unknown,
  publishedOnly = true,
): Promise<T[]> {
  const fallback = seed as T[];
  if (!firebaseEnabled) return fallback;
  try {
    const store = db();
    if (!store) return fallback;
    const ref = collection(store, name);
    const snap = await getDocs(
      publishedOnly ? query(ref, where('published', '==', true)) : query(ref),
    );
    if (snap.empty) return fallback;
    return snap.docs.map((d) => d.data() as T);
  } catch (err) {
    console.warn(`[content] falling back to seed for "${name}"`, err);
    return fallback;
  }
}

type Sortable = { order?: number; name?: string; title?: string };

const bySortOrder = (a: Sortable, b: Sortable) =>
  (a.order ?? 999) - (b.order ?? 999) ||
  String(a.name ?? a.title ?? '').localeCompare(String(b.name ?? b.title ?? ''));

export async function getSectors(): Promise<Sector[]> {
  return (await read<Sector>('sectors', sectorsSeed)).sort(bySortOrder);
}

export async function getSector(slug: string): Promise<Sector | null> {
  return (await getSectors()).find((s) => s.slug === slug) ?? null;
}

export async function getProjects(): Promise<Project[]> {
  const all = await read<Project>('projects', projectsSeed);
  return all.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export async function getProject(slug: string): Promise<Project | null> {
  return (await getProjects()).find((p) => p.slug === slug) ?? null;
}

export async function getProjectsBySector(sectorSlug: string): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.sectorSlugs?.includes(sectorSlug));
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getInstruments(): Promise<Instrument[]> {
  return (await read<Instrument>('instruments', instrumentsSeed)).sort(bySortOrder);
}

export async function getInstrument(slug: string): Promise<Instrument | null> {
  return (await getInstruments()).find((i) => i.slug === slug) ?? null;
}

export async function getInstrumentsBySlugs(slugs: string[] = []): Promise<Instrument[]> {
  if (!slugs.length) return [];
  const all = await getInstruments();
  return slugs
    .map((s) => all.find((i) => i.slug === s))
    .filter((i): i is Instrument => Boolean(i));
}

/** No `published` flag on these two — they are world-readable by the rules. */
export async function getCategories(): Promise<Category[]> {
  return (await read<Category>('categories', categoriesSeed, false)).sort(bySortOrder);
}

export async function getServices(): Promise<Service[]> {
  return (await read<Service>('services', servicesSeed, false)).sort(bySortOrder);
}

export async function getTeam(): Promise<TeamMember[]> {
  return (await read<TeamMember>('team', teamSeed)).sort(bySortOrder);
}
