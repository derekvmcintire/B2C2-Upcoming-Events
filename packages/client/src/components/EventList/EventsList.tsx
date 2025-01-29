import { Text } from "@mantine/core";
import { useEventsContext } from "../../context/events-context";
import { EventDiscipline, type Discipline } from "../../types";
import classes from "./event-list.module.css";
import ExpandableTable from "../ExpandableEventsTable/ExpandableTable";

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

  /**
   * Retrieves the event details.
   * @returns JSX.Element representing the event details.
   */
  const getEventDetails = () => {
    return registrationsLoading ? (
      <div className={classes.loading} data-testid="loading">Loading...</div>
    ) : (
      <>
        <ExpandableTable
          data-testid="expandable-table"
          events={events}
          registrations={registrations}
          requestDataCallback={requestDataCallback}
        />
      </>
    );
  };

  return events.length < 1 ? (
    <Text mt="16" data-testid="no-events-found">{`No ${discipline.text} events found.`}</Text>
  ) : (
    getEventDetails()
  );
}
