import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import SpecTable from '@/components/SpecTable';
import { Section, Eyebrow, Breadcrumb, InstrumentCard, SectionHead } from '@/components/ui';
import { getInstrument, getInstruments, getCategories } from '@/lib/content';

export const revalidate = 300;

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const instruments = await getInstruments();
  return instruments.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const instrument = await getInstrument(params.slug);
  if (!instrument) return { title: 'Instrument not found' };
  return { title: instrument.name, description: instrument.summary };
}

export default async function InstrumentPage({ params }: Params) {
  const instrument = await getInstrument(params.slug);
  if (!instrument) notFound();

  const [all, categories] = await Promise.all([getInstruments(), getCategories()]);
  const category = categories.find((c) => c.slug === instrument.categorySlug);
  const related = all
    .filter((i) => i.categorySlug === instrument.categorySlug && i.slug !== instrument.slug)
    .slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: instrument.name,
    description: instrument.summary,
    category: category?.name,
    brand: { '@type': 'Brand', name: 'CORE Instrumentation & Monitoring' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <section className="bg-petrol text-white">
        <div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
          <Breadcrumb
            items={[
              { href: '/instruments', label: 'Instruments' },
              { href: `/instruments#${instrument.categorySlug}`, label: category?.name || 'Category' },
              { label: instrument.name },
            ]}
          />
          <Eyebrow tone="muted">{category?.name}</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[42px]">
            {instrument.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#B9C7CE]">
            {instrument.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/contact?instrument=${instrument.slug}`}
              className="rounded-lg bg-ember px-5 py-3 text-[14.5px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#E06414]"
            >
              Request a quote
            </Link>
            {instrument.datasheetUrl && (
              <a
                href={instrument.datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-line px-5 py-3 text-[14.5px] text-white transition-colors hover:border-slate-light"
              >
                Datasheet (PDF)
              </a>
            )}
            {instrument.manualUrl && (
              <a
                href={instrument.manualUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-line px-5 py-3 text-[14.5px] text-white transition-colors hover:border-slate-light"
              >
                Installation manual
              </a>
            )}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="space-y-10">
              {instrument.measures && (
                <div>
                  <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ember-text">
                    What it measures
                  </h2>
                  <p className="mt-3 text-[16.5px] leading-relaxed text-ink">{instrument.measures}</p>
                </div>
              )}

              {instrument.description && (
                <div>
                  <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ember-text">
                    How it works
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-secondary">
                    {instrument.description}
                  </p>
                </div>
              )}

              {instrument.features && instrument.features.length > 0 && (
                <div>
                  <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ember-text">
                    Features
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {instrument.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-secondary">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {instrument.applications && instrument.applications.length > 0 && (
                <div>
                  <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ember-text">
                    Typical applications
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {instrument.applications.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-paper-strong bg-white px-3.5 py-1.5 text-[13.5px] text-ink-secondary"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={90}>
            {instrument.specs && instrument.specs.length > 0 && (
              <SpecTable specs={instrument.specs} />
            )}
            <div className="mt-8 rounded-xl border border-paper-line bg-white p-6">
              <p className="text-[14.5px] leading-relaxed text-ink-secondary">
                Need this calibrated to a specific range, or on rental for a construction phase?
                Tell us the application and we will specify it properly.
              </p>
              <Link
                href={`/contact?instrument=${instrument.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ember-text"
              >
                Ask about {instrument.name} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="white">
          <Reveal>
            <SectionHead eyebrow="Same category" title={`More in ${category?.name ?? 'this category'}`} />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 60}>
                <InstrumentCard instrument={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
