import { Stack, Tabs } from "@mantine/core";
import { useEffect } from "react";
import { useEventsContext } from "../../context/events-context";
import { DISCIPLINES } from "../../constants";
import classes from "./event-list.module.css";
import EventTabs from "../EventListTabs.tsx/EventTabs";
import EventPanels from "../EventListTabs.tsx/EventPanels";
import { useEventData } from "../../hooks/useEventData";
import { useTabState } from "../../hooks/useTabState";

const DEFAULT_DISCIPLINE = DISCIPLINES.ROAD;

// Helper to map URL parameter to discipline
const getDisciplineFromUrl = (): string => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab") || window.location.hash.replace("#", "");

  switch (tab) {
    case "road":
      return DISCIPLINES.ROAD.text;
    case "xc":
      return DISCIPLINES.XC.text;
    case "cx":
      return DISCIPLINES.CX.text;
    case "team":
      return DISCIPLINES.SPECIAL.text;
    default:
      return DEFAULT_DISCIPLINE.text;
  }
};

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
  const initialTab = getDisciplineFromUrl();

  const { activeTab, handleTabChange } = useTabState(initialTab, false, false);
  const { getRegisteredRiders, getEvents } = useEventData();

  const eventsContext = useEventsContext();
  const { eventsLoading } = eventsContext;

  /**
   * Fetches registrations and events data when the component is mounted.
   */
  useEffect(() => {
    const discipline =
      Object.values(DISCIPLINES).find((d) => d.text === activeTab) ||
      DEFAULT_DISCIPLINE;

    getRegisteredRiders({ disciplineParam: discipline.queryParam });
    getEvents({ disciplineId: discipline.id });
  }, [
    getRegisteredRiders,
    getEvents,
    DEFAULT_DISCIPLINE.id,
    DEFAULT_DISCIPLINE.queryParam,
  ]);

  return (
    <Stack>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        defaultValue={initialTab}
        className={classes.eventList}
        mb="64"
      >
        <EventTabs />
        <EventPanels eventsLoading={eventsLoading} />
      </Tabs>
    </Stack>
  );
};

export default EventsContainer;
