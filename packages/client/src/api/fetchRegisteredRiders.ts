import { formatDateToString } from "../utils/dates";
import { FetchRegistrationsResponse } from "../types";

export const fetchRegistrations = async (eventType: string, after: Date = new Date()) => {
  const afterAsString = formatDateToString(after);
  const url = `/api/proxy?eventType=${eventType}&after=${afterAsString}`
  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: FetchRegistrationsResponse = await response.json();
      return data;
  } catch (error) {
      console.error('Failed to fetch event data:', error);
  }
};
