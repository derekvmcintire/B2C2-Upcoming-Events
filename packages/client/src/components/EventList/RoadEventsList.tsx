import { FetchRegistrationsResponse, type Event } from "../../types";
import EventDetails from '../EventDetails';

interface RoadEventsListProps {
    events: Event[],
    registrations?: FetchRegistrationsResponse
}
export default function RoadEventsList({ events, registrations }: RoadEventsListProps) {
    return (
        <>
        {events.map((event) => (
          <EventDetails key={event.eventId} event={event} registrations={registrations} />
        ))}
        </>
    )
}
