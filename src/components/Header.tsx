'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const NAV = [
  { href: '/sectors', label: 'Sectors' },
  { href: '/instruments', label: 'Instruments' },
  { href: '/services', label: 'Services' },
  { href: '/platform', label: 'Platform' },
  { href: '/about', label: 'Company' },
];

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || '#';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-core ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-paper-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center gap-6 px-5 py-3.5 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CORE — home">
          <Logo size={38} />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[19px] font-semibold tracking-[0.14em]">CORE</span>
            <span className="mt-1 hidden whitespace-nowrap text-[8.5px] uppercase tracking-[0.13em] text-ink-muted sm:block">
              Instrumentation &amp; Monitoring
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14.5px] text-ink-secondary transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <a
            href={PLATFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-slate/25 px-3.5 py-2 text-[13.5px] font-medium text-petrol transition-colors hover:border-slate/60 hover:bg-white sm:inline-flex"
          >
            Platform login
          </a>
          <Link
            href="/contact"
            className="rounded-lg bg-ember px-4 py-2 text-[13.5px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-px hover:bg-[#B94D0C]"
          >
            Request a quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="ml-1 rounded-lg border border-paper-line p-2 lg:hidden"
          >
            <span className="block h-px w-4 bg-ink" />
            <span className="mt-1 block h-px w-4 bg-ink" />
            <span className="mt-1 block h-px w-4 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-paper-line bg-paper px-5 pb-4 pt-2 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-paper-line/70 py-3 text-[15px] text-ink-secondary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={PLATFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3 text-[15px] font-medium text-ember-text"
          >
            Platform login →
          </a>
        </nav>
      )}
    </header>
  );
}
