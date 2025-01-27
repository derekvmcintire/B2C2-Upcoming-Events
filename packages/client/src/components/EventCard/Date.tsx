import { Stack, Text, Title } from "@mantine/core";
import classes from "./event.module.css";
import { EventType } from "../../types";
import { formatEventDate } from "../../utils/dates";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

type EventDateProps = {
  event: EventType;
};

/**
 * EventsList Component
 *
 * Renders the date for an event
 *
 * @param {EventDateProps} props
 */
export default function EventDate({ event }: EventDateProps) {
  const { date } = event;
  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [weekday, dateString, year] = formattedDate.split(", ");
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const DateText = () =>
    isMobile ? (
      <Text
        className={classes.eventYear}
      >{`${weekday}, ${dateString} ${year}`}</Text>
    ) : (
      <>
        <Text className={classes.eventDay}>{weekday}</Text>
        <Text className={classes.eventDate}>{dateString}</Text>
        <Text className={classes.eventYear}>{year}</Text>
      </>
    );

  const textAlign = isMobile ? "left" : "right";
  const stackAlign = isMobile ? "flex-start" : "flex-end";

  return (
    <>
      <Stack gap={0} align={stackAlign}>
        <Title ta={textAlign}>
          <DateText />
        </Title>
      </Stack>
    </>
  );
}
