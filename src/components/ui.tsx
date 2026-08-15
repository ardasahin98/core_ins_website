import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Instrument, Project, Sector } from '@/lib/types';
import { firebaseEnabled } from '@/lib/firebase';

/* ------------------------------------------------------------------ shell */

export function Section({
  children, className = '', tone = 'paper',
}: { children: ReactNode; className?: string; tone?: 'paper' | 'white' | 'petrol' }) {
  const bg =
    tone === 'petrol' ? 'bg-petrol text-white' : tone === 'white' ? 'bg-white' : 'bg-paper';
  return (
    <section className={`${bg} ${className}`}>
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-24">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = 'ember' }: { children: ReactNode; tone?: 'ember' | 'muted' }) {
  return (
    <p
      className={`text-[11.5px] font-semibold uppercase tracking-[0.17em] ${
        tone === 'ember' ? 'text-ember-text' : 'text-ink-muted'
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow, title, lead, action,
}: { eyebrow?: string; title: string; lead?: string; action?: ReactNode }) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[36px]">
          {title}
        </h2>
        {lead && <p className="mt-4 text-[16.5px] leading-relaxed text-ink-secondary">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ember-text"
    >
      {children}
      <span className="transition-transform duration-200 ease-core group-hover:translate-x-0.5" aria-hidden>
        →
      </span>
    </Link>
  );
}

/** Shown site-wide while the site is still running on the local seed files. */
export function PlaceholderNotice() {
  if (firebaseEnabled) return null;
  return (
    <div className="bg-status-notice/12 border-b border-status-notice/30 px-5 py-2 text-center text-[12.5px] text-[#7A4E00]">
      Showing placeholder content — Firebase is not connected yet. Fill in{' '}
      <code className="font-mono">.env.local</code> and run <code className="font-mono">npm run seed</code>.
    </div>
  );
}

/* ------------------------------------------------------------------ cards */

export function SectorCard({ sector, delay = 0 }: { sector: Sector; delay?: number }) {
  return (
    <Link
      href={`/sectors/${sector.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-paper-line bg-white p-7 transition-all duration-300 ease-core hover:-translate-y-1 hover:border-slate/35 hover:shadow-[0_18px_40px_-24px_rgba(22,36,44,0.45)]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div>
        <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em]">{sector.name}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-secondary">{sector.summary}</p>
      </div>
      <span className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ember-text">
        Projects &amp; instruments
        <span className="transition-transform duration-200 ease-core group-hover:translate-x-1" aria-hidden>→</span>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border-[10px] border-paper-line/45 transition-transform duration-500 ease-core group-hover:scale-110"
      />
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-paper-line bg-white transition-all duration-300 ease-core hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(22,36,44,0.45)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-petrol">
        {project.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.heroImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 ease-core group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[12px] uppercase tracking-[0.15em] text-[#5A7481]">
            Project photo
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12px] uppercase tracking-[0.13em] text-ink-muted">
          {[project.country, project.year].filter(Boolean).join(' · ')}
        </p>
        <h3 className="mt-2.5 font-display text-[18.5px] font-semibold leading-snug tracking-[-0.01em]">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[14.5px] leading-relaxed text-ink-secondary">
          {project.summary}
        </p>
        {project.stats && project.stats.length > 0 && (
          <dl className="mt-5 flex gap-6 border-t border-paper-line pt-4">
            {project.stats.slice(0, 2).map((s) => (
              <div key={s.label}>
                <dd className="tnum font-display text-[19px] font-semibold text-petrol">{s.value}</dd>
                <dt className="mt-0.5 text-[11.5px] uppercase tracking-[0.1em] text-ink-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Link>
  );
}

export function InstrumentCard({ instrument }: { instrument: Instrument }) {
  return (
    <Link
      href={`/instruments/${instrument.slug}`}
      className="group flex flex-col rounded-xl border border-paper-line bg-white p-6 transition-all duration-300 ease-core hover:-translate-y-1 hover:border-slate/30 hover:shadow-[0_16px_34px_-24px_rgba(22,36,44,0.45)]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-[17px] font-semibold leading-snug tracking-[-0.01em]">
          {instrument.name}
        </h3>
        {instrument.rentable && (
          <span className="shrink-0 rounded-full border border-paper-strong px-2.5 py-1 text-[10.5px] uppercase tracking-[0.1em] text-ink-muted">
            Rental
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-secondary">{instrument.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ember-text">
        Specifications
        <span className="transition-transform duration-200 ease-core group-hover:translate-x-1" aria-hidden>→</span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------- misc */

export function StatBand({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-slate-line bg-slate-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="bg-petrol px-7 py-8">
          <dd className="tnum font-display text-[34px] font-semibold leading-none text-white">{s.value}</dd>
          <dt className="mt-3 text-[12.5px] uppercase tracking-[0.12em] text-[#8FA3AD]">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-ink-muted">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2 text-paper-strong">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-ink">{item.label}</Link>
          ) : (
            <span className="text-ink-secondary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
