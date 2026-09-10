'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function FreeTextBox() {
  const router = useRouter();
  const params = useSearchParams();
  const [text, setText] = useState(params.get('q') ?? '');
  return (
    <form
      className="rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={e => { e.preventDefault(); const p = new URLSearchParams(params.toString()); if (text.trim()) p.set('q', text.trim()); else p.delete('q'); router.replace('/plan?' + p.toString()); }}
    >
      <label htmlFor="q" className="block text-lg font-semibold">Do you have any questions?</label>
      <p className="mt-1 text-sm text-neutral-600">The more you tell us, the more specific we can be.</p>
      <textarea id="q" value={text} onChange={e => setText(e.target.value)} rows={4}
        className="mt-3 w-full rounded-xl border px-4 py-3" placeholder="Tell us about your situation…" />
      <button type="submit" className="mt-3 rounded-xl bg-[var(--accent)] px-5 py-2 text-white">Show me</button>
    </form>
  );
}
