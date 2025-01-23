import { Flex, Grid, Text } from '@mantine/core';
import { EventType, FetchRegistrationsResponse } from '../../types';
import { getEntriesByEventId } from '../../utils/findRegisteredRiders';
import classes from './event.module.css';


type RegisteredRidersRowProps = {
  event: EventType,
  registrations?: FetchRegistrationsResponse,
}
export default function RegisteredRidersRow({ event, registrations }: RegisteredRidersRowProps) {
  const { eventId } = event;

    // Retrieve registered names by event ID
    const registeredNames = registrations 
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];
    
    const numberOfRidersRegistered = registeredNames.length;
  const registeredLabelText = numberOfRidersRegistered === 1 ? `${numberOfRidersRegistered} B2C2 Rider Reg'd: ` : `${numberOfRidersRegistered} B2C2 Riders Reg'd: `
  
    return (
      <>
        <Grid.Col span={4}>
        <Flex justify="flex-end" align="flex-end">
          <Text size="lg" fw="600" fs="italic" className={classes.registeredLabel}>
            {numberOfRidersRegistered > 0 && registeredLabelText}
            </Text>
          </Flex>
        </Grid.Col>
      <Grid.Col span={8}>
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
      </>
    )
}
