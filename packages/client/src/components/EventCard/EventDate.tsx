import { Stack, Text, Title } from "@mantine/core";
import classes from "./event.module.css";
import { EventType } from "../../types";
import { formatEventDate } from "../../utils/dates";

type EventDateProps = {
  event: EventType;
};

export default function EventDate({ event }: EventDateProps) {
  const { date } = event;
  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [weekday, dateString] = formattedDate.split(", ");
  return (
    <>
      <Stack align="flex-end">
        <Title ta="right">
          <Text className={classes.eventDay}>{weekday}</Text>
          <Text className={classes.eventDate}>{dateString}</Text>
        </Title>
      </Stack>
    </>
  );
}
