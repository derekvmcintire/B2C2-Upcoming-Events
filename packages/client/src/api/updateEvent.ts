import { simple, type SimpleResponse } from "simple-fetch-ts";
import { buildProxyRequestUrl } from "./utility";
import { B2C2_API_BASE_URL } from "../constants";
import { EventDiscipline } from "../types";

const url = `${B2C2_API_BASE_URL}/api/updateEvent`;

export type UpdateEventData = {
  eventId: string;
  eventType: EventDiscipline;
  housingUrl?: string | null; // null for deleting
  interestedRiders?: string[];
};

export type UpdateEventResponse = {
  message: string;
};

/**
 * Sends a request to the backend API to update an existing event.
 * This function constructs the request URL, sends the event data via a POST request to the backend API through the proxy,
 * and returns the response data.
 *
 * @param data - The event data to send to the backend API.
 * @returns A promise that resolves to the response data from the API, which may contain success or error details.
 */
export const updateEvent = async (
  data: UpdateEventData,
): Promise<SimpleResponse<UpdateEventResponse>> => {
  const proxyUrl = buildProxyRequestUrl(url);

  const response = await simple(proxyUrl)
    .body<UpdateEventData>(data)
    .patch<UpdateEventResponse>();

  return response;
};
