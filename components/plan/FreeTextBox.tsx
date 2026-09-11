'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Eyebrow } from '@/components/brand/Eyebrow';

export function FreeTextBox() {
  const router = useRouter();
  const params = useSearchParams();
  const [text, setText] = useState(params.get('q') ?? '');
  return (
    <form className="card" style={{ display: 'grid', gap: 'var(--space-3)' }}
      onSubmit={e => { e.preventDefault(); const p = new URLSearchParams(params.toString()); if (text.trim()) p.set('q', text.trim()); else p.delete('q'); router.replace('/plan?' + p.toString()); }}>
      <Eyebrow>One More Thing</Eyebrow>
      <label htmlFor="q" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-regular)', fontSize: 'var(--fs-lg)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-heading)' }}>Do you have any questions?</label>
      <p style={{ margin: 0, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>The more you tell us, the more specific we can be.</p>
      <textarea id="q" value={text} onChange={e => setText(e.target.value)} rows={4} className="field" placeholder="Tell us about your situation" />
      <div><button type="submit" className="btn btn-primary btn-md">Show Me</button></div>
    </form>
  );
}
