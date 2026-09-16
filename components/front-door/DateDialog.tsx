'use client';

import { useEffect, useRef } from 'react';

/**
 * "Any date in mind" opens over the question rather than replacing it
 * (Cameron, 14 September 2026). A native dialog: modal, Escape closes it,
 * focus returns to where it was.
 */
export function DateDialog({ open, onPick, onClose }: { open: boolean; onPick: (iso: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="date-dialog"
      aria-labelledby="date-dialog-head"
      onClose={onClose}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <form
        method="dialog"
        className="date-dialog-form"
        onSubmit={e => {
          e.preventDefault();
          const v = (e.currentTarget.elements.namedItem('d') as HTMLInputElement).value;
          if (v) onPick(v);
        }}
      >
        <h2 id="date-dialog-head" className="question" style={{ fontSize: 'var(--fs-xl)' }}>The date you have in mind</h2>
        <p className="prose step-note">Nothing is booked by this. It tells us which of our people to look at first.</p>
        <label className="label" htmlFor="chosen-date" style={{ color: 'var(--carbon-soft)' }}>Date</label>
        <input id="chosen-date" name="d" type="date" required className="field" style={{ maxWidth: 260 }} />
        <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', marginTop: 'var(--s-2)' }}>
          <button type="submit" className="act act-ink">Next</button>
          <button type="button" className="act act-ruled" onClick={onClose}>Back</button>
        </div>
      </form>
    </dialog>
  );
}
