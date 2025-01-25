import { EventDisciplines } from "./types";

export const DISCIPLINES: EventDisciplines = {
  ROAD: {
    queryParam: "road%20race",
    text: "Road",
    id: "road",
  },
  CX: {
    queryParam: "cyclocross",
    text: "Cyclocross",
    id: "cx",
  },
  XC: {
    queryParam: "mountain%20bike",
    text: "Cross Country",
    id: "xc",
  },
  SPECIAL: {
    queryParam: "special",
    text: "Special Events",
    id: "special",
  },
};

export const LIGHT_COLOR_SCHEME = "light";
export const DARK_COLOR_SCHEME = "dark";

export const B2C2_API_BASE_URL = "https://b2c2-events-api.vercel.app";

export const MOBILE_BREAK_POINT = "(max-width: 825px)";
