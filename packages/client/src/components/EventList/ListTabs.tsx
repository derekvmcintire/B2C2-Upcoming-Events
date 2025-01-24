import { Tabs } from "@mantine/core";
import EventsList from "./EventsList";
import { useEffect, useState } from "react";
import { fetchRegistrations } from "../../api/fetchRegisteredRiders";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByType } from "../../api/fetchEventsByType";
import { DISCIPLINES } from "../../constants";
import { getDisciplineId } from "../../utils/discipline";
import {
  getEventsFromCache,
  setEventsToCache,
} from "../../infrastructure/event-cache";
import classes from "./event-list.module.css";

/**
 * ListTabs Component
 *
 * Renders a tabbed interface for events categorized by discipline
 * (Road, Cyclocross, Cross Country). Fetches and caches event data
 * per discipline, and fetches registrations for the "Road" discipline.
 *
 * - Defaults to the Road discipline on mount.
 * - Fetches data on tab change, using cached events when available.
 */
const ListTabs = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string | null>(
    DISCIPLINES.ROAD.text,
  );
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const DEFAULT_DISCIPLINE = DISCIPLINES.ROAD;

  const eventsContext = useEventsContext();
  const {
    setRegistrations,
    setEvents,
    setRegistrationsLoading,
    registrationsLoading,
    requestFreshData,
    setRequestFreshData
  } = eventsContext;

  const getRegisteredRiders = async ({ overrideCache = false }: { overrideCache?: boolean}) => {
    const disciplineId = DISCIPLINES.ROAD.queryParam;
    const afterDate = new Date(); // or pass a specific date if needed

    const response = await fetchRegistrations(disciplineId, afterDate, overrideCache);
    setRegistrations(response);
    setRegistrationsLoading(false);
  };

  const getEvents = async ({disciplineId, overrideCache = false}: { disciplineId: string, overrideCache?: boolean }) => {
    // First, check cache
    const cachedEvents = getEventsFromCache(disciplineId);

    if (!overrideCache && cachedEvents) {
      // If cached data exists, use it
      setEvents(cachedEvents);
    } else {
      // Otherwise, fetch new data from API
      const roadResponse = await fetchEventsByType(disciplineId);
      setEvents(roadResponse.events);
      // Cache the new data
      setEventsToCache(disciplineId, roadResponse.events);
    }
    setEventsLoading(false);
  };

  const handleTabChange = (value: any) => {
    if (eventsLoading || registrationsLoading) return;

    setEventsLoading(true);
    setRegistrationsLoading(true);

    const disciplineId = getDisciplineId(value);
    getRegisteredRiders({});
    getEvents({disciplineId});
    setActiveTab(value);
  };

  // Fetch registrations on component mount
  useEffect(() => {
    getRegisteredRiders({});
    getEvents({disciplineId: DEFAULT_DISCIPLINE.id});
  }, []);

  useEffect(() => {
    if (requestFreshData) {
      setEventsLoading(true)
      console.log("requesting fresh data bb")
      getRegisteredRiders({ overrideCache: true });
      getEvents({disciplineId: DEFAULT_DISCIPLINE.id, overrideCache: true});
      setRequestFreshData(false);
    }
  }, [requestFreshData])

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      defaultValue={DISCIPLINES.ROAD.text}
      className={classes.eventList}
    >
      <Tabs.List>
        <Tabs.Tab
          className={classes.eventListTab}
          value={DISCIPLINES.ROAD.text}
        >
          Road
        </Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.CX.text}>
          Cyclocross
        </Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.XC.text}>
          Cross Country
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel key={DISCIPLINES.ROAD.text} value={DISCIPLINES.ROAD.text}>
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList discipline={DISCIPLINES.ROAD} />
        )}
      </Tabs.Panel>

      <Tabs.Panel key={DISCIPLINES.CX.text} value={DISCIPLINES.CX.text}>
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList discipline={DISCIPLINES.CX} />
        )}
      </Tabs.Panel>

      <Tabs.Panel key={DISCIPLINES.XC.text} value={DISCIPLINES.XC.text}>
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList discipline={DISCIPLINES.XC} />
        )}
      </Tabs.Panel>
    </Tabs>
  );
};

export default ListTabs;
