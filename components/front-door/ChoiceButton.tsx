'use client';

export function ChoiceButton(props: { label: string; hint?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="w-full text-left rounded-2xl border border-[var(--accent-soft)] bg-white px-6 py-5 shadow-sm
                 transition hover:border-[var(--accent)] hover:shadow-md focus:outline-none focus-visible:ring-2
                 focus-visible:ring-[var(--accent)]"
    >
      <span className="block text-lg font-semibold">{props.label}</span>
      {props.hint && <span className="mt-1 block text-sm text-neutral-600">{props.hint}</span>}
    </button>
  );
}
