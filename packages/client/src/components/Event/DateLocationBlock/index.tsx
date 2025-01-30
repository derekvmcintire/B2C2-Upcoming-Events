import { Stack, Text, Title } from "@mantine/core";
import classes from "./event.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { formatEventDate } from "../../../utils/dates";
import { MOBILE_BREAK_POINT } from "../../../constants";
import Map from "./Map";
import { useEventContext } from "../../../context/event-context";



/**
 * EventsList Component
 *
 * Renders the date for an event
 *
 */
export default function DateLocationBlock() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { date, city, state } = event;

  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [weekday, dateString, year] = formattedDate.split(", ");
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const dateClassName =
    isMobile ? classes.eventYear : classes.eventDate;

  const textAlign = isMobile ? "left" : "right";
  const stackAlign = isMobile ? "flex-start" : "flex-end";

  const Date = () => (
    <Title ta={textAlign}>
        <Text
        className={dateClassName}
      >{`${weekday}, ${dateString} ${year}`}</Text>
        </Title>
  );

  return (
    <>
      <Stack gap={0} align={stackAlign}>
        <Date />
        <Text>{`${city}, ${state}`}</Text>
        <Map />
      </Stack>
    </>
  );
}
