import { Text } from "@mantine/core";
import { useEventsContext } from "../../context/events-context";
import { type Discipline } from "../../types";
import ExpandableTable from "../ExpandableEventsTable/ExpandableTable";
import Loading from "../Shared/Loading";

interface EventsListProps {
  discipline: Discipline;
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
}: EventsListProps): JSX.Element {
  const eventsContext = useEventsContext();
  const { events, registrations, registrationsLoading } = eventsContext;

  /**
   * Retrieves the event details.
   * @returns JSX.Element representing the event details.
   */
  const getEventDetails = () => {
    return registrationsLoading ? (
      <Loading />
    ) : (
      <>
        <ExpandableTable events={events} registrations={registrations} />
      </>
    );
  };

  return events.length < 1 ? (
    <Text
      mt="16"
      data-testid="no-events-found"
    >{`No ${discipline.text} events found.`}</Text>
  ) : (
    getEventDetails()
  );
}
