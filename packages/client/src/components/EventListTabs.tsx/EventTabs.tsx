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
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.ROAD.text}>
        {DISCIPLINES.ROAD.text}
      </Tabs.Tab>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.CX.text}>
        {isMobile ? DISCIPLINES.CX.mobileText : DISCIPLINES.CX.text}
      </Tabs.Tab>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.XC.text}>
        {isMobile ? DISCIPLINES.XC.mobileText : DISCIPLINES.XC.text}
      </Tabs.Tab>
      <Tabs.Tab
        className={classes.eventListTab}
        value={DISCIPLINES.SPECIAL.text}
      >
        {isMobile ? DISCIPLINES.SPECIAL.mobileText : DISCIPLINES.SPECIAL.text}
      </Tabs.Tab>
    </Tabs.List>
  );
}
