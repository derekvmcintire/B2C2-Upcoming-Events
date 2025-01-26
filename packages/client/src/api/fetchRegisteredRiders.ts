import { formatDateToString } from "../utils/dates";
import { EventDiscipline, FetchRegistrationsResponse } from "../types";
import {
  getRegistrationsFromCache,
  setRegistrationsToCache,
} from "../infrastructure/registration-cache";
import { normalizeDate } from "../infrastructure/utility";
import { buildProxyRequestUrl } from "./utility";
import { simple } from "simple-fetch-ts";

const CROSS_RESULTS_API_BASE_URL = "https://www.crossresults.com";
const url = `${CROSS_RESULTS_API_BASE_URL}/api/b2c2lookup.php`;

type FetchRegistrationOptions = {
  eventType: EventDiscipline;
  after: Date;
  skipCache: boolean;
};

/**
 * Fetches event registrations either from cache or by making a request to a third-party API via a proxy.
 *
 * The function first checks if the requested event data is available in the cache. If found, it returns the cached data.
 * If not found, it constructs a request to a third-party API using the proxy server to fetch the data.
 * The result is then cached for future use.
 *
 * @param eventType - The type of event to fetch registrations for.
 * @param after - The date after which to fetch the event registrations (defaults to the current date).
 *
 * @returns A promise that resolves with the event registration data, or logs an error if the request fails.
 */
export const fetchRegistrations = async ({
  eventType,
  after = new Date(),
  skipCache = false,
}: FetchRegistrationOptions) => {
  // Normalize the date before using it in the cache
  const normalizedAfter = normalizeDate(after);

  if (!skipCache) {
    const cachedData = getRegistrationsFromCache(eventType, normalizedAfter);
    if (cachedData) {
      return cachedData;
    }
  }

  // If not in cache, fetch from API
  const afterAsString = formatDateToString(normalizedAfter);

  const params = {
    eventType,
    after: afterAsString,
  };

  const proxyUrl = buildProxyRequestUrl(url, params);
  // const response = await fetch(proxyUrl);
  const response = await simple(proxyUrl).fetch<FetchRegistrationsResponse>();

  const data = response.data;

  // Cache the fetched data for future use
  setRegistrationsToCache(eventType, normalizedAfter, data);

  return data;
};
