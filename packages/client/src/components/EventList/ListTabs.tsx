import { Tabs } from '@mantine/core';
import EventsList from './EventsList';
import classes from './event-list.module.css';
import { useEffect } from 'react';
import { fetchRegistrations } from '../../api/fetchRegisteredRiders';
import { useEventsContext } from '../../context/events-context';
import { fetchEventsByType } from '../../api/fetchEventsByType';

const ListTabs = () => {
  const eventsContext = useEventsContext();
  const { roadEvents, cxEvents, xcEvents, setRegistrations, setRoadEvents, setCxEvents, setXcEvents } = eventsContext;

  useEffect(() => {
    const getRegisteredRiders = async () => {
      const response = await fetchRegistrations('road%20race');
      setRegistrations(response);
    };

    getRegisteredRiders();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const roadResponse = await fetchEventsByType('road');
      setRoadEvents(roadResponse.events);
      const cxResponse = await fetchEventsByType('cx');
      setCxEvents(cxResponse.events);
      const xcResponse = await fetchEventsByType('xc');
      setXcEvents(xcResponse.events);
    };
    
    getEvents();
  }, []);
  
  return (
    <Tabs defaultValue="road" className={classes.eventList}>
      <Tabs.List>
        <Tabs.Tab className={classes.eventListTab} value="road">Road</Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value="cx">Cyclocross</Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value="xc">Cross Country</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel key={"road"} value={"road"}>
        <EventsList events={roadEvents} type="Road"/>
      </Tabs.Panel>
      <Tabs.Panel key={"cx"} value={"cx"}>
      <EventsList events={cxEvents} type="Cyclocross"/>
      </Tabs.Panel>
      <Tabs.Panel key={"xc"} value={"xc"}>
      <EventsList events={xcEvents} type="Cross Country" />
      </Tabs.Panel>
    </Tabs>
  );
}

export default ListTabs;