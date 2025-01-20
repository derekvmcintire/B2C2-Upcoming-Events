import { FetchRegistrationsResponse } from "../types";
import { normalizeDate } from "./utility";

// registrationCache.js - Cache utility with TTL for fetchRegistrations
const registrationCache = new Map();
const TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Generate a unique cache key based on the eventType and normalized after date.
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 * @returns {string} - The unique cache key.
 */
function generateCacheKey(eventType: string, after: Date): string {
  const normalizedDate = normalizeDate(after).toISOString();
  return `${eventType}-${normalizedDate}`;
}

/**
 * Get data from the cache based on eventType and after date.
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 * @returns {any} - Cached data or null if not found or expired.
 */
export function getRegistrationsFromCache(eventType: string, after: Date): any {
  const cacheKey = generateCacheKey(eventType, after);
  const cached = registrationCache.get(cacheKey);

  if (!cached) {
    return null;
  }

  const isExpired = Date.now() - cached.timestamp > TTL;
  if (isExpired) {
    // Cache expired, remove it
    registrationCache.delete(cacheKey);
    return null;
  }

  return cached.data;
}

/**
 * Save data to the cache with a specific eventType and after date.
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 * @param {any} data - The data to cache.
 */
export function setRegistrationsToCache(eventType: string, after: Date, data: FetchRegistrationsResponse) {
  const cacheKey = generateCacheKey(eventType, after);
  registrationCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Clear the cache for a specific eventType and after date.
 * @param {string} eventType - The event type (discipline).
 * @param {Date} after - The "after" date.
 */
export function clearRegistrationCache(eventType: string, after: Date) {
  const cacheKey = generateCacheKey(eventType, after);
  console.log(`Clearing registration cache for: ${cacheKey}`);
  registrationCache.delete(cacheKey);
}

/**
 * Clear the entire registration cache.
 */
export function clearAllRegistrationCache() {
  console.log('Clearing all registration cache');
  registrationCache.clear();
}
