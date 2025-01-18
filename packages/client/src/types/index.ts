export type Event = {
  eventId: string;
  name: string;
  date: string; // ISO 8601 date string (you can parse it into a Date object if needed)
  city: string;
  state: string;
  eventUrl: string;
  eventType: 'road' | 'cx' | 'xc';
};

export const mockEvents: Event[] = [
      {
          eventId: "69168",
          name: "The Frozen Four 2025: Matt Catania Memorial",
          date: "2025-03-02T00:00:00.000-05:00",
          city: "Farmington",
          state: "CT",
          eventUrl: "https://www.bikereg.com/the-frozen-four-1-2025",
          eventType: "road"
      },
      {
          eventId: "68315",
          name: "Buzz the Tower",
          date: "2025-03-29T00:00:00.000-04:00",
          city: "Charlestown",
          state: "RI",
          eventUrl: "https://www.bikereg.com/buzz-the-tower",
          eventType: "road"
      }
  ];

export type GetEventsResponse = {
  events: Event[]
}