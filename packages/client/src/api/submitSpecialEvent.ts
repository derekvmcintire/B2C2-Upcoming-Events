import { simple } from "simple-fetch-ts";
import { EventType } from "../types";
import { buildProxyRequestUrl } from "./utility";
import { B2C2_API_BASE_URL } from "../constants";

const url = `${B2C2_API_BASE_URL}/api/submitSpecialEvent`;

/**
 * Submits a new special event to the backend API.
 * This function constructs the request URL, sends the special event submission data via a POST request to the backend API through the proxy,
 * and returns the response data after the submission.
 *
 * @param submission - The special event submission data to send to the backend API.
 * @returns A promise that resolves to the response data from the API, which may contain success or error details.
 */
export const submitSpecialEvent = async (submission: EventType) => {
  const proxyUrl = buildProxyRequestUrl(url);

  const response = await simple(proxyUrl).body<EventType>(submission).post();

  return response.data;
};
