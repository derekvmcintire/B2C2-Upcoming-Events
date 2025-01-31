import { simple, SimpleResponse } from "simple-fetch-ts";
import { buildProxyRequestUrl } from "./utility";

const NOMINATIM_API_BASE_URL = "https://nominatim.openstreetmap.org/search";

type FetchCoordinatesResponse = {
  lat: string;
  lon: string;
}[];

type FetchCoordinatesOptions = {
  city: string;
  state: string;
};

/**
 * Fetches the latitude and longitude of a given city and state through a proxy.
 *
 * The function constructs a request to the Nominatim API using the proxy server to fetch the data.
 * The result is then returned as a latitude and longitude object.
 *
 * @param {FetchCoordinatesOptions} options - Options for fetching coordinates.
 * @param {string} options.city - The city name.
 * @param {string} options.state - The state name.
 *
 * @returns {Promise<{ lat: number; lon: number } | null>} A promise resolving to the location coordinates, or null if not found.
 */
export const fetchCoordinates = async ({
  city,
  state,
}: FetchCoordinatesOptions): Promise<{ lat: number; lon: number } | null> => {
  const url = `${NOMINATIM_API_BASE_URL}?format=json&q=${city},${state},USA`;

  const proxyUrl = buildProxyRequestUrl(url);

  /**
   * Handles the response from the proxy API.
   *
   * @param {SimpleResponse<FetchCoordinatesResponse>} response - The API response.
   * @returns {{ lat: number; lon: number } | null} The processed coordinates.
   */
  const handleResponse = (
    response: SimpleResponse<FetchCoordinatesResponse>,
  ): { lat: number; lon: number } | null => {
    const data = response.data;
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    return null;
  };

  /**
   * Handles errors during the fetch operation.
   *
   * @param {unknown} error - The error encountered during the fetch operation.
   * @returns {null} Null to indicate failure.
   */
  const handleError = (error: unknown): null => {
    console.error("Error fetching coordinates:", error);
    return null;
  };

  return simple(proxyUrl)
    .fetch<FetchCoordinatesResponse>()
    .then(handleResponse)
    .catch(handleError);
};
