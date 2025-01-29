import { Flex, Tabs } from "@mantine/core";
import { DISCIPLINES } from "../../constants";
import EventsList from "../EventList/EventsList";
import classes from "./event-list-tabs.module.css";
import { EventDiscipline } from "../../types";

type EventPanelsProps = {
  eventsLoading: boolean;
  requestFreshDataForEventType: (eventType: EventDiscipline) => void;
};

/**
 * Renders the panels for different event disciplines in the EventListTabs component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.eventsLoading - Indicates whether events are currently loading.
 * @param {Function} props.requestFreshDataForEventType - Callback function to request fresh data for a specific event type.
 * @returns {JSX.Element} The rendered EventPanels component.
 */
export default function EventPanels({
  eventsLoading,
  requestFreshDataForEventType,
}: EventPanelsProps): JSX.Element {
  /**
   *
   * RoadPanel component represents the panel for Road events in the EventListTabs component.
   */
  const RoadPanel = (): JSX.Element => (
    <Tabs.Panel
      w="100%"
      key={DISCIPLINES.ROAD.text}
      value={DISCIPLINES.ROAD.text}
    >
      {eventsLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <EventsList
          data-testid="events-list"
          discipline={DISCIPLINES.ROAD}
          requestDataCallback={requestFreshDataForEventType}
        />
      )}
    </Tabs.Panel>
  );

  /**
   * CxPanel component represents the panel for CX events in the EventListTabs component.
   */
  const CxPanel = () => (
    <Tabs.Panel w="100%" key={DISCIPLINES.CX.text} value={DISCIPLINES.CX.text}>
      {eventsLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <EventsList
          discipline={DISCIPLINES.CX}
          requestDataCallback={requestFreshDataForEventType}
        />
      )}
    </Tabs.Panel>
  );

  /**
   * XcPanel component represents the panel for XC events in the EventListTabs component.
   */
  const XcPanel = () => (
    <Tabs.Panel w="100%" key={DISCIPLINES.XC.text} value={DISCIPLINES.XC.text}>
      {eventsLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <EventsList
          discipline={DISCIPLINES.XC}
          requestDataCallback={requestFreshDataForEventType}
        />
      )}
    </Tabs.Panel>
  );

  /**
   * TeamPanel component represents the panel for Team events in the EventListTabs component.
   */
  const TeamPanel = () => (
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
  );
  return (
    <Flex justify="center">
      <RoadPanel />
      <CxPanel />
      <XcPanel />
      <TeamPanel />
    </Flex>
  );
}
