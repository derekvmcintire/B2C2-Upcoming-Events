import { Badge, Card, Flex, Stack, Text, Title } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useEventContext } from "../../../context/event-context";
import { formatCalendarDate } from "../../../utils/dates";

export default function EventName() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { date, name } = event;

  const { weekday, month, day } = formatCalendarDate(date);

  const Date = () => (
    <Card shadow="sm" className={classes.dateBadge}>
      <Stack gap={0} align="center">
        <Text size="xs" className={classes.weekday}>{weekday}</Text>
        <Text  className={classes.month} fw={500}>{month}</Text>
        <Text  fw={700} className={classes.day}>{day}</Text>
      </Stack>
    </Card>
  );

  return (
    <Flex justify="space-between" align="flex-start">
      <Date />
      <Flex w="100%:" justify="right" align="center" className={classes.title}>
        <Badge color="green" radius="xs" mr="16">
          Race
        </Badge>
        <Text ta="right" className={classes.eventName}>{name}</Text>
      </Flex>
      
    </Flex>
  );
}
