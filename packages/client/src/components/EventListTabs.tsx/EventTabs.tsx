import { Tabs } from "@mantine/core";
import { DISCIPLINES, MOBILE_BREAK_POINT } from "../../constants";
import classes from "./event-list-tabs.module.css";
import { useMediaQuery } from "@mantine/hooks";

/**
 * Renders the event tabs for the EventList component.
 * @returns The JSX element representing the event tabs.
 */
export default function EventTabs(): JSX.Element {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  return (
    <Tabs.List>
      <Tabs.Tab
        data-testid="road-events-tab"
        className={classes.eventListTab}
        value={DISCIPLINES.ROAD.id}
      >
        {DISCIPLINES.ROAD.text}
      </Tabs.Tab>
      <Tabs.Tab
        data-testid="cx-events-tab"
        className={classes.eventListTab}
        value={DISCIPLINES.CX.id}
      >
        {isMobile ? DISCIPLINES.CX.mobileText : DISCIPLINES.CX.text}
      </Tabs.Tab>
      <Tabs.Tab
        data-testid="xc-vents-tab"
        className={classes.eventListTab}
        value={DISCIPLINES.XC.id}
      >
        {isMobile ? DISCIPLINES.XC.mobileText : DISCIPLINES.XC.text}
      </Tabs.Tab>
      <Tabs.Tab
        data-testid="team-events-tab"
        className={classes.eventListTab}
        value={DISCIPLINES.SPECIAL.id}
      >
        {isMobile ? DISCIPLINES.SPECIAL.mobileText : DISCIPLINES.SPECIAL.text}
      </Tabs.Tab>
    </Tabs.List>
  );
}
