import { simple, SimpleResponse } from "simple-fetch-ts";
import { EventDiscipline, GetEventsResponse } from "../types";
import { buildProxyRequestUrl } from "./utility";
import { B2C2_API_BASE_URL } from "../constants";
import {
  getEventsFromCache,
  setEventsToCache,
} from "../infrastructure/event-cache";

const url = `${B2C2_API_BASE_URL}/api/getEventsByType`;

type FetchEventsOptions = {
  discipline: EventDiscipline;
  skipCache?: boolean;
};

/**
 * Fetches events by their discipline from the backend API.
 * This function constructs a URL with the provided event discipline, makes a request to the backend API via the proxy,
 * and returns the response containing the event data.
 *
 * @param discipline - The discipline of events to fetch (e.g., "road", "cx").
 * @param skipCache - Whether or not to skip the cache
 * @returns A promise that resolves to the response data of discipline `GetEventsResponse`.
 */
export const fetchEventsByDiscipline = async ({
  discipline,
  skipCache = false,
}: FetchEventsOptions): Promise<GetEventsResponse> => {
  if (!skipCache) {
    const cachedData = getEventsFromCache(discipline);
    if (cachedData) {
      return { events: cachedData };
    }
  }

  const proxyUrl = buildProxyRequestUrl(url, { type: discipline });

  const handleResponse = (
    response: SimpleResponse<GetEventsResponse>,
  ): GetEventsResponse => {
    const data = response.data;
    setEventsToCache(discipline, data.events);
    return data;
  };

  const handleError = (error: unknown): GetEventsResponse => {
    return { events: [], error: `${error}` };
  };

  return simple(proxyUrl)
    .fetch<GetEventsResponse>()
    .then(handleResponse)
    .catch(handleError);
};
