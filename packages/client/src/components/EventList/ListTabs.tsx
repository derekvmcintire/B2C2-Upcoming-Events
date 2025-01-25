import { Flex, Tabs } from "@mantine/core";
import EventsList from "./EventsList";
import { useEffect, useState } from "react";
import { fetchRegistrations } from "../../api/fetchRegisteredRiders";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByType } from "../../api/fetchEventsByType";
import { DISCIPLINES } from "../../constants";
import { getDisciplineId } from "../../utils/discipline";
import { clearEventCache } from "../../infrastructure/event-cache";
import {
  getEventsFromCache,
  setEventsToCache,
} from "../../infrastructure/event-cache";
import classes from "./event-list.module.css";
import { EventDiscipline } from "../../types";

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
  const DEFAULT_DISCIPLINE = DISCIPLINES.ROAD;
  const [activeTab, setActiveTab] = useState<string | null>(
    DEFAULT_DISCIPLINE.text,
  );
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);

  const eventsContext = useEventsContext();
  const {
    setRegistrations,
    setEvents,
    setRegistrationsLoading,
    registrationsLoading,
    setRequestFreshData,
  } = eventsContext;

  const getRegisteredRiders = async () => {
    const disciplineId = DISCIPLINES.ROAD.queryParam;
    const afterDate = new Date(); // or pass a specific date if needed

    const response = await fetchRegistrations(disciplineId, afterDate);
    setRegistrations(response);
    setRegistrationsLoading(false);
  };

  const getEvents = async ({ disciplineId }: { disciplineId: string }) => {
    // First, check cache
    const cachedEvents = getEventsFromCache(disciplineId);

    if (cachedEvents) {
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
    getRegisteredRiders();
    getEvents({ disciplineId });
    setActiveTab(value);
  };

  // Fetch registrations on component mount
  useEffect(() => {
    getRegisteredRiders();
    getEvents({ disciplineId: DEFAULT_DISCIPLINE.id });
  }, []);

  const requestFreshDataForEventType = (eventType: EventDiscipline) => {
    clearEventCache(eventType); // clear cache for the given event type
    getRegisteredRiders(); // get registered riders just in case they changed
    getEvents({ disciplineId: eventType }); // fetch new events for the given eventType (Also called discipline)
    setRequestFreshData(undefined); // reset requestFreshData to undefined so we don't trigger an infinite loop
  };

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
        <Tabs.Tab
          className={classes.eventListTab}
          value={DISCIPLINES.SPECIAL.text}
        >
          Team Events
        </Tabs.Tab>
      </Tabs.List>

      <Flex w="100%" justify="center">
      <Tabs.Panel key={DISCIPLINES.ROAD.text} value={DISCIPLINES.ROAD.text}>
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList
            discipline={DISCIPLINES.ROAD}
            requestDataCallback={requestFreshDataForEventType}
          />
        )}
      </Tabs.Panel>

      <Tabs.Panel key={DISCIPLINES.CX.text} value={DISCIPLINES.CX.text}>
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList
            discipline={DISCIPLINES.CX}
            requestDataCallback={requestFreshDataForEventType}
          />
        )}
      </Tabs.Panel>

      <Tabs.Panel key={DISCIPLINES.XC.text} value={DISCIPLINES.XC.text}>
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList
            discipline={DISCIPLINES.XC}
            requestDataCallback={requestFreshDataForEventType}
          />
        )}
      </Tabs.Panel>
      <Tabs.Panel
        key={DISCIPLINES.SPECIAL.text}
        value={DISCIPLINES.SPECIAL.text}
      >
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList
            discipline={DISCIPLINES.SPECIAL}
            requestDataCallback={requestFreshDataForEventType}
          />
        )}
      </Tabs.Panel>
      </Flex>
    </Tabs>
  );
};

export default ListTabs;
