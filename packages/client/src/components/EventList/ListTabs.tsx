import { Tabs } from '@mantine/core';
import EventsList from './EventsList';
import classes from './event-list.module.css';
import { useEffect, useState } from 'react';
import { fetchRegistrations } from '../../api/fetchRegisteredRiders';
import { useEventsContext } from '../../context/events-context';
import { fetchEventsByType } from '../../api/fetchEventsByType';
import { DISCIPLINES } from '../../constants';
import { getDisciplineId } from '../../utils/discipline';

/**
 * Component for rendering a tabbed interface to display categorized events.
 * Fetches event data and registration data on mount.
 * 
 * @returns {JSX.Element} The ListTabs component.
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
    const response = await fetchRegistrations(DISCIPLINES.ROAD.queryParam);
    setRegistrations(response);
  };

  const getEvents = async (disciplineId: string) => {
    const roadResponse = await fetchEventsByType(disciplineId);
    setEvents(roadResponse.events);
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
