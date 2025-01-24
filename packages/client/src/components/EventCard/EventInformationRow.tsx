import { Flex, Grid, Text } from "@mantine/core";
import { EventType } from "../../types";
import EventDate from "./EventDate";
import EventDetails from "./EventDetails";
import classes from "./event.module.css";
import DismissButton from "../Shared/DismissButton";

type EventInformationRowProps = {
  event: EventType;
  housingUrl?: string;
  removeHousingUrl: () => void;
};

/**
 * EventInformationRow Component
 *
 * Renders all information related to the event, including event date and details.
 * Conditionally renders the housingUrl
 *
 * @param {EventInformationRowProps} props
 */
export default function EventInformationRow({
  event,
  housingUrl,
  removeHousingUrl,
}: EventInformationRowProps) {
  return (
    <>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <EventDate event={event} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }}>
        <EventDetails event={event} />
        {housingUrl && (
          <Flex justify="flex-start">
            <Text className={classes.eventLink}>
              <a href={housingUrl} target="_blank" rel="noopener noreferrer">
                Link to Housing Information
              </a>
            </Text>
            <DismissButton clickHandler={removeHousingUrl} />
          </Flex>
        )}
      </Grid.Col>
    </>
  );
}
