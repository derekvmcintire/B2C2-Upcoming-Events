export function normalizeDate(date: Date): Date {
  // Normalize to the start of the day (midnight) for consistency
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}