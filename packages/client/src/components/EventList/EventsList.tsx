import { ScrollArea, Text } from "@mantine/core";
import { useEventsContext } from "../../context/events-context";
import EventCard from "../EventCard";
import { EventDiscipline, type Discipline } from "../../types";
import classes from "./event-list.module.css";

interface EventsListProps {
  discipline: Discipline;
  requestDataCallback: (eventType: EventDiscipline) => void;
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
export default function EventsList({
  discipline,
  requestDataCallback,
}: EventsListProps): JSX.Element {
  const eventsContext = useEventsContext();
  const { events, registrations, registrationsLoading } = eventsContext;

  const getEventDetails = () => {
    return registrationsLoading ? (
      <div className={classes.loading}>Loading...</div>
    ) : (
      <ScrollArea h="100%" className={classes.eventListScrollArea}>
        {events.map((event, i) => {
          const isLight = i % 2 === 0;
          return (
            <EventCard
              key={event.eventId}
              event={event}
              registrations={registrations}
              requestDataCallback={requestDataCallback}
              isLight={isLight}
            />
          );
        })}
      </ScrollArea>
    );
  };

  return events.length < 1 ? (
    <Text mt="16">{`No ${discipline.text} events found.`}</Text>
  ) : (
    getEventDetails()
  );
}
