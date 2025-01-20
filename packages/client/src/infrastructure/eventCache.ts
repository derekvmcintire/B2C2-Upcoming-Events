import { EventType } from "../types";

const eventCache = new Map();
const TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export function getEventsFromCache(disciplineId: string) {
  const cached = eventCache.get(disciplineId);
  
  if (!cached) {
    console.log('cache miss')
    return null;
  }

  const isExpired = Date.now() - cached.timestamp > TTL;
  if (isExpired) {
    console.log('cache expired')
    // Cache expired, remove it
    eventCache.delete(disciplineId);
    return null;
  }

  console.log('returning cached data')
  return cached.data;
}

export function setEventsToCache(disciplineId: string, events: EventType[]) {
  console.log('saving datat to cache')
  eventCache.set(disciplineId, {
    data: events,
    timestamp: Date.now(),
  });
}

export function clearCache(disciplineId: string) {
  console.log(`Clearing cache for discipline: ${disciplineId}`);
  eventCache.delete(disciplineId); // Removes the cache for the specific discipline
}
