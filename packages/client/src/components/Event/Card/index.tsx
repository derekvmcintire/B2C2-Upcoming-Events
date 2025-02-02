import { useCallback, useState } from "react";
import {
  Alert,
  Divider,
  Flex,
  Grid,
  LoadingOverlay,
  Stack,
} from "@mantine/core";
import { MdOutlineWarning } from "react-icons/md";

import classes from "../styles/event.module.css";
import { useEventsContext } from "../../../context/events-context";
import { UpdateEventData, updateEvent } from "../../../api/updateEvent";
import {
  EventType,
  FetchRegistrationsResponse,
  EventDiscipline,
} from "../../../types";
import { getEntriesByEventId } from "../../../utils/findRegisteredRiders";
import EventName from "../TitleBlock";
import { EventProvider } from "../../../context/event-context";
import LocationBlock from "../LocationBlock";
import LinkBlock from "../LinkBlock";
import Description from "../DescriptionBlock";
// import RiderListBlock from "../RidersBlock";
import LogisticsBlock from "../LogisticsBlock";
import Hypometer from "../Hypometer";
import Date from "../Date";
import { useMediaQuery } from "@mantine/hooks";
import { DISCIPLINES, LABELS, MOBILE_BREAK_POINT } from "../../../constants";
import EventLabel from "../EventLabel";
import DraggableRidersLists from "../../Shared/Lists/DraggableRidersList";
import {
  RIDER_LIST_EVENT_TYPES,
  RiderListEventType,
} from "../../Shared/Lists/types";

type EventProps = {
  event: EventType;
  registrations?: FetchRegistrationsResponse;
  requestDataCallback: (eventType: EventDiscipline) => void;
};

/**
 * Renders an event card component.
 *
 * @param event - The event object.
 * @param registrations - The registrations for the event.
 * @param isStripe - Used to determine the background color of the card to create a "striped" effect.
 * @param requestDataCallback - Callback function to request data for the event type.
 * @returns The rendered event card component.
 */
export default function EventCard({
  event,
  registrations,
  requestDataCallback,
}: EventProps): JSX.Element {
  const [error, setError] = useState("");

  const eventsContext = useEventsContext();
  const { isSubmitting, setIsSubmitting } = eventsContext;
  const { eventId, eventType, interestedRiders = [] } = event;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

  const riderListEventType: RiderListEventType =
    event.eventType === DISCIPLINES.SPECIAL.id
      ? RIDER_LIST_EVENT_TYPES.SPECIAL
      : RIDER_LIST_EVENT_TYPES.RACE;

  /**
   * Handles the form submission by calling the provided update function with the given data.
   * @param {UpdateEventData} data The data to be submitted.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleSubmitEventUpdate = useCallback(
    async (data: UpdateEventData): Promise<void> => {
      setIsSubmitting(true);
      const response = await updateEvent(data);

      if (response.success) {
        requestDataCallback(eventType);
      } else {
        setError(`Error submiting event update: ${response.message}`);
      }
    },
    [requestDataCallback, eventType, setIsSubmitting],
  );

  // /**
  //  * Handles the removal of an interested rider from the event.
  //  * @param {string} riderToRemove - The rider to be removed.
  //  */
  // const handleRemoveInterestedRider = (riderToRemove: string) =>
  //   handleSubmitEventUpdate({
  //     eventId: eventId,
  //     eventType: eventType,
  //     interestedRiders: interestedRiders.filter(
  //       (rider) => rider !== riderToRemove,
  //     ),
  //   });

  const label = eventType === "special" ? LABELS.TRIP : LABELS.RACE;

  return (
    <Stack gap={0}>
      <EventLabel label={label} />
      <Stack
        key={eventId}
        gap={0}
        className={classes.eventContainer}
        style={{ position: "relative" }}
      >
        <LoadingOverlay
          visible={isSubmitting}
          zIndex={1000}
          overlayProps={{
            blur: 2,
            fixed: false,
            style: { position: "absolute" },
          }}
        />
        {error && (
          <Flex justify="center">
            <Alert
              className={classes.alert}
              variant="light"
              color="red"
              title="Error"
              withCloseButton
              onClose={() => setError("")}
              icon={<MdOutlineWarning />}
            >
              {error}
            </Alert>
          </Flex>
        )}
        <Hypometer
          numberOfInterestedRiders={interestedRiders.length}
          numberOfRegisteredRiders={registeredNames.length}
        />
        <Grid w="100%" className={classes.eventGrid}>
          <EventProvider event={event}>
            <Grid.Col span={isMobile ? 12 : 3}>
              <Date />
            </Grid.Col>
            <Grid.Col span={isMobile ? 12 : 9}>
              <Stack h="100%" justify="center" p="16">
                <EventName />
                <LinkBlock handleUpdateEvent={handleSubmitEventUpdate} />
              </Stack>
            </Grid.Col>
            <Divider w="100%" mb="16" />
            <Grid.Col span={isMobile ? 12 : 5}>
              <Flex w="100%" justify="center">
                <LocationBlock />
              </Flex>
            </Grid.Col>
            <Grid.Col span={isMobile ? 12 : 7}>
              <Flex
                w="100%"
                h="100%"
                p={isMobile ? "0" : "24"}
                justify="center"
                align="center"
              >
                <Description submitFn={handleSubmitEventUpdate} />
              </Flex>
            </Grid.Col>
            <Divider w="100%" mb="16" />
            <Grid.Col span={12}>
              {/* Rider Lists */}
              <DraggableRidersLists
                isStatic={event.eventType !== DISCIPLINES.SPECIAL.id}
                eventListType={riderListEventType}
                registrations={registeredNames}
              />
            </Grid.Col>
            {/* <Grid.Col span={12}>
              <RiderListBlock
                interestedRiders={interestedRiders}
                registeredRiders={registeredNames}
                removeInterestedRiderFn={handleRemoveInterestedRider}
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <Stack w="100%" h="100%" justify="flex-end">
                <LogisticsBlock handleUpdateEvent={handleSubmitEventUpdate} />
              </Stack>
            </Grid.Col>
          </EventProvider>
        </Grid>
        <Divider />
      </Stack>
    </Stack>
  );
}
