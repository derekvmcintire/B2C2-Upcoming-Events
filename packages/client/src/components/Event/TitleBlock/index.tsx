import { Badge, Flex, Stack, Text, Title } from '@mantine/core';
import classes from '../styles/event.module.css';
import { useEventContext } from '../../../context/event-context';
import { formatEventDate } from '../../../utils/dates';


export default function EventName() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { date, name } = event;

    // Format the event date and split into weekday and date string
    const formattedDate = formatEventDate(date);
    const [weekday, dateString, year] = formattedDate.split(", ");

  const Date = () => (
    <Title ta="left">
        <Text
        className={classes.dateText}
      >{`${weekday}, ${dateString} ${year}`}</Text>
        </Title>
  );

    return (
      <Stack gap={0}>
        <Flex justify="left" align="center" className={classes.title}>
          <Badge color="green" radius="xs" mr="16">Race</Badge>
          <Text className={classes.eventName}>
            {name}
          </Text>
        </Flex>
      <Date />
      </Stack>
    )
}
