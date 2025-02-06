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

export const DEFAULT_DISCIPLINE = DISCIPLINES.ROAD;

export const LIGHT_COLOR_SCHEME = "light";
export const DARK_COLOR_SCHEME = "dark";

export const B2C2_API_BASE_URL = "https://b2c2-events-api.vercel.app";

export const MOBILE_BREAK_POINT = "(max-width: 825px)";

// other label colors to use: deep navy blue - #0d47a1 dusty rose - #bc477b
export const LABELS: ValidLabels = {
  RACE: {
    id: "race",
    text: "Race",
    color: "#2e7d32", // earthy green
  },
  TRIP: {
    id: "trip",
    text: "Team Trip",
    color: "#546e7a", // slate blue-gray
  },
  SPECIAL: {
    id: "special",
    text: "Special Event",
    color: "#00897b", // muted teal
  },
  CONTES: {
    id: "contes",
    text: "Conte's",
    color: "#55969e", // conte's green blue
  },
  GROUP: {
    id: "group",
    text: "Group Ride",
    color: "#7a6b66", // sand storm
  },
  FONDO: {
    id: "fondo",
    text: "Gran Fondo",
    color: "#7e57c2", // power purple
  },
  STAGE: {
    id: "stage",
    text: "Stage Race",
    color: "#ff8a65", // peachy red
  },
  CLIMB: {
    id: "climb",
    text: "Hill Climb",
    color: "#8d6e63", // gravy
  },
  GEO: {
    id: "geo",
    text: "Geo Guesser",
    color: "#3949ab", // blueberry
  },
  VIRTUAL: {
    id: "virtual",
    text: "Virtual Ride",
    color: "#558b2f", // puke green
  },
};
