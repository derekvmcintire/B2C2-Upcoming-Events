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