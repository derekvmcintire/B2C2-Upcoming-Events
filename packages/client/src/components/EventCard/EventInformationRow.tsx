import { Flex, Grid, Text } from "@mantine/core";
import { EventType } from "../../types";
import EventDate from "./EventDate";
import EventDetails from "./EventDetails";
import classes from "./event.module.css";
import RemoveButton from "../Shared/RemoveButton";

type EventInformationRowProps = {
  event: EventType;
  housingUrl?: string;
  removeHousingUrl: () => void;
};

export default function EventInformationRow({
  event,
  housingUrl,
  removeHousingUrl,
}: EventInformationRowProps) {
  return (
    <>
      <Grid.Col span={4}>
        <EventDate event={event} />
      </Grid.Col>
      <Grid.Col span={8}>
        <EventDetails event={event} />
        {housingUrl && (
          <Flex justify="flex-start">
            <Text className={classes.eventLink}>
              <a href={housingUrl} target="_blank" rel="noopener noreferrer">
                Link to Housing Information
              </a>
            </Text>
            <RemoveButton clickHandler={removeHousingUrl} />
          </Flex>
        )}
      </Grid.Col>
    </>
  );
}
