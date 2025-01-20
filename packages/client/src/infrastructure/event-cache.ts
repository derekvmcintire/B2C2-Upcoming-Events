import Cache from "./cache";
import { EventType } from "../types";
import { TTL_FIVE_MINUTES } from "./constants";

const eventCache = new Cache<EventType[]>(TTL_FIVE_MINUTES);

/**
 * Retrieves cached event data for a given discipline ID.
 * 
 * @param {string} disciplineId - The unique identifier for the discipline.
 * @returns {EventType[] | null} - The cached events for the discipline if found and not expired, or `null` if not found or expired.
 */
export function getEventsFromCache(disciplineId: string): EventType[] | null {
  return eventCache.get(disciplineId);
}

/**
 * Saves event data to the cache for a given discipline ID.
 * 
 * @param {string} disciplineId - The unique identifier for the discipline.
 * @param {EventType[]} events - The list of events to cache.
 */
export function setEventsToCache(disciplineId: string, events: EventType[]): void {
  eventCache.set(disciplineId, events);
}

/**
 * Clears the cached event data for a given discipline ID.
 * 
 * @param {string} disciplineId - The unique identifier for the discipline.
 */
export function clearEventCache(disciplineId: string): void {
  eventCache.clear(disciplineId);
}
