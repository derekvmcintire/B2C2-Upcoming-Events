import { EventDisciplines, ValidLabels } from "./types";

export const DISCIPLINES: EventDisciplines = {
  ROAD: {
    queryParam: "road%20race",
    text: "Road",
    mobileText: "Road",
    id: "road",
  },
  CX: {
    queryParam: "cyclocross",
    text: "Cyclocross",
    mobileText: "CX",
    id: "cx",
  },
  XC: {
    queryParam: "mountain%20bike",
    text: "Mountain Bike",
    mobileText: "XC",
    id: "xc",
  },
  SPECIAL: {
    queryParam: "special",
    text: "Team Event",
    mobileText: "Team",
    id: "special",
  },
};

export const LIGHT_COLOR_SCHEME = "light";
export const DARK_COLOR_SCHEME = "dark";

export const B2C2_API_BASE_URL = "https://b2c2-events-api.vercel.app";

export const MOBILE_BREAK_POINT = "(max-width: 825px)";

export const LABELS: ValidLabels = {
  RACE: {
    text: "Race",
    color: "#12664c",
  },
  TRIP: {
    text: "Team Trip",
    color: "#8c774c",
  },
};
