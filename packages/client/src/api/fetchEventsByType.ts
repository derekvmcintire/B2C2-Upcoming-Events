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
 *
 * This function first checks the cache for events associated with the given discipline. If the cache is not skipped and contains data, it returns the cached data.
 * Otherwise, it constructs a URL with the event discipline, sends a request to the backend API via the proxy, and returns the response containing the event data.
 *
 * @param {FetchEventsOptions} options - Options for fetching events, including the event discipline and cache behavior.
 * @param {EventDiscipline} options.discipline - The discipline of events to fetch (e.g., "road", "cx").
 * @param {boolean} [options.skipCache=false] - Whether to skip the cache and fetch data directly from the API.
 * @returns {Promise<GetEventsResponse>} A promise that resolves to the response data of discipline `GetEventsResponse`.
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

  /**
   * Handles the response from the backend API.
   *
   * @param {SimpleResponse<GetEventsResponse>} response - The API response.
   * @returns {GetEventsResponse} The processed event data.
   */
  const handleResponse = (
    response: SimpleResponse<GetEventsResponse>,
  ): GetEventsResponse => {
    const data = response.data;
    setEventsToCache(discipline, data.events);
    return data;
  };

  /**
   * Handles errors during the fetch operation.
   *
   * @param {unknown} error - The error encountered during the fetch operation.
   * @returns {GetEventsResponse} The default error response.
   */
  const handleError = (error: unknown): GetEventsResponse => {
    return { events: [], error: `${error}` };
  };

  return simple(proxyUrl)
    .fetch<GetEventsResponse>()
    .then(handleResponse)
    .catch(handleError);
};
