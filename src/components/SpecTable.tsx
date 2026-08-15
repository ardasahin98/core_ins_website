'use client';

import { useState } from 'react';
import type { InstrumentSpec } from '@/lib/types';

/**
 * Specifications with a metric/imperial toggle.
 *
 * Worth the extra field in Firestore: the US reads instrumentation specs in
 * psi and feet, and everywhere else on the continent does not. Rows without
 * an imperial value simply show the metric one in both modes.
 */
export default function SpecTable({ specs }: { specs: InstrumentSpec[] }) {
  const [imperial, setImperial] = useState(false);
  const hasImperial = specs.some((s) => s.imperial);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ember-text">
          Specifications
        </h2>
        {hasImperial && (
          <div
            role="group"
            aria-label="Units"
            className="inline-flex rounded-lg border border-paper-strong bg-white p-0.5"
          >
            {(['Metric', 'Imperial'] as const).map((label) => {
              const active = (label === 'Imperial') === imperial;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setImperial(label === 'Imperial')}
                  className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                    active ? 'bg-petrol text-white' : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <dl className="overflow-hidden rounded-xl border border-paper-line bg-white">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 ${
              i > 0 ? 'border-t border-paper-line' : ''
            }`}
          >
            <dt className="text-[14.5px] text-ink-secondary">{spec.label}</dt>
            <dd className="tnum text-[15px] font-medium text-ink sm:text-right">
              {imperial && spec.imperial ? spec.imperial : spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
