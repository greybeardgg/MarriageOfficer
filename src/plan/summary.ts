import { PROVINCE_LABEL } from '../situation/types';
import type { Situation } from '../situation/types';

const SERVICE: Record<Situation['service'], string> = {
  registration: 'legal registration',
  small_ceremony: 'small ceremony',
  wedding_ceremony: 'wedding ceremony',
};

export function summarise(s: Situation): string {
  let nat: string;
  if (s.nationality === 'both_sa') nat = 'both South African';
  else if (s.nationality === 'both_non_sa') nat = 'neither of you South African';
  else {
    const st = s.nonSaStatus === 'permanent_resident' ? ' (a permanent resident)'
      : s.nonSaStatus === 'temporary_visa' ? ' (on a visa)' : '';
    nat = `one of you not South African${st}`;
  }
  const prior = s.priorMarriage === 'none' ? 'first marriage' : 'one of you married before';
  return [SERVICE[s.service], nat, prior, PROVINCE_LABEL[s.province]].join(', ');
}
