import { Stack, Tabs } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEventsContext } from "../../context/events-context";
import { DEFAULT_DISCIPLINE, DISCIPLINES } from "../../constants";
import classes from "./event-list.module.css";
import EventTabs from "../EventListTabs.tsx/EventTabs";
import EventPanels from "../EventListTabs.tsx/EventPanels";
import { useEventData } from "../../hooks/useEventData";
// import { useTabState } from "../../hooks/useTabState";
import { getDisciplineFromUrl, updateUrlParams } from "../../utils/url";
import { EventDiscipline } from "../../types";

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
  const initialTab = useMemo(() => getDisciplineFromUrl(), []);
  const [activeTab, setActiveTab] = useState<string | null>(initialTab);
  const { getRegisteredRiders, getEvents } = useEventData();
  const { eventsLoading } = useEventsContext();

  const handleClickTab = useCallback((value: string | null) => {
    if (!value) return;
    updateUrlParams(value);
    setActiveTab(value as EventDiscipline);
  }, []);

  useEffect(() => {
    if (!activeTab) return;

    const discipline =
      Object.values(DISCIPLINES).find((d) => d.id === activeTab) ||
      DEFAULT_DISCIPLINE;
    getRegisteredRiders({ disciplineParam: discipline.queryParam });
    getEvents({ disciplineId: discipline.id });
  }, [activeTab, getRegisteredRiders, getEvents]);

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
