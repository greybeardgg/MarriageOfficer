export const PROVINCES = ['gauteng','western_cape','eastern_cape','kwazulu_natal',
  'free_state','limpopo','mpumalanga','north_west','northern_cape'] as const;
export type Province = typeof PROVINCES[number];

export const NATIONALITIES = ['both_sa','one_non_sa','both_non_sa'] as const;
export type Nationality = typeof NATIONALITIES[number];

export const NON_SA_STATUSES = ['permanent_resident','temporary_visa'] as const;
export type NonSaStatus = typeof NON_SA_STATUSES[number];

export const PRIOR_MARRIAGES = ['none','divorced','widowed'] as const;
export type PriorMarriage = typeof PRIOR_MARRIAGES[number];

export const SERVICES = ['registration','small_ceremony','wedding_ceremony'] as const;
export type Service = typeof SERVICES[number];

export type DateIntent = { kind: 'date'; iso: string } | { kind: 'soon' } | { kind: 'not_yet' };

export interface Situation {
  province: Province;
  nationality: Nationality;
  nonSaStatus?: NonSaStatus;
  priorMarriage: PriorMarriage;
  service: Service;
  date: DateIntent;
}

export const PROVINCE_LABEL: Record<Province, string> = {
  gauteng: 'Gauteng', western_cape: 'Western Cape', eastern_cape: 'Eastern Cape',
  kwazulu_natal: 'KwaZulu-Natal', free_state: 'Free State', limpopo: 'Limpopo',
  mpumalanga: 'Mpumalanga', north_west: 'North West', northern_cape: 'Northern Cape',
};
