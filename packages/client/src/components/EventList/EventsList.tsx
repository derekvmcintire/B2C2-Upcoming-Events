import { Text } from '@mantine/core';
import { useEventsContext } from '../../context/events-context';
import EventDetails from '../EventDetails';
import { type Discipline } from '../../types';

interface EventsListProps {
    discipline: Discipline
}

/**
 * EventsList Component
 * 
 * Renders a list of events based on the selected discipline, or a message indicating no events are available.
 * Maps through the `events` array from context and displays each event using the `EventDetails` component.
 * 
 * - Displays a message if no events are found for the selected discipline.
 * - For each event, it renders the `EventDetails` component, passing in the event and registrations data.
 * 
 * @param {EventsListProps} props - The props for the component, including the `discipline` to filter events by.
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
