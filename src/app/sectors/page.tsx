import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { Section, SectionHead, SectorCard } from '@/components/ui';
import { getSectors } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Sectors',
  description:
    'Instrumentation and monitoring for dams, tailings facilities, tunnels, deep excavations, bridges and slopes.',
};

export default async function SectorsPage() {
  const sectors = await getSectors();

  return (
    <Section>
      <Reveal>
        <SectionHead
          eyebrow="Sectors"
          title="Where our instruments end up"
          lead="Each sector page sets out what typically gets measured, the instruments we reach for, and the projects we have completed there."
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
  );
}
