export interface Rider {
  id: string;
  name: string;
}

export type RiderListEventType = "race" | "special";

export type RiderListEventTypesEnum = {
  RACE: RiderListEventType;
  SPECIAL: RiderListEventType;
};

export const RIDER_LIST_EVENT_TYPES: RiderListEventTypesEnum = {
  RACE: "race",
  SPECIAL: "special",
};

export const INTERESTED_LIST_TYPE = "interested";
export const COMMITTED_LIST_TYPE = "committed";
export const REGISTERED_LIST_TYPE = "registered";

export type ListConfigId =
  | typeof REGISTERED_LIST_TYPE
  | typeof INTERESTED_LIST_TYPE
  | typeof COMMITTED_LIST_TYPE;
export type MovableListType =
  | typeof INTERESTED_LIST_TYPE
  | typeof COMMITTED_LIST_TYPE;

export type ValidListConfigIds = {
  REGISTERED: ListConfigId;
  INTERESTED: ListConfigId;
  COMMITTED: ListConfigId;
};

export const VALID_LIST_CONFIG_IDS: ValidListConfigIds = {
  REGISTERED: "registered",
  INTERESTED: "interested",
  COMMITTED: "committed",
};

export interface ListConfig {
  id: ListConfigId;
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
    id: VALID_LIST_CONFIG_IDS.REGISTERED,
    title: "Registered",
    hasDismiss: false,
  },
  secondaryList: {
    id: VALID_LIST_CONFIG_IDS.INTERESTED,
    title: "Interested",
    hasDismiss: true,
  },
};

export const SPECIAL_EVENT_CONFIG: RiderListsConfig = {
  primaryList: {
    id: VALID_LIST_CONFIG_IDS.COMMITTED,
    title: "Committed",
    hasDismiss: true,
  },
  secondaryList: {
    id: VALID_LIST_CONFIG_IDS.INTERESTED,
    title: "Interested",
    hasDismiss: true,
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
  registered: [{ id: "rider-4", name: "Derek J." }],
};
