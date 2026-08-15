import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { Section, SectionHead, Eyebrow, StatBand } from '@/components/ui';
import { getTeam } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Company',
  description:
    'CORE Instrumentation & Monitoring — the Americas branch of an established Ankara instrumentation company.',
};

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <section className="bg-petrol text-white">
        <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
          <Eyebrow tone="muted">Company</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">
            New here. Not new at this.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#B9C7CE]">
            CORE Instrumentation &amp; Monitoring is the North and South America arm of
            [PARENT COMPANY NAME], founded in Ankara in [YEAR]. The instruments, the methods
            and the engineers behind them have [XX] years of dams, tunnels and tailings
            behind them — what is new is the address.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[32px]">
              Why we opened in the Americas
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-5 text-[16.5px] leading-relaxed text-ink-secondary">
              <p>
                PLACEHOLDER — two or three paragraphs on why the branch exists. What the parent
                company saw in the region, what clients here were missing, and what you intend
                to do differently. Write it in first person; it reads as more honest than
                corporate third person, and buyers in this industry can tell.
              </p>
              <p>
                PLACEHOLDER — mention the practical things a client cares about: where your
                stock and crews are based, response times, which countries you are set up to
                invoice and work in.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="bg-paper">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal>
            <StatBand
              items={[
                { value: '[YEAR]', label: 'Parent company founded' },
                { value: '[XX]', label: 'Years in instrumentation' },
                { value: '[XXX]', label: 'Projects delivered' },
                { value: '[XX]', label: 'Countries worked in' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- values */}
      <Section tone="white">
        <div id="values" className="scroll-mt-28">
          <Reveal>
            <SectionHead
              eyebrow="Core values"
              title="What we will not trade away"
              lead="This section is deliberately empty. Values written to fill a page are worthless; these will be written properly, and each one will be specific enough that you could catch us breaking it."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <Reveal key={n} delay={i * 60}>
                <div className="flex h-full min-h-[190px] flex-col rounded-2xl border border-dashed border-paper-strong bg-paper/60 p-7">
                  <span className="tnum font-mono text-[12px] text-ink-muted">
                    {String(n).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-[18px] font-semibold text-ink-muted">
                    Value {n}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                    To be written — one sentence stating the value, one stating the behaviour it
                    demands when it is inconvenient.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- team */}
      <Section>
        <div id="team" className="scroll-mt-28">
          <Reveal>
            <SectionHead
              eyebrow="Team"
              title="The people you will actually deal with"
              lead="Instrumentation is bought from people. Names, faces and direct experience matter more here than a company boilerplate."
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.slug} delay={i * 70}>
                <div className="h-full overflow-hidden rounded-2xl border border-paper-line bg-white">
                  <div className="aspect-[4/5] bg-petrol">
                    {member.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.photo} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[11.5px] uppercase tracking-[0.14em] text-[#5A7481]">
                        Photo
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-[17px] font-semibold">{member.name}</h3>
                    <p className="mt-1 text-[13.5px] text-ember-text">{member.role}</p>
                    {member.bio && (
                      <p className="mt-3 text-[14px] leading-relaxed text-ink-secondary">{member.bio}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------- credentials */}
      <Section tone="white">
        <Reveal>
          <SectionHead
            eyebrow="Credentials"
            title="The paperwork clients ask for before the first meeting"
            lead="Fill these in as they are issued — public agencies and tier-one contractors check them early, and an empty answer costs you the bid."
          />
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Quality management', 'ISO 9001 — [certificate number]'],
            ['Insurance', 'General liability and professional indemnity — [limits]'],
            ['US federal registration', 'SAM.gov UEI — [number], W-9 on request'],
            ['Safety record', 'EMR [value], [safety programme]'],
            ['Bonding', '[Bonding capacity, if applicable]'],
            ['Memberships', '[Industry bodies and associations]'],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={(i % 3) * 60}>
              <div className="h-full bg-white p-7">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {title}
                </h3>
                <p className="mt-2.5 text-[15px] text-ink-secondary">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 text-center text-[15px] text-ink-secondary">
            Need a document for prequalification?{' '}
            <Link href="/contact" className="font-medium text-ember-text">Ask us directly</Link>.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
