export type EventDiscipline = "road" | "cx" | "xc" | "special";

export type EventType = {
  eventId: string;
  name: string;
  date: string; // ISO 8601 date string (you can parse it into a Date object if needed)
  city: string;
  state: string;
  eventUrl?: string;
  eventType: EventDiscipline;
  interestedRiders?: string[];
  committedRiders?: string[];
  housingUrl?: string;
  description?: string;
  labels?: string[];
  carpools?: Carpool[];
  housing?: Housing;
};

export const mockEvents: EventType[] = [
  {
    eventId: "69168",
    name: "The Frozen Four 2025: Matt Catania Memorial",
    date: "2025-03-02T00:00:00.000-05:00",
    city: "Farmington",
    state: "CT",
    eventUrl: "https://www.bikereg.com/the-frozen-four-1-2025",
    eventType: "road",
  },
  {
    eventId: "68315",
    name: "Buzz the Tower",
    date: "2025-03-29T00:00:00.000-04:00",
    city: "Charlestown",
    state: "RI",
    eventUrl: "https://www.bikereg.com/buzz-the-tower",
    eventType: "road",
  },
];

export type GetEventsResponse = {
  events: EventType[];
  error?: string;
};

export type EventSubmission = {
  url: string;
  eventType: string;
};

export type FetchRegistrationsResponse = {
  [key: string]: EventEntry | string | undefined; // Handles numbered keys and the 'query' and 'error' string key
  query?: string;
  error?: string;
};

export type EventEntry = {
  "0": number; // Event ID
  "1": string; // Event Name
  "2": string; // First Name
  "3": string; // Last Name
  "4": string; // Category
  "5": DateDetails; // Event Date
  "6": DateDetails; // Event End Date
  EventID: number;
  EventName: string;
  FirstName: string;
  LastName: string;
  Category: string;
  EventDate: DateDetails;
  EventEndDate: DateDetails;
};

export type DateDetails = {
  date: string; // ISO format date string
  timezone_type: number; // Timezone type (3 for most cases)
  timezone: string; // Timezone string
};

export type EventDisciplineParam =
  | "road%20race"
  | "cyclocross"
  | "mountain%20bike"
  | "special";

export type Discipline = {
  queryParam: EventDisciplineParam;
  text: string;
  mobileText: string;
  id: EventDiscipline;
};

export type EventDisciplines = {
  ROAD: Discipline;
  CX: Discipline;
  XC: Discipline;
  SPECIAL: Discipline;
};

export type FormValueType = "race" | "special" | "contes";

export type FormType = {
  label: string;
  value: FormValueType;
};

export type EventForms = {
  RACE: FormType;
  SPECIAL: FormType;
  CONTES: FormType;
};

export const FORMS: EventForms = {
  RACE: {
    label: "Race",
    value: "race",
  },
  SPECIAL: {
    label: "Custom Event",
    value: "special",
  },
  CONTES: {
    label: "Quick Conte's",
    value: "contes",
  },
};

export type SubmitResponse = {
  eventId?: string;
  message: string;
  success: boolean;
};

export type LabelConfig = {
  id: string;
  text: string;
  color: string;
};

export type ValidLabels = {
  RACE: LabelConfig;
  TRIP: LabelConfig;
  SPECIAL: LabelConfig;
  CONTES: LabelConfig;
  GROUP: LabelConfig;
  FONDO: LabelConfig;
  STAGE: LabelConfig;
  CLIMB: LabelConfig;
  GEO: LabelConfig;
  VIRTUAL: LabelConfig;
};

export type Carpool = {
  name: string;
  seats: number;
  riders: string[];
};

export type Housing = {
  committed?: string[];
  interested?: string[];
};
