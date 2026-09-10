import type { Officer } from '@/src/officers/officers';

export function OfficerCard({ officer }: { officer: Officer | null }) {
  if (!officer) {
    return (
      <div className="rounded-2xl border border-dashed p-6">
        <h3 className="text-lg font-semibold">Your officer</h3>
        <p className="mt-2 text-neutral-800">We&rsquo;ll match you with an officer in your area as soon as you book.</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-[var(--accent-soft)] p-6">
      <h3 className="text-lg font-semibold">Your officer</h3>
      <p className="mt-2 text-xl font-bold">{officer.name}</p>
      <p className="text-neutral-700">{officer.locationLabel} · {officer.area}</p>
    </div>
  );
}
