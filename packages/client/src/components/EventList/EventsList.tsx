import { Text } from '@mantine/core';
import { useEventsContext } from '../../context/events-context';
import EventDetails from '../EventDetails';
import { type Event } from "../../types";

interface EventsListProps {
    events: Event[];
    type: string;
}

/**
 * Renders a list of events or a message if no events are available.
 * @param {EventsListProps} props - The props for the component.
 * @returns {JSX.Element} The EventsList component.
 */
export default function EventsList({ events, type }: EventsListProps): JSX.Element {
    const eventsContext = useEventsContext();
    const { registrations } = eventsContext;

    return events.length < 1 ? (
        <Text mt="16">{`No ${type} events found.`}</Text>
    ) : (
        <>
            {events.map((event) => (
                <EventDetails 
                    key={event.eventId} 
                    event={event} 
                    registrations={registrations} 
                />
            ))}
        </>
    );
}
