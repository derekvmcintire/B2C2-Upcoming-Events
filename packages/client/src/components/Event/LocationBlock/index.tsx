import { Stack, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import Map from "./Map";
import { useEventContext } from "../../../context/event-context";

/**
 * EventsList Component
 *
 * Renders the date for an event
 *
 */
export default function LocationBlock() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { city, state } = event;

  return (
    <>
      <Stack gap={0} w="100%" align="flex-start">
        <Text
          ta="left"
          fw={600}
          mb={8}
          className={classes.locationText}
        >{`${city}, ${state}`}</Text>
        <Map city={city} state={state} />
      </Stack>
    </>
  );
}
