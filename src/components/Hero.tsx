'use client';

import Link from 'next/link';
import { useEffect, useRef, type CSSProperties } from 'react';
import Logo from './Logo';

/**
 * Hero with a ground cross-section that separates slightly as you scroll.
 *
 * The movement is small on purpose — a few pixels per layer, driven by one
 * rAF-throttled scroll listener writing a CSS custom property. No library,
 * no scroll-jacking, and it stops entirely once the hero leaves the viewport.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // 0 at rest, 1 when the hero has scrolled a full viewport
      const progress = Math.min(1, Math.max(0, -rect.top / window.innerHeight));
      node.style.setProperty('--p', progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-petrol text-white"
      style={{ '--p': 0 } as unknown as CSSProperties}
    >
      <div className="mx-auto grid max-w-content items-center gap-14 px-5 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="flex items-center gap-2.5 text-[11.5px] font-medium uppercase tracking-[0.18em] text-ember-light">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember-light" />
            North &amp; South America
          </p>

          <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.06] tracking-[-0.025em] sm:text-[52px] lg:text-[60px]">
            We measure what the
            <br className="hidden sm:block" /> ground is doing
            <span className="text-ember-light">.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#B9C7CE]">
            Geotechnical and structural instrumentation for dams, tailings facilities,
            tunnels and deep excavations — designed, installed and monitored by one team,
            with the data on your screen instead of in a filing cabinet.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-ember px-6 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#E06414]"
            >
              Request a quote
            </Link>
            <Link
              href="/sectors"
              className="rounded-lg border border-slate-line px-6 py-3.5 text-[15px] text-white transition-colors duration-200 hover:border-slate-light"
            >
              See our sectors
            </Link>
          </div>

          <p className="mt-10 text-[13px] text-[#7C919B]">
            Part of <span className="text-[#B9C7CE]">[PARENT COMPANY NAME]</span>, Ankara —
            [XX] years and [XXX] projects behind us.
          </p>
        </div>

        {/* ---------------------------------------------- cross-section */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <svg viewBox="0 0 520 460" className="w-full" role="img" aria-label="Instrumented ground cross-section">
            <defs>
              <linearGradient id="heroCrust" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0" stopColor="#44606E" />
                <stop offset="1" stopColor="#2A414C" />
              </linearGradient>
              <linearGradient id="heroMantle" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0" stopColor="#8A5A28" />
                <stop offset="1" stopColor="#6B3F14" />
              </linearGradient>
              <linearGradient id="heroDeep" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0" stopColor="#B85E17" />
                <stop offset="1" stopColor="#8A4412" />
              </linearGradient>
              <radialGradient id="heroCore" cx="40%" cy="34%" r="70%">
                <stop offset="0" stopColor="#FFE9AE" />
                <stop offset="1" stopColor="#E07A16" />
              </radialGradient>
            </defs>

            {/* each stratum drifts a little further than the one above it */}
            <g style={{ transform: 'translateY(calc(var(--p) * -10px))' }}>
              <path d="M20 120 Q 150 96 268 116 T 500 108 L500 176 L20 186 Z" fill="url(#heroCrust)" />
            </g>
            <g style={{ transform: 'translateY(calc(var(--p) * 6px))' }}>
              <path d="M20 186 L500 176 L500 268 Q 300 292 20 272 Z" fill="url(#heroMantle)" />
            </g>
            <g style={{ transform: 'translateY(calc(var(--p) * 20px))' }}>
              <path d="M20 272 Q 300 292 500 268 L500 380 Q 260 410 20 372 Z" fill="url(#heroDeep)" />
            </g>

            {/* borehole and the instrument string in it */}
            <g style={{ transform: 'translateY(calc(var(--p) * 4px))' }}>
              <line x1="186" y1="96" x2="186" y2="366" stroke="#0E1A20" strokeWidth="9" strokeLinecap="round" opacity="0.55" />
              <line x1="186" y1="96" x2="186" y2="366" stroke="#FFDD80" strokeWidth="1.6" opacity="0.75" />
              {[150, 214, 278, 342].map((y, i) => (
                <g key={y}>
                  <circle cx="186" cy={y} r="9" fill="url(#heroCore)" opacity="0.22" />
                  <circle cx="186" cy={y} r="4.6" fill="#FFDD80" stroke="#B85E17" strokeWidth="1.4" />
                  <line x1="196" y1={y} x2="238" y2={y} stroke="#FFDD80" strokeWidth="1" opacity="0.45" strokeDasharray="3 4" />
                  <text x="246" y={y + 4} fill="#C3D0D7" fontSize="11" className="tnum">
                    {['−4.0 m', '−12.5 m', '−21.0 m', '−29.5 m'][i]}
                  </text>
                </g>
              ))}
            </g>

            {/* surface furniture: the enclosure the logger lives in */}
            <g style={{ transform: 'translateY(calc(var(--p) * -10px))' }}>
              <rect x="150" y="66" width="72" height="34" rx="6" fill="#1B2C35" stroke="#3E5661" strokeWidth="1.5" />
              <circle cx="163" cy="83" r="3" fill="#35A66E" />
              <text x="174" y="87" fill="#8FA3AD" fontSize="10">LOGGER</text>
              <line x1="222" y1="83" x2="300" y2="83" stroke="#3E5661" strokeWidth="1.5" strokeDasharray="4 5" />
              <text x="308" y="87" fill="#7C919B" fontSize="10">4G → platform</text>
            </g>
          </svg>

          <div className="pointer-events-none absolute -bottom-4 -right-2 opacity-90">
            <Logo size={78} animate />
          </div>
        </div>
      </div>
    </section>
  );
}
