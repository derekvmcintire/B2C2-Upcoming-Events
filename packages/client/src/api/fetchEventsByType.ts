import { simple } from "simple-fetch-ts";
import { EventDiscipline, GetEventsResponse } from "../types";
import { buildProxyRequestUrl } from "./utility";
import { B2C2_API_BASE_URL } from "../constants";
import { setEventsToCache } from "../infrastructure/event-cache";

const url = `${B2C2_API_BASE_URL}/api/getEventsByType`;

/**
 * Fetches events by their type from the backend API.
 * This function constructs a URL with the provided event type, makes a request to the backend API via the proxy,
 * and returns the response containing the event data.
 *
 * @param type - The type of events to fetch (e.g., "road", "cx").
 * @returns A promise that resolves to the response data of type `GetEventsResponse`.
 */
export const fetchEventsByType = async (
  type: EventDiscipline,
): Promise<GetEventsResponse> => {
  const proxyUrl = buildProxyRequestUrl(url, { type });
  const response = await simple(proxyUrl).fetch<GetEventsResponse>();

  const data = response.data;

  setEventsToCache(type, data.events);

  return data;
};
