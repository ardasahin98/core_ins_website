import Link from 'next/link';
import Logo from './Logo';

const COLUMNS = [
  {
    title: 'Sectors',
    links: [
      { href: '/sectors/dams', label: 'Dams & Reservoirs' },
      { href: '/sectors/tailings', label: 'Mining & Tailings' },
      { href: '/sectors/tunnels', label: 'Tunnels & Underground' },
      { href: '/sectors/excavations', label: 'Deep Excavations' },
      { href: '/sectors/bridges', label: 'Bridges & Structures' },
      { href: '/sectors/slopes', label: 'Slopes & Landslides' },
    ],
  },
  {
    title: 'What we do',
    links: [
      { href: '/instruments', label: 'Instruments' },
      { href: '/services', label: 'Services' },
      { href: '/platform', label: 'Monitoring platform' },
      { href: '/projects', label: 'Projects' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About CORE' },
      { href: '/about#team', label: 'Team' },
      { href: '/about#values', label: 'Core values' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-petrol text-[#C3D0D7]">
      <div className="mx-auto max-w-content px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <span className="flex flex-col leading-none text-white">
                <span className="font-display text-[19px] font-semibold tracking-[0.14em]">CORE</span>
                <span className="mt-1 text-[8.5px] uppercase tracking-[0.13em] text-[#8FA3AD]">
                  Instrumentation &amp; Monitoring
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-[#93A6AF]">
              Geotechnical and structural instrumentation across North and South America.
              Part of{' '}
              <span className="text-[#C3D0D7]">[PARENT COMPANY NAME]</span>, Ankara.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_PLATFORM_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-line px-4 py-2.5 text-[13.5px] text-white transition-colors hover:border-slate-light"
            >
              Platform login
              <span aria-hidden>→</span>
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7C919B]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-[#B9C7CE] transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-line pt-6 text-[12.5px] text-[#7C919B] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CORE Instrumentation &amp; Monitoring. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#C3D0D7]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#C3D0D7]">Terms</Link>
            <Link href="/accessibility" className="hover:text-[#C3D0D7]">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
