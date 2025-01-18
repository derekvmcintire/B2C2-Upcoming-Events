/*
const event = {
  eventId: "69168",
  name: "The Frozen Four 2025: Matt Catania Memorial",
  date: "2025-03-02T00:00:00.000-05:00",
  city: "Farmington",
  state: "CT",
  eventUrl: "https://www.bikereg.com/the-frozen-four-1-2025",
  eventType: "road"
};

const readableDate = formatEventDate(event.date);
console.log(readableDate); // Output: "Sunday, March 2, 2025"
*/
export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);

  // You can adjust the options to match the desired format
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // e.g. "Monday"
    year: 'numeric', // e.g. "2025"
    month: 'long',   // e.g. "March"
    day: 'numeric',  // e.g. "2"
  };

  // Format the date
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

/*
// Example usage
const date = new Date(); // Current date
console.log(formatDateToYYYYMMDD(date)); // Outputs: YYYY-MM-DD
*/
export const formatDateToString = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid input: Expected a Date object');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


