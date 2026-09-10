import type { Province, Nationality, Service } from './types';

/** Button ids in the live WhatsApp flow (whatsapp-flows-2026-09-10.json) -> our values. */
export const WA_PROVINCE: Record<string, Province | 'other'> = {
  gauteng: 'gauteng',
  western_cape: 'western_cape',
  other: 'other',
};

export const WA_NATIONALITY: Record<string, Nationality> = {
  both_south_african: 'both_sa',
  one_south_african: 'one_non_sa',
  both_non_sa: 'both_non_sa',
};

/** The flow's service options 1/2/3 as they appear after the nationality step. */
export const WA_SERVICE: Record<string, Service> = {
  '1': 'registration',
  '2': 'small_ceremony',
  '3': 'wedding_ceremony',
};
