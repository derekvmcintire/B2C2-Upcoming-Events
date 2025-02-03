import { simple, type SimpleResponse } from "simple-fetch-ts";
import { buildProxyRequestUrl } from "./utility";
import { B2C2_API_BASE_URL } from "../constants";
import { EventDiscipline, Housing } from "../types";

const url = `${B2C2_API_BASE_URL}/api/updateEvent`;

export type UpdateEventData = {
  eventId: string;
  eventType: EventDiscipline;
  housingUrl?: string | null; // null for deleting
  interestedRiders?: string[];
  committedRiders?: string[];
  description?: string;
  housing?: Housing;
};

export type UpdateEventResponse = {
  message: string;
  success?: boolean;
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
): Promise<UpdateEventResponse> => {
  const proxyUrl = buildProxyRequestUrl(url);

  return simple(proxyUrl)
    .body<UpdateEventData>(data)
    .patch<UpdateEventResponse>()
    .then((response: SimpleResponse<UpdateEventResponse>) => {
      return {
        message: response.data.message,
        success: true,
      };
    })
    .catch((error: Error) => {
      const message = error?.message || "Unknown Error";
      return {
        message,
        success: false,
      };
    });
};
