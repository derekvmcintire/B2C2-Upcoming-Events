/**
 * Normalize a date to the start of the day (midnight).
 *
 * This function ensures consistency by setting the time of the given
 * date to 00:00:00.000 (midnight).
 *
 * @param {Date} date - The date to normalize.
 * @returns {Date} - A new Date object normalized to the start of the day.
 */
export function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}
