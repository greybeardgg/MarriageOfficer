import { OFFICERS } from './officers';
import type { Officer } from './officers';
import type { Situation } from '../situation/types';

export function assignOfficer(s: Situation): Officer | null {
  return OFFICERS.find(o => o.primary && o.province === s.province) ?? null;
}
