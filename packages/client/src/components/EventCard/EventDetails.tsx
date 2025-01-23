import { Stack, Text } from '@mantine/core';
import classes from './event.module.css';
import { EventType } from '../../types';

type EventDetailsProps = {
  event: EventType,
};

export default function EventDetails({ event }: EventDetailsProps) {
  const { name, city, state, eventUrl } = event;
    return (
      <>
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
      </>
    )
}
