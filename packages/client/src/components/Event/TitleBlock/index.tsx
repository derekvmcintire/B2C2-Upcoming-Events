import { Text } from '@mantine/core';
import classes from '../styles/event.module.css';
import { useEventContext } from '../../../context/event-context';


export default function EventName() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { name } = event;

    return (
      <Text w="100%" ta="right" className={classes.eventName}>
      {name}
    </Text>
    )
}
