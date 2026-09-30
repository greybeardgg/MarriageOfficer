/**
 * The business's own contact details. One main number and a WhatsApp option
 * are coming (Ryan, 30 September 2026); the numbers themselves, and whether
 * they appear on every page or only on Contact, are still to be decided.
 *
 * Until a value is set here nothing is shown to the public: a number is
 * never invented, and an officer's personal number or email never goes here.
 * Set the number in international form without spaces, e.g. '27110000000'.
 */
export interface ContactDetails {
  /** The main contact number, digits only with the country code. */
  phone: string | null;
  /** The WhatsApp number, digits only with the country code. */
  whatsapp: string | null;
}

export const CONTACT: ContactDetails = {
  phone: null,
  whatsapp: null,
};

/** "27112345678" reads as "+27 11 234 5678". */
export function displayNumber(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.startsWith('27') && d.length === 11) return `+27 ${d.slice(2, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return '+' + d;
}

export function whatsappLink(digits: string): string {
  return 'https://wa.me/' + digits.replace(/\D/g, '');
}

export function hasContact(c: ContactDetails = CONTACT): boolean {
  return !!(c.phone || c.whatsapp);
}
