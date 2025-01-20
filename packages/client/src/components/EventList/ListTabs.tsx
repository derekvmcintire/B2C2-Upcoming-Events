import { Tabs } from '@mantine/core';
import EventsList from './EventsList';
import classes from './event-list.module.css';
import { useEffect, useState } from 'react';
import { fetchRegistrations } from '../../api/fetchRegisteredRiders';
import { useEventsContext } from '../../context/events-context';
import { fetchEventsByType } from '../../api/fetchEventsByType';
import { DISCIPLINES } from '../../constants';
import { getDisciplineId } from '../../utils/discipline';
import { getEventsFromCache, setEventsToCache } from '../../infrastructure/eventCache';

/**
 * ListTabs Component
 * 
 * Renders a tabbed interface for displaying events categorized by discipline (Road, Cyclocross, Cross Country).
 * Fetches event and registration data when the component mounts and when the active tab is changed.
 * 
 * - Uses Mantine's `Tabs` component for navigation.
 * - Fetches events and registered riders based on the selected discipline.
 */
const ListTabs = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string | null>(DISCIPLINES.ROAD.text);

  const DEFAULT_DISCIPLINE = DISCIPLINES.ROAD;
  
  const eventsContext = useEventsContext();
  const {
    setRegistrations,
    setEvents
  } = eventsContext;

  const getRegisteredRiders = async () => {
    const disciplineId = DISCIPLINES.ROAD.queryParam;
    const afterDate = new Date(); // or pass a specific date if needed
  
    const response = await fetchRegistrations(disciplineId, afterDate);
    setRegistrations(response);
  };

  const getEvents = async (disciplineId: string) => {
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
  };

  const handleTabChange = (value: any) => {
    console.log('handling tab change: ', value)
    const disciplineId = getDisciplineId(value);
    getRegisteredRiders();
    getEvents(disciplineId);
    setActiveTab(value);
  }

  // Fetch registrations on component mount
  useEffect(() => {
    getRegisteredRiders();
    getEvents(DEFAULT_DISCIPLINE.id);
  }, []);

  return (
    <Tabs value={activeTab} onChange={handleTabChange} defaultValue={DISCIPLINES.ROAD.text} className={classes.eventList}>
      <Tabs.List>
        <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.ROAD.text}>Road</Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.CX.text}>Cyclocross</Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.XC.text}>Cross Country</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel key={DISCIPLINES.ROAD.text} value={DISCIPLINES.ROAD.text}>
        <EventsList discipline={DISCIPLINES.ROAD} />
      </Tabs.Panel>

      <Tabs.Panel key={DISCIPLINES.CX.text} value={DISCIPLINES.CX.text}>
        <EventsList discipline={DISCIPLINES.CX} />
      </Tabs.Panel>

      <Tabs.Panel key={DISCIPLINES.XC.text} value={DISCIPLINES.XC.text}>
        <EventsList discipline={DISCIPLINES.XC} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ListTabs;
