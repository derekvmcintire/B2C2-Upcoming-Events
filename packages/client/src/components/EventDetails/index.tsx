import { Container, Divider, Flex, Grid, Pill, Stack, Text, Title } from "@mantine/core";
import classes from './event.module.css';
import type { EventType, FetchRegistrationsResponse } from "../../types";
import { formatEventDate } from "../../utils/dates";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";

type EventProps = {
  event: EventType,
  registrations?: FetchRegistrationsResponse,
};

/**
 * EventDetails Component
 * 
 * Renders the details of a specific event, including the event's date, name, location, registration link, 
 * and the names of registered teammates (if available).
 * - Displays the formatted event date with the weekday and date string.
 * - Displays event details including name, location (city and state), and a link to the registration page.
 * - Lists the names of registered riders, if provided in the `registrations` prop.
 * 
 * @param {EventProps} props - The props for the component, including:
 *   - `event`: The event object containing details about the event (name, date, location, URL).
 *   - `registrations` (optional): The list of registrations for the event, used to display registered rider names.
 * 
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

  const numberOfRidersRegistered = registeredNames.length;
  const registeredLabelText = numberOfRidersRegistered === 1 ? `${numberOfRidersRegistered} B2C2 Rider Reg'd: ` : `${numberOfRidersRegistered} B2C2 Riders Reg'd: `

  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [weekday, dateString] = formattedDate.split(', ');

  return (
    <Container className={classes.eventContainer}>
      <Grid w="100%" className={classes.eventGrid}>
        {/* Left column: Date */}
        <Grid.Col span={4}>
          <Stack align="flex-end">
          <Title className={classes.title} ta="right">
            <Text className={classes.eventDay}>
              {weekday}
            </Text>
            <Text className={classes.eventDate}>
              {dateString}
            </Text>
            </Title>
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
            
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex justify="flex-end" align="flex-end">
          <Text size="lg" fw="600" fs="italic" className={classes.registeredLabel}>
            {numberOfRidersRegistered > 0 && registeredLabelText}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={8}>
          {/* Registered Teammates */}
            <Flex justify="flex-start" align="flex-end">
          <Text
                size="lg"
                fw="600"
                className={numberOfRidersRegistered > 0 ? classes.registeredName: classes.registeredLabel}
              >
                {numberOfRidersRegistered > 0 ? registeredNames.join(', ') : ("No B2C2 Riders Reg'd")}
              </Text>
              </Flex>
        </Grid.Col>
      </Grid>
      <Divider />
    </Container>
  );
}
