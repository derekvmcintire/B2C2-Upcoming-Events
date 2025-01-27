import { Divider, Stack, Text } from "@mantine/core";
import classes from "./event.module.css";
import { EventType } from "../../types";

type EventDetailsProps = {
  event: EventType;
};

/**
 * EventDetails Component
 *
 * Renders the main details for an event, including the name, location and eventUrl
 *
 * @param {EventDetailsProps} props
 */
export default function EventDetails({ event }: EventDetailsProps) {
  const { name, city, state, eventUrl } = event;

  return (
    <>
      <Stack w="100%" gap={4} align="flex-start">
        {/* Event Name */}
        <Text w="100%" ta="right" className={classes.eventName}>{name}</Text>
        <Divider w="100%" mt="8" mb="8" />
        {/* Event Location */}
        <Text w="100%" ta="right" className={classes.eventLocation}>{`${city}, ${state}`}</Text>
        {/* Event URL */}
        {eventUrl && (
          <Text w="100%" ta="right" className={classes.eventLink}>
            <a href={eventUrl} target="_blank" rel="noopener noreferrer">
              Event Details
            </a>
          </Text>
        )}
      </Stack>
    </>
  );
}
