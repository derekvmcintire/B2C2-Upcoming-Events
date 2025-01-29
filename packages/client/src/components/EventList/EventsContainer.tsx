import { Stack, Tabs } from "@mantine/core";
import { useEffect } from "react";
import { useEventsContext } from "../../context/events-context";
import { DISCIPLINES } from "../../constants";
import classes from "./event-list.module.css";
import EventTabs from "../EventListTabs.tsx/EventTabs";
import EventPanels from "../EventListTabs.tsx/EventPanels";
import { useEventData } from "../../hooks/useEventData";
import { useTabState } from "../../hooks/useTabState";

/**
 * EventsContainer Component
 *
 * Renders a tabbed interface for events categorized by discipline
 * (Road, Cyclocross, Cross Country). Fetches and caches event data
 * per discipline, and fetches registrations for the "Road" discipline.
 *
 * - Defaults to the Road discipline on mount.
 * - Fetches data on tab change, using cached events when available.
 */
const EventsContainer = (): JSX.Element => {
  const DEFAULT_DISCIPLINE = DISCIPLINES.ROAD;
  const { activeTab, handleTabChange } = useTabState(
    DEFAULT_DISCIPLINE.text,
    false,
    false,
  );
  const { getRegisteredRiders, getEvents, requestFreshDataForEventType } =
    useEventData();

  const eventsContext = useEventsContext();
  const { eventsLoading } = eventsContext;

  /**
   * Fetches registrations and events data when the component is mounted.
   */
  useEffect(() => {
    getRegisteredRiders({ disciplineParam: DEFAULT_DISCIPLINE.queryParam });
    getEvents({ disciplineId: DEFAULT_DISCIPLINE.id });
  }, [
    getRegisteredRiders,
    getEvents,
    DEFAULT_DISCIPLINE.id,
    DEFAULT_DISCIPLINE.queryParam,
  ]);

  return (
    <Stack>
      <Tabs
        data-testid="event-tabs"
        value={activeTab}
        onChange={handleTabChange}
        defaultValue={DISCIPLINES.ROAD.text}
        className={classes.eventList}
        mb="64"
      >
        <EventTabs />
        <EventPanels
          data-testid="events-panels"
          eventsLoading={eventsLoading}
          requestFreshDataForEventType={requestFreshDataForEventType}
        />
      </Tabs>
    </Stack>
  );
};

export default EventsContainer;
