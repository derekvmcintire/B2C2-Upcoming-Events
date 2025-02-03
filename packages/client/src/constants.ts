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

// other label colors to use: #0d47a1 #bc477b
export const LABELS: ValidLabels = {
  RACE: {
    id: "race",
    text: "Race",
    color: "#2e7d32",
  },
  TRIP: {
    id: "trip",
    text: "Team Trip",
    color: "#546e7a",
  },
  SPECIAL: {
    id: "special",
    text: "Special Event",
    color: "#00897b",
  },
  CONTES: {
    id: "contes",
    text: "Conte's",
    color: "#80deea",
  },
  GROUP: {
    id: "group",
    text: "Group Ride",
    color: "#d7ccc8",
  },
  FONDO: {
    id: "fondo",
    text: "Gran Fondo",
    color: "#7e57c2",
  },
  STAGE: {
    id: "stage",
    text: "Stage Race",
    color: "#ff8a65",
  },
  CLIMB: {
    id: "climb",
    text: "Hill Climb",
    color: "#8d6e63",
  },
  GEO: {
    id: "geo",
    text: "Geo Guesser",
    color: "#3949ab",
  },
  VIRTUAL: {
    id: "virtual",
    text: "Virtual Ride",
    color: "#558b2f",
  },
};
