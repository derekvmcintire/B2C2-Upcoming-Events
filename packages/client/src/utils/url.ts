import { DEFAULT_DISCIPLINE, DISCIPLINES } from "../constants";

// Helper to map URL parameter to discipline
export const getDisciplineFromUrl = (): string => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab") || window.location.hash.replace("#", "");

  switch (tab) {
    case "road":
      return DISCIPLINES.ROAD.id;
    case "xc":
      return DISCIPLINES.XC.id;
    case "cx":
      return DISCIPLINES.CX.id;
    case "team":
      return DISCIPLINES.SPECIAL.id;
    default:
      return DEFAULT_DISCIPLINE.id;
  }
};

export const getEventIdsFromUrl = (): string[] => {
  const params = new URLSearchParams(window.location.search);
  const eventsParam = params.get("events");
  console.log("eventsParam: ", eventsParam);
  if (!eventsParam) return []; // Return an empty array if no events found

  const eventIds = eventsParam
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id !== "");
  return eventIds;
};

// Update the URL with a new tab and/or events
export const updateUrlParams = (tab: string, events: string[] = []) => {
  const params = new URLSearchParams(window.location.search);
  params.set("tab", tab);
  if (events.length > 0) {
    params.set("events", events.join(",")); // Join events into a comma-separated string
  } else {
    params.delete("events"); // Remove 'events' if it's empty
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
};
