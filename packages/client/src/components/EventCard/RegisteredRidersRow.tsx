import { Flex, Grid, Text } from "@mantine/core";
import { EventType, FetchRegistrationsResponse } from "../../types";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";
import classes from "./event.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

type RegisteredRidersRowProps = {
  event: EventType;
  registrations?: FetchRegistrationsResponse;
};

/**
 * RegisteredRidersRow Component
 *
 * Renders a row that contains a list of riders that are registered for this event
 *
 * @param {RegisteredRidersRowProps} props
 */
export default function RegisteredRidersRow({
  event,
  registrations,
}: RegisteredRidersRowProps) {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const { eventId } = event;

  // Retrieve registered names by event ID
  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

  const numberOfRidersRegistered = registeredNames.length;
  const registeredLabelText =
    numberOfRidersRegistered === 1
      ? `${numberOfRidersRegistered} B2C2 Rider Reg'd: `
      : `${numberOfRidersRegistered} B2C2 Riders Reg'd: `;

  const contentClassName =
    numberOfRidersRegistered > 0
      ? classes.registeredName
      : classes.registeredLabel;

  const label = (
    <Flex justify={isMobile ? "flex-start" : "flex-end"} align="flex-end">
      <Text className={classes.registeredLabel}>
        {numberOfRidersRegistered > 0 && registeredLabelText}
      </Text>
    </Flex>
  );

  const content = (
    <Flex justify="flex-start" align="flex-end">
      <Text className={contentClassName}>
        {numberOfRidersRegistered > 0
          ? registeredNames.join(", ")
          : "No B2C2 Riders Reg'd"}
      </Text>
    </Flex>
  );

  return (
    <>
      <Grid.Col span={isMobile ? 0 : 4}>{!isMobile && label}</Grid.Col>
      <Grid.Col span={isMobile ? 12 : 8}>
        <>
          {isMobile && label}
          {content}
        </>
      </Grid.Col>
    </>
  );
}
