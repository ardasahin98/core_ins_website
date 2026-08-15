import Link from 'next/link';
import { Section, Eyebrow } from '@/components/ui';

export default function NotFound() {
  return (
    <Section>
      <div className="py-16 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em]">
          Nothing here
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink-secondary">
          The page you were looking for has moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-ember px-6 py-3.5 text-[15px] font-medium text-white"
        >
          Back to the homepage
        </Link>
      </div>
    </Section>
  );
}
