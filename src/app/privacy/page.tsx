import type { Metadata } from 'next';
import { Section, Eyebrow } from '@/components/ui';

export const metadata: Metadata = { title: 'Privacy' };

export default function Page() {
  return (
    <Section>
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em]">Privacy</h1>
      <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-secondary">
        PLACEHOLDER — this page needs real content before launch. Have it reviewed by counsel
        in each country you operate in; the requirements differ across the US, Canada, Brazil
        (LGPD) and the EU-facing parts of the parent company&apos;s business.
      </p>
    </Section>
  );
}
