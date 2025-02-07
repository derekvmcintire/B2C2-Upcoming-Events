import { DEFAULT_DISCIPLINE, DISCIPLINES } from "../constants";

/**
 * Retrieves the discipline from the URL.
 * @returns The discipline ID.
 */
export const getDisciplineFromUrl = (): string => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab") || window.location.hash.replace("#", "");

  console.log("tab is: ", tab);

  switch (tab) {
    case "road":
      return DISCIPLINES.ROAD.id;
    case "xc":
      return DISCIPLINES.XC.id;
    case "cx":
      return DISCIPLINES.CX.id;
    case "special":
      return DISCIPLINES.SPECIAL.id;
    default:
      return DEFAULT_DISCIPLINE.id;
  }
};

/**
 * Retrieves event IDs from the URL query parameters.
 * @returns An array of event IDs.
 */
export const getEventIdsFromUrl = (): string[] => {
  const params = new URLSearchParams(window.location.search);
  const eventsParam = params.get("events");
  if (!eventsParam) return [];

  const eventIds = eventsParam
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id !== "");
  return eventIds;
};

/**
 * Updates the URL parameters with the specified tab and events.
 * @param tab - The tab to be set in the URL parameters.
 * @param events - An optional array of events to be set in the URL parameters.
 */
export const updateUrlParams = (tab: string, events: string[] = []) => {
  const params = new URLSearchParams(window.location.search);
  params.set("tab", tab);
  if (events.length > 0) {
    params.set("events", events.join(","));
  } else {
    params.delete("events");
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
};

export const isValidUrl = (url: string): boolean => {
  try {
    const newUrl = new URL(url);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};
