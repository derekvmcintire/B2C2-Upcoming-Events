import { FetchEventsWithRegisteredRidersResponse, EventEntry } from "../types";

/**
 * Retrieves all entries in the API response that match the given event ID.
 * 
 * @param response - The API response object
 * @param eventId - The event ID to match
 * @returns An array of matching entries
 */
export function getEntriesByEventId(response: FetchEventsWithRegisteredRidersResponse, eventId: number): EventEntry[] {
  const matchingEntries: EventEntry[] = [];

  for (const key in response) {
    // Skip the "query" field and ensure it's a valid EventEntry
    if (key === "query" || typeof response[key] !== "object") {
      continue;
    }

    const entry = response[key] as EventEntry;

    // Check if the EventID matches the given eventId
    if (entry.EventID === eventId) {
      matchingEntries.push(entry);
    }
  }

  return matchingEntries;
}

/*
// Example usage
const apiResponse: ApiResponse = {
  "0": {
    "0": 64758,
    "1": "Crossasaurus Awesome- PACX",
    "2": "Colin",
    "3": "Reuter",
    "4": "Mens Masters 40+ (Cat. 1/2/3/4 )",
    "5": {
      date: "2024-10-05 00:00:00.000000",
      timezone_type: 3,
      timezone: "America/New_York",
    },
    "6": {
      date: "2024-10-05 00:00:00.000000",
      timezone_type: 3,
      timezone: "America/New_York",
    },
    EventID: 64758,
    EventName: "Crossasaurus Awesome- PACX",
    FirstName: "Colin",
    LastName: "Reuter",
    Category: "Mens Masters 40+ (Cat. 1/2/3/4 )",
    EventDate: {
      date: "2024-10-05 00:00:00.000000",
      timezone_type: 3,
      timezone: "America/New_York",
    },
    EventEndDate: {
      date: "2024-10-05 00:00:00.000000",
      timezone_type: 3,
      timezone: "America/New_York",
    },
  },
  query: "Select Entries.EventID,EventName,Fname as FirstName,lname as LastName,...",
};

const matchingEntries = getEntriesByEventId(apiResponse, 64758);
console.log(matchingEntries);
*/