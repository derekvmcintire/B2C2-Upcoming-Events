import { Grid } from "@mantine/core";
import { EventType } from "../../types";
import EventDate from "./EventDate";
import EventDetails from "./EventDetails";

type EventInformationRowProps = {
  event: EventType;
};

export default function EventInformationRow({
  event,
}: EventInformationRowProps) {
  return (
    <>
      <Grid.Col span={4}>
        <EventDate event={event} />
      </Grid.Col>
      <Grid.Col span={8}>
        <EventDetails event={event} />
      </Grid.Col>
    </>
  );
}
