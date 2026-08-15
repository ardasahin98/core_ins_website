'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PROJECT_TYPES = [
  'Dam or reservoir',
  'Mining or tailings',
  'Tunnel or underground',
  'Deep excavation',
  'Bridge or structure',
  'Slope or landslide',
  'Other',
];

type State = 'idle' | 'sending' | 'sent' | 'error';

export default function QuoteForm() {
  const params = useSearchParams();
  const instrument = params.get('instrument') ?? '';
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    setError('');

    const form = new FormData(event.currentTarget);
    // honeypot: real people leave this empty, bots fill it in
    if (form.get('company_website')) {
      setState('sent');
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          company: form.get('company'),
          phone: form.get('phone'),
          country: form.get('country'),
          projectType: form.get('projectType'),
          message: form.get('message'),
          instrumentSlugs: instrument ? [instrument] : [],
          source: 'website',
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
      setState('sent');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-status-normal/30 bg-status-normal/8 p-10 text-center">
        <h2 className="font-display text-[22px] font-semibold">Thank you — it is with us.</h2>
        <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-secondary">
          Someone from the team will reply within one working day. If it is urgent, call the
          number on this page rather than waiting on email.
        </p>
      </div>
    );
  }

  const field =
    'w-full rounded-lg border border-paper-strong bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/70 transition-colors focus:border-ember focus:outline-none';
  const label = 'block text-[13px] font-medium text-ink-secondary mb-1.5';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {instrument && (
        <p className="rounded-lg border border-paper-line bg-white px-4 py-3 text-[14px] text-ink-secondary">
          Asking about: <span className="font-medium text-ink">{instrument}</span>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Name *</label>
          <input id="name" name="name" required className={field} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required className={field} autoComplete="email" />
        </div>
        <div>
          <label className={label} htmlFor="company">Company</label>
          <input id="company" name="company" className={field} autoComplete="organization" />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" className={field} autoComplete="tel" />
        </div>
        <div>
          <label className={label} htmlFor="country">Country</label>
          <input id="country" name="country" className={field} autoComplete="country-name" />
        </div>
        <div>
          <label className={label} htmlFor="projectType">Project type</label>
          <select id="projectType" name="projectType" className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">What do you need? *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="The site, the ground conditions, what you need to measure, and the programme — or just paste the spec."
          className={`${field} resize-y`}
        />
      </div>

      {/* honeypot — visually hidden, not display:none, so bots still see it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-[13px] leading-relaxed text-ink-muted">
        Have a drawing or a bill of quantities? Send it to the email address on this page and
        quote your company name — file upload will be enabled once Firebase Storage is
        connected.
      </p>

      {state === 'error' && (
        <p className="rounded-lg border border-status-alarm/30 bg-status-alarm/8 px-4 py-3 text-[14px] text-status-alarm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full rounded-lg bg-ember px-6 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 ease-core hover:-translate-y-0.5 hover:bg-[#B94D0C] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {state === 'sending' ? 'Sending…' : 'Send request'}
      </button>
    </form>
  );
}
