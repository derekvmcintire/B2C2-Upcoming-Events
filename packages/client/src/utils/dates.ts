/*
// Example usage
const date = new Date(); // Current date
console.log(formatDateToYYYYMMDD(date)); // Outputs: YYYY-MM-DD
*/
export const formatDateToString = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid input: Expected a Date object");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* 

=================================

*/

/**
 * Formats a date from a form input into a consistent ISO string without time or timezone.
 * @param dateString - The date string from the form input (YYYY-MM-DD)
 * @returns ISO date string in format "YYYY-MM-DDT00:00:00.000+00:00"
 */
export const formatDateForStorage = (dateString: string): string => {
  // Create date in UTC from the input date string
  // The input date string will be in format YYYY-MM-DD
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a date object using UTC to avoid timezone shifts
  const date = new Date(Date.UTC(year, month - 1, day));

  // Format to ISO string and replace the 'Z' with +00:00 to maintain consistency
  return date.toISOString().replace("Z", "+00:00");
};

/**
 * Normalizes a date string to UTC, handling both timezone-offset format and UTC format
 * @param dateString - The date string to normalize
 * @returns Date string in UTC
 */
export const normalizeToUTCDate = (dateString: string): Date => {
  // Extract just the date part, ignoring time and timezone
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);

  // Create a new date in UTC
  return new Date(Date.UTC(year, month - 1, day));
};

/**
 * Formats a stored date string into a human-readable format.
 * Works with both:
 * - UTC format ("2025-07-26T00:00:00.000+00:00")
 * - Timezone offset format ("2025-03-02T00:00:00.000-05:00")
 * @param dateString - The stored ISO date string
 * @returns Formatted date string (e.g., "Sunday, March 2, 2025")
 */
export const formatEventDate = (dateString: string): string => {
  const date = normalizeToUTCDate(dateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Force UTC interpretation
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

/**
 * Extracts the weekday, day of the month, and month from a stored date string.
 * Works with both:
 * - UTC format ("2025-07-26T00:00:00.000+00:00")
 * - Timezone offset format ("2025-03-02T00:00:00.000-05:00")
 * @param dateString - The stored ISO date string
 * @returns Object with { weekday, month, day }
 */
export const formatCalendarDate = (dateString: string): { 
  weekday: string; 
  month: string; 
  day: number;
} => {
  const date = normalizeToUTCDate(dateString);

  return {
    weekday: new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(date), // e.g., "Sunday"
    month: new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(date), // e.g., "March"
    day: date.getUTCDate(), // Numeric day (e.g., 2)
  };
};


/**
 * Validates and normalizes a date for form display
 * @param isoString - The ISO date string from storage
 * @returns YYYY-MM-DD format for form input
 */
export const formatDateForForm = (isoString: string): string => {
  const date = normalizeToUTCDate(isoString);
  return date.toISOString().split("T")[0];
};

/**
 * Formats a date into a short date string (MM/DD).
 * @param date - The date to format.
 * @returns The formatted short date string.
 * @throws Error if the input is not a Date object.
 */
export const formatShortDate = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid input: Expected a Date object");
  }

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}/${day}`;
};
