import { Tabs } from "@mantine/core";
import { DISCIPLINES } from "../../constants";
import classes from "./event-list-tabs.module.css";

export default function EventTabs() {
  return (
    <Tabs.List>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.ROAD.text}>
        Road
      </Tabs.Tab>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.CX.text}>
        Cyclocross
      </Tabs.Tab>
      <Tabs.Tab className={classes.eventListTab} value={DISCIPLINES.XC.text}>
        Cross Country
      </Tabs.Tab>
      <Tabs.Tab
        className={classes.eventListTab}
        value={DISCIPLINES.SPECIAL.text}
      >
        Team Events
      </Tabs.Tab>
    </Tabs.List>
  );
}
