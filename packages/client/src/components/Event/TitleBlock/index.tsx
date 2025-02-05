import { Flex, Stack, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useEventContext } from "../../../context/event-context";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";
import LabelsList from "../EventLabel/LabelsList";

/**
 * Renders the event name in the title block.
 */
export default function EventName() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { name } = event;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const alignment = isMobile ? "center" : "right";

  return (
    <Stack align={alignment} justify="center" className={classes.title}>
      <Text ta={alignment} className={classes.eventName}>
        {name}
      </Text>
      <Flex justify={alignment} align="center">
        <LabelsList />
      </Flex>
    </Stack>
  );
}
