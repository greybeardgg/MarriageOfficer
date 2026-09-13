export const PROVINCES = ['gauteng','western_cape','eastern_cape','kwazulu_natal',
  'free_state','limpopo','mpumalanga','north_west','northern_cape'] as const;
export type Province = typeof PROVINCES[number];

export const NATIONALITIES = ['both_sa','one_non_sa','both_non_sa'] as const;
export type Nationality = typeof NATIONALITIES[number];

export const NON_SA_STATUSES = ['permanent_resident','temporary_visa'] as const;
export type NonSaStatus = typeof NON_SA_STATUSES[number];

export const PRIOR_MARRIAGES = ['none','divorced','widowed'] as const;
export type PriorMarriage = typeof PRIOR_MARRIAGES[number];

/**
 * `ceremony_only` is a ceremony without the legal part: the couple are already
 * married, or are registering the marriage elsewhere. Nothing is signed and
 * nothing is lodged, so the legal questions are not asked (Ryan, 13 Sept 2026).
 */
export const SERVICES = ['registration','small_ceremony','wedding_ceremony','ceremony_only'] as const;
export type Service = typeof SERVICES[number];

/** The services in which we register the marriage. */
export const LEGAL_SERVICES: Service[] = ['registration','small_ceremony','wedding_ceremony'];
export function isLegal(service: Service | undefined): boolean {
  return service !== undefined && service !== 'ceremony_only';
}

/** The officer answer meaning "no preference, match me". */
export const ANY_OFFICER = 'any';

export type DateIntent = { kind: 'date'; iso: string } | { kind: 'soon' } | { kind: 'not_yet' };

export interface Situation {
  province: Province;
  service: Service;
  /** Not asked for a ceremony without a registration. */
  nationality?: Nationality;
  nonSaStatus?: NonSaStatus;
  /** Not asked for a ceremony without a registration. */
  priorMarriage?: PriorMarriage;
  /** An officer's id, or ANY_OFFICER. Only asked where the province has more than one officer. */
  officer?: string;
  date: DateIntent;
}

export const PROVINCE_LABEL: Record<Province, string> = {
  gauteng: 'Gauteng', western_cape: 'Western Cape', eastern_cape: 'Eastern Cape',
  kwazulu_natal: 'KwaZulu-Natal', free_state: 'Free State', limpopo: 'Limpopo',
  mpumalanga: 'Mpumalanga', north_west: 'North West', northern_cape: 'Northern Cape',
};
