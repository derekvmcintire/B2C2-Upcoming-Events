import { Text } from '@mantine/core';
import { useEventsContext } from '../../context/events-context';
import EventDetails from '../EventDetails';
import { type Event } from "../../types";

interface EventsListProps {
    events: Event[];
    type: string
}
export default function EventsList({ events, type } : EventsListProps) {
    const eventsContext = useEventsContext();
    const { registrations } = eventsContext;

    return events.length < 1 ? (
        <>
            <Text mt="16">{`No ${type} events found.`}</Text>
        </>
    ) : (
        <>
        {events.map((event) => (
          <EventDetails key={event.eventId} event={event} registrations={registrations} />
        ))}
        </>
    )
}
