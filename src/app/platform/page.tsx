import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { Section, SectionHead, Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Monitoring platform',
  description:
    'Every instrument reports into one place: live readings, trigger levels, automatic alarms and scheduled reports.',
};

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || '#';

const FEATURES = [
  ['Live readings', 'Every sensor, current value and trend, on one screen — including the instruments that were installed years ago.'],
  ['Trigger levels', 'Alert and action levels drawn on the chart, agreed with you at the start, so a reading is interpreted the moment it arrives.'],
  ['Automatic alarms', 'SMS and email to the people on the distribution list, with escalation if nobody acknowledges.'],
  ['Validated data', 'Readings are checked against range, rate of change and sensor health before they become a number you act on.'],
  ['Reports', 'Scheduled reports in your format — including the ones the regulator wants, not just the ones we find easy.'],
  ['Export & API', 'Your data leaves in CSV or through an API whenever you want it. It is your record, not ours.'],
];

export default function PlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-petrol text-white">
        <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
          <Eyebrow tone="muted">The platform</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[48px]">
            The instruments are only half of it
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#B9C7CE]">
            A sensor that reports into a spreadsheet nobody opens is not monitoring.
            Everything we install feeds one platform, where the thresholds are already
            drawn and the alarm reaches a person.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-ember px-6 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#E06414]"
            >
              Platform login
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-slate-line px-6 py-3.5 text-[15px] text-white transition-colors hover:border-slate-light"
            >
              Request a demo
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-[#7C919B]">
            Existing client? Your login is the same one your project team issued.
          </p>
        </div>
      </section>

      <Section>
        <Reveal>
          <SectionHead
            eyebrow="What it does"
            title="Built around the moment a level is crossed"
            lead="Everything else on a monitoring screen is context for that one event."
          />
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([title, body], i) => (
            <Reveal key={title} delay={(i % 3) * 70}>
              <div className="h-full bg-white p-8">
                <h3 className="font-display text-[18px] font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-secondary">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHead
            eyebrow="Status levels"
            title="Four states, and they always mean the same thing"
            lead="These colours are reserved across everything we produce — the platform, the reports and this website — so an operator never has to re-learn them."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Normal', 'Within threshold', '#1F7A4D'],
            ['Notice', 'Approaching a trigger level', '#B87400'],
            ['Alert', 'Trigger level exceeded', '#C2410C'],
            ['Alarm', 'Action level exceeded or instrument fault', '#9B1C1C'],
          ].map(([name, meaning, colour], i) => (
            <Reveal key={name} delay={i * 60}>
              <div className="h-full rounded-xl border border-paper-line bg-paper p-6">
                <span className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: colour }} />
                  <span className="font-display text-[16px] font-semibold">{name}</span>
                </span>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-secondary">{meaning}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
