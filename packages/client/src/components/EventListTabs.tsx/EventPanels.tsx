import { Flex, Tabs } from "@mantine/core";
import { DISCIPLINES } from "../../constants";
import EventsList from "../EventList/EventsList";
import Loading from "../Shared/Loading";

type EventPanelsProps = {
  eventsLoading: boolean;
};

/**
 * Renders the panels for different event disciplines in the EventListTabs component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.eventsLoading - Indicates whether events are currently loading.
 * @returns {JSX.Element} The rendered EventPanels component.
 */
export default function EventPanels({
  eventsLoading,
}: EventPanelsProps): JSX.Element {
  /**
   *
   * RoadPanel component represents the panel for Road events in the EventListTabs component.
   */
  const RoadPanel = (): JSX.Element => (
    <Tabs.Panel w="100%" key={DISCIPLINES.ROAD.id} value={DISCIPLINES.ROAD.id}>
      {eventsLoading ? (
        <Loading />
      ) : (
        <div data-testid="road-events-list">
        <EventsList  discipline={DISCIPLINES.ROAD} />
        </div>
      )}
    </Tabs.Panel>
  );

  /**
   * CxPanel component represents the panel for CX events in the EventListTabs component.
   */
  const CxPanel = () => (
    <Tabs.Panel w="100%" key={DISCIPLINES.CX.id} value={DISCIPLINES.CX.id}>
      {eventsLoading ? (
        <Loading />
      ) : (
        <div data-testid="cx-events-list">
        <EventsList discipline={DISCIPLINES.CX} />
        </div>
      )}
    </Tabs.Panel>
  );

  /**
   * XcPanel component represents the panel for XC events in the EventListTabs component.
   */
  const XcPanel = () => (
    <Tabs.Panel w="100%" key={DISCIPLINES.XC.id} value={DISCIPLINES.XC.id}>
      {eventsLoading ? (
        <Loading />
      ) : (
        <div data-testid="xc-events-list">
        <EventsList data-testid="xc-events-list" discipline={DISCIPLINES.XC} />
        </div>
      )}
    </Tabs.Panel>
  );

  /**
   * TeamPanel component represents the panel for Team events in the EventListTabs component.
   */
  const TeamPanel = () => (
    <Tabs.Panel
      w="100%"
      key={DISCIPLINES.SPECIAL.id}
      value={DISCIPLINES.SPECIAL.id}
    >
      {eventsLoading ? (
        <Loading />
      ) : (
        <div data-testid="team-events-list">
        <EventsList
          data-testid="team-events-list"
          discipline={DISCIPLINES.SPECIAL}
        />
        </div>
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
