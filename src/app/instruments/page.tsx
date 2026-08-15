import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { Section, SectionHead, InstrumentCard, Eyebrow } from '@/components/ui';
import { getInstruments, getCategories } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Instruments',
  description:
    'Piezometers, inclinometers, extensometers, load cells, strain gauges, total stations, GNSS, vibration monitors and dataloggers.',
};

export default async function InstrumentsPage() {
  const [instruments, categories] = await Promise.all([getInstruments(), getCategories()]);

  return (
    <>
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Instruments"
            title="The catalogue"
            lead="Everything here is supplied calibrated, with certificates, and most of it is available for rental on construction-phase work. Specifications can be read in metric or imperial."
          />
        </Reveal>

        {/* jump links — a plain anchor list beats a filter widget for a
            catalogue this size, and it works without JavaScript */}
        <Reveal>
          <nav aria-label="Categories" className="mb-14 flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-paper-strong bg-white px-4 py-2 text-[13.5px] text-ink-secondary transition-colors hover:border-slate/45 hover:text-ink"
              >
                {c.name}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="space-y-20">
          {categories.map((category) => {
            const items = instruments.filter((i) => i.categorySlug === category.slug);
            if (!items.length) return null;
            return (
              <div key={category.slug} id={category.slug} className="scroll-mt-28">
                <Reveal>
                  <div className="mb-8 border-b border-paper-line pb-5">
                    <Eyebrow>{`0${(category.order ?? 0)}`.slice(-2)}</Eyebrow>
                    <h2 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em]">
                      {category.name}
                    </h2>
                    {category.summary && (
                      <p className="mt-2 text-[15.5px] text-ink-secondary">{category.summary}</p>
                    )}
                  </div>
                </Reveal>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((instrument, i) => (
                    <Reveal key={instrument.slug} delay={i * 60}>
                      <InstrumentCard instrument={instrument} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
