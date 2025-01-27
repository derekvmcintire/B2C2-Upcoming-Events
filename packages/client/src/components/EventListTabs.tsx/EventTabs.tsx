import { Tabs } from "@mantine/core";
import { DISCIPLINES } from "../../constants";
import classes from "./event-list-tabs.module.css";

/**
 * Renders the event tabs for the EventList component.
 * @returns The JSX element representing the event tabs.
 */
export default function EventTabs(): JSX.Element {
  return (
    <Tabs.List>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.ROAD.text}>
        {DISCIPLINES.ROAD.text}
      </Tabs.Tab>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.CX.text}>
        {DISCIPLINES.CX.text}
      </Tabs.Tab>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.XC.text}>
        {DISCIPLINES.XC.text}
      </Tabs.Tab>
      <Tabs.Tab
        className={classes.eventListTab}
        value={DISCIPLINES.SPECIAL.text}
      >
        {DISCIPLINES.SPECIAL.text}
      </Tabs.Tab>
    </Tabs.List>
  );
}
