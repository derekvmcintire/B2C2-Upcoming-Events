export interface Rider {
  id: string;
  name: string;
}

export interface ListConfig {
  id: string;
  title: string;
  hasDismiss: boolean;
}

export interface RiderListsConfig {
  primaryList: ListConfig;
  secondaryList: ListConfig;
}

// Predefined configurations for different event types
export const RACE_CONFIG: RiderListsConfig = {
  primaryList: {
    id: "registered",
    title: "Registered",
    hasDismiss: false,
  },
  secondaryList: {
    id: "interested",
    title: "Interested",
    hasDismiss: true,
  },
};

export const SPECIAL_EVENT_CONFIG: RiderListsConfig = {
  primaryList: {
    id: "committed",
    title: "Committed",
    hasDismiss: true,
  },
  secondaryList: {
    id: "interested",
    title: "Interested",
    hasDismiss: true
  },
};

export interface RiderLists {
  [key: string]: Rider[];
}

export const initialRiders: RiderLists = {
  interested: [
    { id: "rider-1", name: "John S." },
    { id: "rider-2", name: "Emma W." },
    { id: "rider-3", name: "Michael B." },
  ],
  committed: [
    { id: "rider-4", name: "Sarah J." },
    { id: "rider-5", name: "David L." },
  ],
  registered: [],
};
