import { EventDisciplines } from "./types";

export const DISCIPLINES: EventDisciplines = {
  ROAD: {
    queryParam: 'road%20race',
    text: 'Road', 
    id: 'road',
  },
  CX: {
    queryParam: 'cyclocross',
    text: 'Cyclocross',
    id: 'cx',
  },
  XC: {
    queryParam: 'mountain%20bike',
    text: 'Cross Country',
    id: 'xc'
  }
}

export const LIGHT_COLOR_SCHEME = 'light';
export const DARK_COLOR_SCHEME = 'dark';