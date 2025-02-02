import { Button, Flex } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { LABELS, MOBILE_BREAK_POINT } from "../../../constants";
import EventLabel from "../EventLabel";
import { useEventContext } from "../../../context/event-context";

/**
 * Renders a link block component for an event.
 */
export default function LinkBlock() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventType } = event;
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const alignment = isMobile ? "center" : "right";

  const label = eventType === "special" ? LABELS.TRIP : LABELS.RACE;

  const buttonSize = isMobile ? "compact-xs" : "compact-sm";

  return (
    <Flex className={classes.linkBlock} justify={alignment} align="center">
      <EventLabel labelConfig={label} />
      <Button size={buttonSize}>Link to Event</Button>
    </Flex>
  );
}
