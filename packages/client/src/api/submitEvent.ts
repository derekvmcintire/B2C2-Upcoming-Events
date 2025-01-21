import { simple } from "simple-fetch-ts";
import { EventSubmission } from "../types";
import { buildProxyRequestUrl } from "./utility";
import { B2C2_API_BASE_URL } from "../constants";

const url = `${B2C2_API_BASE_URL}/api/submitEvent`

/**
 * Submits a new event to the backend API.
 * This function constructs the request URL, sends the event submission data via a POST request to the backend API through the proxy,
 * and returns the response data after the submission.
 *
 * @param submission - The event submission data to send to the backend API.
 * @returns A promise that resolves to the response data from the API, which may contain success or error details.
 */
export const submitEvent = async (submission: EventSubmission) => {
  const proxyUrl = buildProxyRequestUrl(url);

  const response = await simple(proxyUrl)
    .body<EventSubmission>(submission)
    .post();

  return response.data;
}
