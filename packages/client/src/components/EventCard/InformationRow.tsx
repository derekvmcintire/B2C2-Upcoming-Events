import { Flex, Grid, Text } from "@mantine/core";
import { EventType } from "../../types";
import EventDate from "./Date";
import EventDetails from "./Details";
import classes from "./event.module.css";
import DismissButton from "../Shared/DismissButton";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

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
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  return (
    <>
      <Grid.Col span={isMobile ? 12 : 4}>
        <EventDate event={event} />
      </Grid.Col>
      <Grid.Col span={isMobile ? 12 : 8}>
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
