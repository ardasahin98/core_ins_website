import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { Section, SectionHead, Eyebrow } from '@/components/ui';
import { getServices } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Monitoring design, instrument supply and rental, installation and commissioning, managed monitoring, maintenance and calibration.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="bg-petrol text-white">
        <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
          <Eyebrow tone="muted">Services</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">
            From the monitoring plan to the last reading
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#B9C7CE]">
            You can buy any part of this on its own. Most clients take the whole chain,
            because that is where the accountability stops moving between companies.
          </p>
        </div>
      </section>

      <Section>
        <div className="space-y-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <div className="grid gap-6 bg-white p-8 md:grid-cols-[auto_1fr_1fr] md:gap-10 md:p-10">
                <span className="tnum font-mono text-[12.5px] text-ink-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-display text-[22px] font-semibold tracking-[-0.015em]">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-secondary">
                    {service.summary}
                  </p>
                </div>
                {service.bullets && service.bullets.length > 0 && (
                  <ul className="space-y-2.5 md:border-l md:border-paper-line md:pl-10">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-secondary">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHead
            eyebrow="How an engagement usually runs"
            title="Four steps, and you own the data at every one"
          />
        </Reveal>
        <ol className="grid gap-5 md:grid-cols-4">
          {[
            ['Scope', 'We read the drawings, the ground investigation and the permit conditions, and propose what to measure and why.'],
            ['Install', 'Our crews install and commission, and hand over baseline readings with the certificates behind them.'],
            ['Monitor', 'Data collects automatically into the platform. Thresholds are already set, so alarms mean something.'],
            ['Report', 'Scheduled reporting in your format, plus a person who answers the phone when a level is crossed.'],
          ].map(([title, body], i) => (
            <Reveal as="li" key={title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-paper-line bg-paper p-7">
                <span className="tnum font-mono text-[12px] text-ember-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[18px] font-semibold">{title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-secondary">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-ember px-7 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#B94D0C]"
            >
              Talk to us about a project
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
