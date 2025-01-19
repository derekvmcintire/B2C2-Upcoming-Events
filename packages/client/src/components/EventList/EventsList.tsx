import { Text } from '@mantine/core';
import { useEventsContext } from '../../context/events-context';
import EventDetails from '../EventDetails';
import { type Discipline } from '../../types';

interface EventsListProps {
    discipline: Discipline
}

/**
 * Renders a list of events or a message if no events are available.
 * @param {EventsListProps} props - The props for the component.
 * @returns {JSX.Element} The EventsList component.
 */
export default function EventsList({ discipline }: EventsListProps): JSX.Element {
    const eventsContext = useEventsContext();
    const { events, registrations } = eventsContext;

    return events.length < 1 ? (
        <Text mt="16">{`No ${discipline.text} events found.`}</Text>
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
