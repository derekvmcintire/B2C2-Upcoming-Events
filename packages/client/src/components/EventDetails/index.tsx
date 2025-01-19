import { Container, Divider, Flex, Grid, Pill, Stack, Text } from "@mantine/core";
import classes from './event.module.css';
import type { Event, FetchRegistrationsResponse } from "../../types";
import { formatEventDate } from "../../utils/dates";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";

type EventProps = {
  event: Event,
  registrations?: FetchRegistrationsResponse,
};

/**
 * Renders the details of an event including date, location, URL, and registered teammates.
 * @param {EventProps} props - The props for the component.
 * @returns {JSX.Element} The EventDetails component.
 */
export default function EventDetails({
  event,
  registrations,
}: EventProps): JSX.Element {
  const { eventId, date, name, city, state, eventUrl } = event;

  // Retrieve registered names by event ID
  const registeredNames = registrations 
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [weekday, dateString] = formattedDate.split(', ');

  return (
    <Container className={classes.eventContainer}>
      <Grid w="100%" className={classes.eventGrid}>
        {/* Left column: Date */}
        <Grid.Col span={4}>
          <Stack align="flex-start">
            <Text className={classes.eventDate}>
              {weekday}
            </Text>
            <Text className={classes.eventDate}>
              {dateString}
            </Text>
          </Stack>
        </Grid.Col>

        {/* Right column: Event details */}
        <Grid.Col span={8}>
          <Stack align="flex-start">
            {/* Event Name */}
            <Text 
              className={classes.eventName} 
              lineClamp={2}
            >
              {name}
            </Text>
            {/* Event Location */}
            <Text 
              className={classes.eventLocation} 
            >
              {`${city}, ${state}`}
            </Text>
            {/* Event URL */}
            <Text className={classes.eventLink}>
              <a 
                href={eventUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
              >
                Link to Reg
              </a>
            </Text>
            {/* Registered Teammates */}
            <Text fw="600" size="lg">Teammates Registered:</Text>
            <Flex wrap="wrap" className={classes.registeredNameList}>
              {[...new Set(registeredNames)].map((registeredRider: string) => (
                <Pill c="orange" size="lg" key={registeredRider}>
                  {registeredRider}
                </Pill>
              ))}
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
      <Divider />
    </Container>
  );
}
