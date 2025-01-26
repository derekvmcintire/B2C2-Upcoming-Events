import { Flex, Tabs } from "@mantine/core";
import EventsList from "./EventsList";
import { useEffect, useState } from "react";
import { fetchRegistrations } from "../../api/fetchRegisteredRiders";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByDiscipline } from "../../api/fetchEventsByType";
import { DISCIPLINES } from "../../constants";
import { getDisciplineId } from "../../utils/discipline";
import { clearEventCache } from "../../infrastructure/event-cache";
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
    setIsSubmitting,
    errors,
    setErrors,
  } = eventsContext;

  const handleSetNewError = (newError: string, message?: string): void => {
    const newErrors = [
      ...errors.filter((error) => error !== newError),
      `${message} ${newError}`,
    ];
    setErrors(newErrors);
  };

  const getRegisteredRiders = async (afterDate: Date = new Date()) => {
    const disciplineParam = DISCIPLINES.ROAD.queryParam;
    const response = await fetchRegistrations({
      discipline: disciplineParam,
      after: afterDate,
    });
    if (response.error) {
      handleSetNewError(response.error, "ERROR FETCHING REGISTERED RIDERS:");
    } else {
      setRegistrations(response);
    }

    setRegistrationsLoading(false);
  };

  const getEvents = async ({
    disciplineId,
    skipCache = false,
  }: {
    disciplineId: EventDiscipline;
    skipCache?: boolean;
  }) => {
    const response = await fetchEventsByDiscipline({
      discipline: disciplineId,
      skipCache,
    });

    if (response.error) {
      handleSetNewError(
        response.error,
        `ERROR FETCHING ${disciplineId} EVENTS:`,
      );
    }

    setEvents(response.events);
    setEventsLoading(false);
    setIsSubmitting(false);
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
    getEvents({ disciplineId: eventType, skipCache: true }); // fetch new events for the given eventType (Also called discipline)
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
