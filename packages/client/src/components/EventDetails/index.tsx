import { Container, Divider, Flex, Grid, Pill, Stack, Text } from "@mantine/core";
import classes from './event.module.css';
import type { Event, FetchRegistrationsResponse } from "../../types";
import { formatEventDate } from "../../utils/dates";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";

type EventProps = {
  event: Event,
  registrations?: FetchRegistrationsResponse,
};

export default function EventDetails({
  event,
  registrations,
}: EventProps) {
  const { eventId, date, name, city, state, eventUrl } = event;

  const registeredNames = registrations ? getEntriesByEventId(registrations, Number(eventId)) : [];

  // Format the date and split it into weekday and date
  const formattedDate = formatEventDate(date);
  const [weekday, dateString] = formattedDate.split(', ');

  return (
    <Container className={classes.eventContainer}>
      <Grid w="100%" className={classes.eventGrid}>
        {/* Left column: Date */}
        <Grid.Col span={4}>
          <Stack align="flex-start">
            <Text className={classes.eventDate} style={{ fontWeight: 600, fontSize: '1.8rem' }}>
              {weekday}
            </Text>
            <Text className={classes.eventDate} style={{ fontWeight: 400, fontSize: '1.3rem' }}>
              {dateString}
            </Text>
          </Stack>
        </Grid.Col>
        {/* Right column: Event details */}
        <Grid.Col span={8}>
          <Stack align="flex-start">
            {/* Event Name */}
            <Text className={`${classes.eventName}`} style={{ fontWeight: 700, fontSize: '1.5rem' }} lineClamp={2}>
              {name}
            </Text>
            {/* Event Location */}
            <Text className={classes.eventLocation} style={{ fontWeight: 500, fontSize: '1.1rem' }}>
              {`${city}, ${state}`}
            </Text>
            {/* Event URL */}
            <Text className={classes.eventLink}>
              <a href={eventUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500, color: '#1e90ff', fontSize: '1.1rem' }}>
                Link to Reg
              </a>
            </Text>
            <Text fw="600" size="lg">Teammates Registered:</Text>
            <Flex wrap="wrap" style={{ maxWidth: '400px' }}>
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
