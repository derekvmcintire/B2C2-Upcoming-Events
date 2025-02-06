import { Stack, Tabs } from "@mantine/core";
import { useEffect } from "react";
import { useEventsContext } from "../../context/events-context";
import { DEFAULT_DISCIPLINE, DISCIPLINES } from "../../constants";
import classes from "./event-list.module.css";
import EventTabs from "../EventListTabs.tsx/EventTabs";
import EventPanels from "../EventListTabs.tsx/EventPanels";
import { useEventData } from "../../hooks/useEventData";
import { useTabState } from "../../hooks/useTabState";
import { getDisciplineFromUrl, updateUrlParams } from "../../utils/url";
import { EventDiscipline } from "../../types";

// // Helper to map URL parameter to discipline
// const getDisciplineFromUrl = (): string => {
//   const params = new URLSearchParams(window.location.search);
//   const tab = params.get("tab") || window.location.hash.replace("#", "");

//   switch (tab) {
//     case "road":
//       return DISCIPLINES.ROAD.text;
//     case "xc":
//       return DISCIPLINES.XC.text;
//     case "cx":
//       return DISCIPLINES.CX.text;
//     case "team":
//       return DISCIPLINES.SPECIAL.text;
//     default:
//       return DEFAULT_DISCIPLINE.text;
//   }
// };

// // Update the URL with a new tab and/or events
// const updateUrlParams = (tab: string, events: string[] = []) => {
//   const params = new URLSearchParams(window.location.search);
//   params.set("tab", tab);
//   if (events.length > 0) {
//     params.set("events", events.join(",")); // Join events into a comma-separated string
//   } else {
//     params.delete("events"); // Remove 'events' if it's empty
//   }

//   const newUrl = `${window.location.pathname}?${params.toString()}`;
//   window.history.replaceState(null, "", newUrl);
// };

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

  const handleClickTab = (value: string | null) => {
    if (value) {
      updateUrlParams(value);
    }
    handleTabChange(value as EventDiscipline);
  };

  /**
   * Fetches registrations and events data when the component is mounted.
   */
  useEffect(() => {
    const discipline =
      Object.values(DISCIPLINES).find((d) => d.text === activeTab) ||
      DEFAULT_DISCIPLINE;

    getRegisteredRiders({ disciplineParam: discipline.queryParam });
    getEvents({ disciplineId: discipline.id });
  }, [getRegisteredRiders, getEvents, activeTab]);

  return (
    <Stack>
      <Tabs
        value={activeTab}
        onChange={handleClickTab}
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
