import type { Metadata } from 'next';
import { Suspense } from 'react';
import QuoteForm from '@/components/QuoteForm';
import { Section, Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Request a quote',
  description:
    'Send us the spec, the drawings or two lines about the problem, and we will come back with a scheme and a price.',
};

const OFFICES = [
  {
    label: 'Americas',
    lines: ['[STREET ADDRESS]', '[CITY, STATE / PROVINCE]', '[COUNTRY]'],
    phone: '[+1 XXX XXX XXXX]',
    email: '[americas@core-im.com]',
  },
  {
    label: 'Head office — Ankara',
    lines: ['[PARENT COMPANY NAME]', '[STREET ADDRESS]', 'Ankara, Türkiye'],
    phone: '[+90 XXX XXX XX XX]',
    email: '[info@parent-company.com]',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-petrol text-white">
        <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
          <Eyebrow tone="muted">Contact</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">
            Tell us what you need to measure
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#B9C7CE]">
            A drawing, a bill of quantities, a permit condition, or two lines about what is
            worrying you. Whichever you have is enough to start.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Suspense fallback={<div className="h-96 rounded-2xl bg-white/50" />}>
              <QuoteForm />
            </Suspense>
          </div>

          <aside className="space-y-8">
            {OFFICES.map((office) => (
              <div key={office.label} className="rounded-2xl border border-paper-line bg-white p-7">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                  {office.label}
                </h2>
                <address className="mt-3 not-italic text-[15px] leading-relaxed text-ink-secondary">
                  {office.lines.map((line) => <span key={line} className="block">{line}</span>)}
                </address>
                <dl className="mt-4 space-y-1.5 text-[15px]">
                  <div className="flex gap-2">
                    <dt className="text-ink-muted">Phone</dt>
                    <dd className="tnum text-ink">{office.phone}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-muted">Email</dt>
                    <dd className="text-ember-text">{office.email}</dd>
                  </div>
                </dl>
              </div>
            ))}

            <div className="rounded-2xl border border-paper-line bg-white p-7">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                Existing project with an alarm?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-secondary">
                Do not use this form. Call the 24-hour number issued with your monitoring plan,
                or log in to the platform and acknowledge the alarm there.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
