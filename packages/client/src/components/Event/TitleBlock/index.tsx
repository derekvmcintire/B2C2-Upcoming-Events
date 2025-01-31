import { Flex, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useEventContext } from "../../../context/event-context";

export default function EventName() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { name } = event;

  return (
    <Flex justify="right" align="center" className={classes.title}>
      <Text ta="right" className={classes.eventName}>
        {name}
      </Text>
    </Flex>
  );
}
