import type { Price } from './types';

export const PRICES: Price[] = [
  { key: 'registration_office', label: 'Registration at our offices', amountZar: 4500 },
  { key: 'registration_home', label: 'Registration at your home', amountZar: 5500 },
  { key: 'registration_express', label: 'Express registration (Monday Lonehill, Thursday Centurion)', amountZar: 3000 },
  { key: 'small_ceremony', label: 'Small ceremony', amountZar: 5900 },
  { key: 'wedding_ceremony', label: 'Wedding ceremony', amountZar: 8900 },
  { key: 'unabridged_certificate', label: 'Unabridged marriage certificate', amountZar: 2500 },
];

export function priceFor(key: string): Price {
  const p = PRICES.find(x => x.key === key);
  if (!p) throw new Error(`unknown price key: ${key}`);
  return p;
}

export function formatZar(n: number): string {
  const s = Math.round(n).toString();
  const grouped = s.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
  return `R${grouped}`;
}
