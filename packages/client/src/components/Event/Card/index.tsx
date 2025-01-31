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
import RidersList from "../RidersBlock";
import LogisticsBlock from "../LogisticsBlock";
import Hypometer from "../Hypometer";

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

  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

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

  /**
   * Handles the submission of an interested rider.
   *
   * @param rider - The rider to be submitted.
   */
  const handleSubmitInterestedRider = (rider: string) =>
    handleSubmitEventUpdate({
      eventId: eventId,
      eventType: eventType,
      interestedRiders: [...interestedRiders, rider],
    });

  /**
   * Handles the submission of a housing URL.
   *
   * @param url - The housing URL to be submitted.
   */
  const handleSubmitHousing = (url: string) => {
    setError("");
    if (!url.startsWith("http")) {
      setError("Housing URL must start with 'http'");
      return;
    }
    handleSubmitEventUpdate({
      eventId: eventId,
      eventType: eventType,
      housingUrl: url,
    });
  };

  /**
   * Handles the submission of the event description.
   *
   * @param description - The new description for the event.
   */
  const handleSubmitDescription = (description: string) =>
    handleSubmitEventUpdate({
      eventId: eventId,
      eventType: eventType,
      description,
    });

  /**
   * Handles the removal of housing for an event.
   */
  const handleRemoveHousing = () =>
    handleSubmitEventUpdate({
      eventId: eventId,
      eventType: eventType,
      housingUrl: null,
    });

  /**
   * Handles the removal of an interested rider from the event.
   * @param {string} riderToRemove - The rider to be removed.
   */
  const handleRemoveInterestedRider = (riderToRemove: string) =>
    handleSubmitEventUpdate({
      eventId: eventId,
      eventType: eventType,
      interestedRiders: interestedRiders.filter(
        (rider) => rider !== riderToRemove,
      ),
    });

  return (
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
      <Grid w="100%" className={classes.eventGrid}>
        <EventProvider event={event}>
          <Grid.Col span={12}>
            <EventName />
          </Grid.Col>
          <Grid.Col span={12}>
            <LinkBlock
              handleSubmitHousing={handleSubmitHousing}
              handleSubmitInterestedRider={handleSubmitInterestedRider}
            />
          </Grid.Col>
          <Divider w="100%" mb="16" />
          <Grid.Col span={6}>
            <Flex w="100%" justify="center">
              <LocationBlock />
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <RidersList
              interestedRiders={interestedRiders}
              registeredRiders={registeredNames}
              removeRider={() => {}}
            />
          </Grid.Col>
          <Divider w="100%" mb="16" />
          <Grid.Col span={6}>
            <Stack w="100%" h="100%" justify="flex-end">
            <LogisticsBlock />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Description submitFn={() => {}} />
          </Grid.Col>
        </EventProvider>
      </Grid>
      <Hypometer
        numberOfInterestedRiders={interestedRiders.length}
        numberOfRegisteredRiders={registeredNames.length}
      />
      <Divider />
    </Stack>
  );
}
