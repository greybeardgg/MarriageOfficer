'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function FreeTextBox() {
  const router = useRouter();
  const params = useSearchParams();
  const [text, setText] = useState(params.get('q') ?? '');

  return (
    <form
      className="ask"
      onSubmit={e => {
        e.preventDefault();
        const p = new URLSearchParams(params.toString());
        if (text.trim()) p.set('q', text.trim());
        else p.delete('q');
        router.replace('/plan?' + p.toString());
      }}
    >
      <label className="question ask-head" htmlFor="q" style={{ fontSize: 'var(--fs-xl)' }}>
        Do You Have Any Questions?
      </label>
      <p className="prose ask-note">
        Write as much as you like. We will add the answers to this page, still without asking who you are.
      </p>
      <textarea
        id="q"
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
        className="field"
        placeholder="One of us is Zimbabwean and we want a Saturday in March…"
      />
      <div>
        <button type="submit" className="act act-ruled">Show Me</button>
      </div>
    </form>
  );
}
