import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import {
  Section, Eyebrow, Breadcrumb, ProjectCard, InstrumentCard, SectionHead,
} from '@/components/ui';
import {
  getSector, getSectors, getProjectsBySector, getInstrumentsBySlugs,
} from '@/lib/content';

export const revalidate = 300;

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const sectors = await getSectors();
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const sector = await getSector(params.slug);
  if (!sector) return { title: 'Sector not found' };
  return { title: sector.name, description: sector.summary };
}

export default async function SectorPage({ params }: Params) {
  const sector = await getSector(params.slug);
  if (!sector) notFound();

  const [projects, instruments] = await Promise.all([
    getProjectsBySector(sector.slug),
    getInstrumentsBySlugs(sector.instrumentSlugs),
  ]);

  return (
    <>
      <section className="bg-petrol text-white">
        <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
          <Breadcrumb items={[{ href: '/sectors', label: 'Sectors' }, { label: sector.name }]} />
          <Eyebrow tone="muted">Sector</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">
            {sector.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#B9C7CE]">
            {sector.intro || sector.summary}
          </p>
        </div>
      </section>

      {sector.measures && sector.measures.length > 0 && (
        <Section tone="white">
          <Reveal>
            <SectionHead eyebrow="What we measure" title="The quantities that matter here" />
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
            {sector.measures.map((m, i) => (
              <Reveal as="li" key={m} delay={i * 50}>
                <div className="flex h-full items-center gap-3 bg-white px-6 py-5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  <span className="text-[15px] text-ink-secondary">{m}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Completed projects"
            title={`${sector.name} — what we have done`}
            lead={
              projects.length
                ? 'Open a project for the scheme, the instruments and the outcome.'
                : 'Projects for this sector will appear here as they are added in Firebase.'
            }
          />
        </Reveal>
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-paper-strong bg-white/60 px-8 py-14 text-center text-ink-muted">
            No projects published in this sector yet.
          </div>
        )}
      </Section>

      {instruments.length > 0 && (
        <Section tone="white">
          <Reveal>
            <SectionHead
              eyebrow="Typical instruments"
              title="What we usually install here"
              lead="A starting point, not a shopping list — the scheme depends on the ground and the risk."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {instruments.map((instrument, i) => (
              <Reveal key={instrument.slug} delay={i * 60}>
                <InstrumentCard instrument={instrument} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <Reveal>
          <div className="rounded-3xl border border-paper-line bg-white px-8 py-12 text-center md:px-14">
            <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em] sm:text-[30px]">
              Working on a {sector.name.toLowerCase()} project?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-ink-secondary">
              Send us the drawings or the permit conditions and we will propose a scheme.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block rounded-lg bg-ember px-6 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#B94D0C]"
            >
              Request a quote
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
