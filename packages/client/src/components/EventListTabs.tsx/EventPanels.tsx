import { Flex, Tabs } from "@mantine/core";
import { DISCIPLINES } from "../../constants";
import EventsList from "../EventList/EventsList";
import classes from "./event-list-tabs.module.css";
import { EventDiscipline } from "../../types";

type EventPanelsProps = {
  eventsLoading: boolean;
  requestFreshDataForEventType: (eventType: EventDiscipline) => void;
};

export default function EventPanels({
  eventsLoading,
  requestFreshDataForEventType,
}: EventPanelsProps) {
  return (
    <Flex justify="center">
      <Tabs.Panel
        w="100%"
        key={DISCIPLINES.ROAD.text}
        value={DISCIPLINES.ROAD.text}
      >
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList
            discipline={DISCIPLINES.ROAD}
            requestDataCallback={requestFreshDataForEventType}
          />
        )}
      </Tabs.Panel>

      <Tabs.Panel
        w="100%"
        key={DISCIPLINES.CX.text}
        value={DISCIPLINES.CX.text}
      >
        {eventsLoading ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <EventsList
            discipline={DISCIPLINES.CX}
            requestDataCallback={requestFreshDataForEventType}
          />
        )}
      </Tabs.Panel>

      <Tabs.Panel
        w="100%"
        key={DISCIPLINES.XC.text}
        value={DISCIPLINES.XC.text}
      >
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
        w="100%"
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
  );
}
