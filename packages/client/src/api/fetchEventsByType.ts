import { simple } from "simple-fetch-ts";
import { GetEventsResponse } from "../types";
import { buildProxyRequestUrl } from "./utility";
import { B2C2_API_BASE_URL } from "../constants";

const url = `${B2C2_API_BASE_URL}/api/getEventsByType`;

/**
 * Fetches events by their type from the backend API.
 * This function constructs a URL with the provided event type, makes a request to the backend API via the proxy,
 * and returns the response containing the event data.
 *
 * @param type - The type of events to fetch (e.g., "upcoming", "past").
 * @returns A promise that resolves to the response data of type `GetEventsResponse`.
 */
export const fetchEventsByType = async (
  type: string,
): Promise<GetEventsResponse> => {
  const params = { type };
  const proxyUrl = buildProxyRequestUrl(url, params);
  const response = await simple(proxyUrl).fetch<GetEventsResponse>();

  console.log("fetched events: ", response.data);

  return response.data;
};
