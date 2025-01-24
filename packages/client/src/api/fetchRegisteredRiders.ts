import { formatDateToString } from "../utils/dates";
import { FetchRegistrationsResponse } from "../types";
import {
  getRegistrationsFromCache,
  setRegistrationsToCache,
} from "../infrastructure/registration-cache";
import { normalizeDate } from "../infrastructure/utility";
import { buildProxyRequestUrl } from "./utility";

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
export const fetchRegistrations = async (
  eventType: string,
  after: Date = new Date(),
) => {
  // Normalize the date before using it in the cache
  const normalizedAfter = normalizeDate(after);

  // Check cache first
  const cachedData = getRegistrationsFromCache(eventType, normalizedAfter);
  if (cachedData) {
    return cachedData;
  }

  // If not in cache, fetch from API
  const afterAsString = formatDateToString(normalizedAfter);
  const apiUrl = `https://www.crossresults.com/api/b2c2lookup.php`; // The base URL for your third-party API
  const params = {
    eventType,
    after: afterAsString,
  };

  try {
    // Construct the URL to call the serverless proxy with the target API URL and query parameters
    const url = buildProxyRequestUrl(apiUrl, params);

    // Fetch the data from the proxy
    const response = await fetch(url);

    // Check for successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse and return the response JSON
    const data: FetchRegistrationsResponse = await response.json();

    // Cache the fetched data for future use
    setRegistrationsToCache(eventType, normalizedAfter, data);

    return data;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
  }
};
