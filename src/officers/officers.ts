import type { Province } from '../situation/types';

export interface Officer {
  id: string;
  name: string;
  province: Province;
  locationLabel: string;
  area: string;
  primary?: boolean;
}

export const OFFICERS: Officer[] = [
  { id: 'ryan',    name: 'Ryan Hogarth',      province: 'gauteng',       locationLabel: 'Lonehill',            area: 'Johannesburg', primary: true },
  { id: 'christa', name: 'Christa Lizamore',  province: 'gauteng',       locationLabel: 'Centurion',           area: 'Pretoria' },
  { id: 'james',   name: 'James Beukes',      province: 'gauteng',       locationLabel: 'Centurion',           area: 'Pretoria' },
  { id: 'bev',     name: 'Bev Conradie',      province: 'gauteng',       locationLabel: 'Alberton',            area: 'East Rand' },
  { id: 'tracey',  name: 'Tracey Bosch',      province: 'gauteng',       locationLabel: 'Edenvale',            area: 'East Rand' },
  { id: 'simone',  name: 'Simone De Villiers',province: 'gauteng',       locationLabel: 'Johannesburg',        area: 'Johannesburg' },
  { id: 'lara',    name: 'Lara Thomas',       province: 'western_cape',  locationLabel: 'Vredehoek, Cape Town', area: 'Cape Town', primary: true },
  { id: 'alison',  name: 'Alison Hayward',    province: 'western_cape',  locationLabel: 'Kalbaskraal, Malmesbury', area: 'Swartland' },
  { id: 'andred',  name: 'Andred Hayward',    province: 'western_cape',  locationLabel: 'Oude Westhof, Cape Town', area: 'Northern suburbs' },
  { id: 'cameron', name: 'Cameron Becker',    province: 'western_cape',  locationLabel: 'Somerset West',       area: 'Helderberg' },
  { id: 'graeme',  name: 'Graeme Reid',       province: 'eastern_cape',  locationLabel: 'Port Elizabeth',      area: 'Gqeberha' },
  { id: 'cindy',   name: 'Cindy Reed',        province: 'kwazulu_natal', locationLabel: 'KwaZulu-Natal',       area: 'KwaZulu-Natal' },
];
