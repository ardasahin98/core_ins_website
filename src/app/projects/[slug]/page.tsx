import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { Section, Eyebrow, Breadcrumb, InstrumentCard, SectionHead } from '@/components/ui';
import { getProject, getProjects, getInstrumentsBySlugs, getSectors } from '@/lib/content';

export const revalidate = 300;

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: 'Project not found' };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const [instruments, sectors] = await Promise.all([
    getInstrumentsBySlugs(project.instrumentSlugs),
    getSectors(),
  ]);
  const projectSectors = sectors.filter((s) => project.sectorSlugs?.includes(s.slug));

  const STORY: { label: string; body?: string }[] = [
    { label: 'The challenge', body: project.challenge },
    { label: 'What we installed', body: project.solution },
    { label: 'The outcome', body: project.outcome },
  ];

  return (
    <>
      <section className="bg-petrol text-white">
        <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
          <Breadcrumb items={[{ href: '/projects', label: 'Projects' }, { label: project.title }]} />
          <Eyebrow tone="muted">
            {[project.location, project.country, project.year].filter(Boolean).join(' · ')}
          </Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#B9C7CE]">{project.summary}</p>

          {projectSectors.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {projectSectors.map((s) => (
                <Link
                  key={s.slug}
                  href={`/sectors/${s.slug}`}
                  className="rounded-full border border-slate-line px-3.5 py-1.5 text-[13px] text-[#B9C7CE] transition-colors hover:border-slate-light hover:text-white"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          )}

          {project.stats && project.stats.length > 0 && (
            <dl className="mt-12 grid gap-8 sm:grid-cols-3">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <dd className="tnum font-display text-[32px] font-semibold leading-none text-white">
                    {s.value}
                  </dd>
                  <dt className="mt-2.5 text-[12px] uppercase tracking-[0.12em] text-[#8FA3AD]">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-3">
          {STORY.map((part, i) => (
            <Reveal key={part.label} delay={i * 80}>
              <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ember-text">
                {part.label}
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-secondary">
                {part.body || 'To be written — add this in Firebase.'}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {instruments.length > 0 && (
        <Section>
          <Reveal>
            <SectionHead eyebrow="On this project" title="Instruments used" />
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
    </>
  );
}
