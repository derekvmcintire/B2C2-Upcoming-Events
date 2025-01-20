import { formatDateToString } from "../utils/dates";
import { FetchRegistrationsResponse } from "../types";
import { 
  getRegistrationsFromCache, 
  setRegistrationsToCache 
} from "../infrastructure/registration-cache";
import { normalizeDate } from "../infrastructure/utility";
  
export const fetchRegistrations = async (eventType: string, after: Date = new Date()) => {
    // Normalize the date before using it in the cache
    const normalizedAfter = normalizeDate(after);

    // Check cache first
    const cachedData = getRegistrationsFromCache(eventType, normalizedAfter);
    if (cachedData) {
    console.log('Returning cached registrations');
    return cachedData;
    }

    // If not in cache, fetch from API
    const afterAsString = formatDateToString(normalizedAfter);
    const url = `/api/proxy?eventType=${eventType}&after=${afterAsString}`;

    try {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: FetchRegistrationsResponse = await response.json();

    // Cache the fetched data
    setRegistrationsToCache(eventType, normalizedAfter, data);

    return data;
    } catch (error) {
    console.error('Failed to fetch event data:', error);
    }
};
