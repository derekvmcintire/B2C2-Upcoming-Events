import { Card, Stack, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useEventContext } from "../../../context/event-context";
import { formatCalendarDate } from "../../../utils/dates";

/**
 * Renders the date of an event.
 */
export default function Date() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { date } = event;

  const { weekday, month, day } = formatCalendarDate(date);

  return (
    <Stack gap={8} align="center" justify="center" h="100%" className={classes.dateStack} >
      <Card shadow="sm" className={classes.dateBadge}>
        <Stack gap={0} align="center" justify="center">
          <Text size="xs" className={classes.weekday}>
            {weekday}
          </Text>
          <Text className={classes.month}>{month}</Text>
          <Text className={classes.day}>{day}</Text>
        </Stack>
      </Card>
    </Stack>
  );
}
