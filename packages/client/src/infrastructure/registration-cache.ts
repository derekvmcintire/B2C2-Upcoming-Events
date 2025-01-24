import Cache from "./cache";
import { FetchRegistrationsResponse } from "../types";
import { normalizeDate } from "./utility";
import { TTL_FIVE_MINUTES } from "./constants";

const registrationCache = new Cache<FetchRegistrationsResponse>(
  TTL_FIVE_MINUTES,
);

/**
 * Generate a unique cache key based on the eventType and normalized after date.
 *
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 * @returns {string} - The unique cache key.
 */
function generateCacheKey(eventType: string, after: Date): string {
  const normalizedDate = normalizeDate(after).toISOString();
  return `${eventType}-${normalizedDate}`;
}

/**
 * Retrieves cached registration data for a given event type and after date.
 *
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 * @returns {FetchRegistrationsResponse | null} - Cached registration data if found and not expired, or `null` if not found or expired.
 */
export function getRegistrationsFromCache(
  eventType: string,
  after: Date,
): FetchRegistrationsResponse | null {
  const cacheKey = generateCacheKey(eventType, after);
  return registrationCache.get(cacheKey);
}

/**
 * Saves registration data to the cache for a given event type and after date.
 *
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 * @param {FetchRegistrationsResponse} data - The registration data to cache.
 */
export function setRegistrationsToCache(
  eventType: string,
  after: Date,
  data: FetchRegistrationsResponse,
): void {
  const cacheKey = generateCacheKey(eventType, after);
  registrationCache.set(cacheKey, data);
}

/**
 * Clears the cached registration data for a given event type and after date.
 *
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 */
export function clearRegistrationCache(eventType: string, after: Date): void {
  const cacheKey = generateCacheKey(eventType, after);
  registrationCache.clear(cacheKey);
}

/**
 * Clears the entire registration cache.
 */
export function clearAllRegistrationCache(): void {
  registrationCache.clearAll();
}
