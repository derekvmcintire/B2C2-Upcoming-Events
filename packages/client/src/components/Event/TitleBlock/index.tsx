import { Flex, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useEventContext } from "../../../context/event-context";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";

export default function EventName() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { name } = event;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const alignment = isMobile ? "center" : "right";

  return (
    <Flex justify={alignment} align="center" className={classes.title}>
      <Text ta={alignment} className={classes.eventName}>
        {name}
      </Text>
    </Flex>
  );
}
