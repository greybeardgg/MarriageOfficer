import { PROVINCE_LABEL, isLegal } from '../situation/types';
import type { Situation } from '../situation/types';
import { assignOfficer, wasChosen } from '../officers/assign';

const SERVICE: Record<Situation['service'], string> = {
  registration: 'legal registration',
  small_ceremony: 'small ceremony',
  wedding_ceremony: 'wedding ceremony',
  ceremony_only: 'ceremony on its own',
  undecided: 'every option',
};

export function summarise(s: Situation): string {
  const parts: string[] = [SERVICE[s.service]];
  if (isLegal(s.service)) {
    let nat: string;
    if (s.nationality === 'both_sa') nat = 'both South African';
    else if (s.nationality === 'both_non_sa') nat = 'neither of you South African';
    else {
      const st = s.nonSaStatus === 'permanent_resident' ? ' (a permanent resident)'
        : s.nonSaStatus === 'temporary_visa' ? ' (on a visa)' : '';
      nat = `one of you not South African${st}`;
    }
    parts.push(nat, s.priorMarriage === 'none' ? 'first marriage' : 'one of you married before');
  }
  parts.push(PROVINCE_LABEL[s.province]);
  const officer = assignOfficer(s);
  if (wasChosen(s, officer)) parts.push(`with ${officer!.name}`);
  return parts.join(', ');
}
