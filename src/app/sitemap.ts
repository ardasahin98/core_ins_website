import type { MetadataRoute } from 'next';
import { getSectors, getProjects, getInstruments } from '@/lib/content';

const BASE = 'https://www.core-im.com'; // TODO: real domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sectors, projects, instruments] = await Promise.all([
    getSectors(), getProjects(), getInstruments(),
  ]);

  const staticRoutes = [
    '', '/sectors', '/projects', '/instruments', '/services', '/platform', '/about', '/contact',
  ].map((path) => ({ url: `${BASE}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.8 }));

  return [
    ...staticRoutes,
    ...sectors.map((s) => ({ url: `${BASE}/sectors/${s.slug}`, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}`, priority: 0.6 })),
    ...instruments.map((i) => ({ url: `${BASE}/instruments/${i.slug}`, priority: 0.6 })),
  ];
}
