import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import {
  Section, SectionHead, SectorCard, ProjectCard, StatBand, TextLink, Eyebrow,
} from '@/components/ui';
import { getSectors, getFeaturedProjects, getServices } from '@/lib/content';

export const revalidate = 300; // rebuild content at most every 5 minutes

export default async function HomePage() {
  const [sectors, projects, services] = await Promise.all([
    getSectors(),
    getFeaturedProjects(3),
    getServices(),
  ]);

  return (
    <>
      <Hero />

      {/* ------------------------------------------------------- sectors */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Where we work"
            title="Six sectors, one discipline"
            lead="Every one of these is the same problem in a different shape: know what is moving, know how fast, and know before it matters. Open a sector to see the projects behind it."
            action={<TextLink href="/sectors">All sectors</TextLink>}
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <Reveal key={sector.slug} delay={i * 70}>
              <SectorCard sector={sector} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- what we do */}
      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>End to end</Eyebrow>
              <h2 className="mt-3 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[36px]">
                One team from the plan to the 3am alarm
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-secondary">
                Most instrumentation problems happen at the handover between suppliers —
                the sensor is fine, the installation is fine, and nobody owns the number.
                We do all of it, so there is one phone call when something moves.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="rounded-lg bg-petrol px-5 py-3 text-[14.5px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-px"
                >
                  Our services
                </Link>
                <Link
                  href="/instruments"
                  className="rounded-lg border border-paper-strong px-5 py-3 text-[14.5px] font-medium text-ink transition-colors hover:border-slate/50"
                >
                  Browse instruments
                </Link>
              </div>
            </div>
          </Reveal>

          <ol className="space-y-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={i * 60}>
                <div className="bg-white p-7">
                  <div className="flex items-baseline gap-4">
                    <span className="tnum font-mono text-[12px] text-ink-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[19px] font-semibold tracking-[-0.01em]">
                      {service.name}
                    </h3>
                  </div>
                  <p className="ml-10 mt-2.5 text-[15px] leading-relaxed text-ink-secondary">
                    {service.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------- platform */}
      <Section tone="petrol">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow tone="muted">The platform</Eyebrow>
            <h2 className="mt-3 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[36px]">
              Your readings, live, with the thresholds already drawn
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-[#B9C7CE]">
              Every instrument we install reports into one place. Trigger, alert and action
              levels are set with you at the start, so the chart tells you what to do rather
              than leaving you to work it out at midnight.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={process.env.NEXT_PUBLIC_PLATFORM_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-ember px-6 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#E06414]"
              >
                Platform login
              </a>
              <Link
                href="/platform"
                className="rounded-lg border border-slate-line px-6 py-3.5 text-[15px] text-white transition-colors hover:border-slate-light"
              >
                What it does
              </Link>
            </div>
          </Reveal>

          <Reveal delay={90}>
            {/* A small, honest illustration of a monitoring chart — the three
                status bands are the reserved brand status colours. */}
            <div className="rounded-2xl border border-slate-line bg-petrol-raised p-6">
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] uppercase tracking-[0.12em] text-[#8FA3AD]">
                  PZ-04 · pore pressure
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#35A66E]/15 px-2.5 py-1 text-[11.5px] text-[#35A66E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#35A66E]" />
                  Normal
                </span>
              </div>
              <svg viewBox="0 0 440 190" className="mt-5 w-full" role="img" aria-label="Example pore pressure trend against trigger levels">
                <line x1="0" y1="46" x2="440" y2="46" stroke="#E05A57" strokeWidth="1" strokeDasharray="5 5" opacity="0.75" />
                <text x="4" y="40" fill="#E05A57" fontSize="10">Action 320 kPa</text>
                <line x1="0" y1="86" x2="440" y2="86" stroke="#D9A017" strokeWidth="1" strokeDasharray="5 5" opacity="0.75" />
                <text x="4" y="80" fill="#D9A017" fontSize="10">Alert 280 kPa</text>
                <polyline
                  points="0,168 44,162 88,158 132,150 176,146 220,138 264,142 308,130 352,126 396,120 440,116"
                  fill="none" stroke="#4A9BD1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
                <circle cx="440" cy="116" r="4" fill="#4A9BD1" />
              </svg>
              <div className="mt-4 flex items-center justify-between text-[11.5px] text-[#7C919B]">
                <span>Last 90 days</span>
                <span className="tnum">Latest 214 kPa · 15 min interval</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------- projects */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Completed projects"
            title="The record speaks first"
            lead="We are new in the Americas and old at this. These are the projects behind the promise."
            action={<TextLink href="/projects">All projects</TextLink>}
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- stats */}
      <section className="bg-paper">
        <div className="mx-auto max-w-content px-5 pb-4 md:px-8">
          <Reveal>
            <StatBand
              items={[
                { value: '[XX]', label: 'Years of instrumentation' },
                { value: '[XXX]', label: 'Projects delivered' },
                { value: '[XX,XXX]', label: 'Sensors installed' },
                { value: '24/7', label: 'Alarm response' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- contact */}
      <Section>
        <Reveal>
          <div className="rounded-3xl border border-paper-line bg-white px-8 py-14 text-center md:px-16">
            <Eyebrow>Start here</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[36px]">
              Send us the spec and we will tell you what it needs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-ink-secondary">
              A drawing, a bill of quantities, or two lines about the problem — whichever you
              have. We will come back with a scheme and a price.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block rounded-lg bg-ember px-7 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#B94D0C]"
            >
              Request a quote
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
