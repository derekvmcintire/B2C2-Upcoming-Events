import { Stack, Text } from "@mantine/core";
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
      <Stack gap={4} align="flex-start">
        {/* Event Name */}
        <Text className={classes.eventName}>{name}</Text>
        {/* Event Location */}
        <Text className={classes.eventLocation}>{`${city}, ${state}`}</Text>
        {/* Event URL */}
        {eventUrl && (
          <Text className={classes.eventLink}>
            <a href={eventUrl} target="_blank" rel="noopener noreferrer">
              Link to Reg
            </a>
          </Text>
        )}
      </Stack>
    </>
  );
}
