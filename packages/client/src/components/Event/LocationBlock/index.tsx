import { Stack, Text, Title } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { formatEventDate } from "../../../utils/dates";
import { MOBILE_BREAK_POINT } from "../../../constants";
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
      <Stack gap={0} ml="16">
        <Text ta="left" className={classes.locationText}>{`${city}, ${state}`}</Text>
        <Map />
      </Stack>
    </>
  );
}
