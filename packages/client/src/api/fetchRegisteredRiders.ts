import { formatDateToString } from "../utils/dates";
import { EventDisciplineParam, FetchRegistrationsResponse } from "../types";
import {
  getRegistrationsFromCache,
  setRegistrationsToCache,
} from "../infrastructure/registration-cache";
import { normalizeDate } from "../infrastructure/utility";
import { buildProxyRequestUrl } from "./utility";
import { simple, SimpleResponse } from "simple-fetch-ts";

const CROSS_RESULTS_API_BASE_URL = "https://www.crossresults.com";
const url = `${CROSS_RESULTS_API_BASE_URL}/api/b2c2lookup.php`;

type FetchRegistrationsOptions = {
  discipline: EventDisciplineParam;
  after: Date;
  skipCache?: boolean;
};

/**
 * Fetches event registrations either from cache or by making a request to a third-party API via a proxy.
 *
 * The function first checks if the requested event data is available in the cache. If found, it returns the cached data.
 * If not found, it constructs a request to a third-party API using the proxy server to fetch the data.
 * The result is then cached for future use.
 *
 * @param {FetchRegistrationsOptions} options - Options for fetching event registrations.
 * @param {EventDisciplineParam} options.discipline - The type of event to fetch registrations for.
 * @param {Date} options.after - The date after which to fetch the event registrations (defaults to the current date).
 * @param {boolean} [options.skipCache=false] - Whether to skip the cache and fetch data directly from the API.
 *
 * @returns {Promise<FetchRegistrationsResponse>} A promise that resolves with the event registration data, or logs an error if the request fails.
 */
export const fetchRegistrations = async ({
  discipline,
  after = new Date(),
  skipCache = false,
}: FetchRegistrationsOptions): Promise<FetchRegistrationsResponse> => {
  // Normalize the date before using it in the cache
  after.setDate(after.getDate() - 1); // start from yesterday just to be sure we get registrations for today
  const normalizedAfter = normalizeDate(after);

  if (!skipCache) {
    const cachedData = getRegistrationsFromCache(discipline, normalizedAfter);
    if (cachedData) {
      return cachedData;
    }
  }

  const afterAsString = formatDateToString(normalizedAfter);
  const params = {
    discipline,
    after: afterAsString,
  };
  const proxyUrl = buildProxyRequestUrl(url, params);

  /**
   * Handles the response from the third-party API.
   *
   * @param {SimpleResponse<FetchRegistrationsResponse>} response - The API response.
   * @returns {FetchRegistrationsResponse} The processed registration data.
   */
  const handleResponse = (
    response: SimpleResponse<FetchRegistrationsResponse>,
  ): FetchRegistrationsResponse => {
    const data = response.data;
    setRegistrationsToCache(discipline, normalizedAfter, data);
    return data;
  };

  /**
   * Handles errors during the fetch operation.
   *
   * @param {unknown} error - The error encountered during the fetch operation.
   * @returns {FetchRegistrationsResponse} The default error response.
   */
  const handleError = (error: unknown): FetchRegistrationsResponse => {
    return { error: `${error}` };
  };

  return simple(proxyUrl)
    .fetch<FetchRegistrationsResponse>()
    .then(handleResponse)
    .catch(handleError);
};
