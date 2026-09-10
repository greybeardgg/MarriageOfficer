import type { Province, Nationality, NonSaStatus, PriorMarriage, Service } from '../situation/types';

export interface Price {
  key: string;
  label: string;
  amountZar: number;
  note?: string;
}

export type Section = 'process' | 'price' | 'bring' | 'home_affairs' | 'specific' | 'always';

export interface AppliesTo {
  provinces?: Province[];
  nationalities?: Nationality[];
  nonSaStatuses?: NonSaStatus[];
  priorMarriages?: PriorMarriage[];
  services?: Service[];
}

export interface Answer {
  id: string;
  question: string;
  body: string;
  section: Section;
  appliesTo: AppliesTo;
  triggers: string[];
  order: number;
  status: 'draft' | 'live';
  lastReviewed: string;
}
