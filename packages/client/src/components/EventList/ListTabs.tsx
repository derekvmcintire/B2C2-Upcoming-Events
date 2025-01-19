import { Tabs } from '@mantine/core';
import { FetchRegistrationsResponse, type Event } from "../../types";
import RoadEventsList from './RoadEventsList';
import classes from './event-list.module.css';


interface ListTabsProps {
  events: Event[],
  registrations?: FetchRegistrationsResponse
}

const ListTabs = ({ events, registrations }: ListTabsProps) => {
  return (
    <Tabs defaultValue="road" className={classes.eventList}>
      <Tabs.List>
        <Tabs.Tab className={classes.eventListTab} value="road">Road</Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value="cx">Cyclocross</Tabs.Tab>
        <Tabs.Tab className={classes.eventListTab} value="xc">Cross Country</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel key={"road"} value={"road"}>
        <RoadEventsList events={events} registrations={registrations}/>
      </Tabs.Panel>
      <Tabs.Panel key={"cx"} value={"cx"}>
              This is cx Stuff
      </Tabs.Panel>
      <Tabs.Panel key={"xc"} value={"xc"}>
              This is xc Stuff
      </Tabs.Panel>
    </Tabs>
  );
}

export default ListTabs;