import { useState } from "react";
import {
  Alert,
  Container,
  Divider,
  Flex,
  Grid,
  LoadingOverlay,
} from "@mantine/core";
import { MdOutlineWarning } from "react-icons/md";

import type {
  EventDiscipline,
  EventType,
  FetchRegistrationsResponse,
} from "../../types";
import {
  updateEvent,
  UpdateEventData,
  UpdateEventResponse,
} from "../../api/updateEvent";
import classes from "./event.module.css";

import RegisteredRidersRow from "./RegisteredRidersRow";
import InterestedRidersRow from "./InterestedRidersRow";
import EventInformationRow from "./InformationRow";
import { DISCIPLINES } from "../../constants";
import { SimpleResponse } from "simple-fetch-ts";
import EventCardForm from "./Form";
import { useEventsContext } from "../../context/events-context";
import Hypometer from "./Hypometer";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";

type EventProps = {
  event: EventType;
  registrations?: FetchRegistrationsResponse;
  isLight?: boolean;
  requestDataCallback: (eventType: EventDiscipline) => void;
};

export default function EventCard({
  event,
  registrations,
  isLight = false,
  requestDataCallback,
}: EventProps): JSX.Element {
  const eventsContext = useEventsContext();
  const { isSubmitting, setIsSubmitting } = eventsContext;

  const [error, setError] = useState("");

  const { eventId, housingUrl, interestedRiders = [] } = event;

  // Retrieve registered names by event ID
  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

  const numberOfRidersRegdOrInterested =
    registeredNames.length + interestedRiders.length;

  // Define a generic type for update function parameters
  type UpdateEventParams<T> = {
    eventId: string;
    eventType: EventDiscipline;
  } & T;

  const handleSubmit = async <T,>(
    updateFn: (
      data: UpdateEventParams<T>,
    ) => Promise<SimpleResponse<UpdateEventResponse>>,
    data: T,
  ): Promise<void> => {
    setIsSubmitting(true);
    const response = await updateFn({
      eventId: event.eventId,
      eventType: event.eventType,
      ...data,
    });

    if (response.status === 200) {
      requestDataCallback(event.eventType);
    }
  };

  const handleSubmitInterestedRider = (rider: string) =>
    handleSubmit<UpdateEventData>(updateEvent, {
      eventId: event.eventId,
      eventType: event.eventType,
      interestedRiders: [...interestedRiders, rider],
    });

  const handleSubmitHousing = (url: string) => {
    setError("");
    if (!url.startsWith("http")) {
      setError("Housing URL must start with 'http'");
      return;
    }
    handleSubmit<UpdateEventData>(updateEvent, {
      eventId: event.eventId,
      eventType: event.eventType,
      housingUrl: url,
    });
  };

  const handleRemoveHousing = () =>
    handleSubmit(updateEvent, {
      eventId: event.eventId,
      eventType: event.eventType,
      housingUrl: null,
    });

  const handleRemoveInterestedRider = (riderToRemove: string) =>
    handleSubmit(updateEvent, {
      eventId: event.eventId,
      eventType: event.eventType,
      interestedRiders: interestedRiders.filter(
        (rider) => rider !== riderToRemove,
      ),
    });

  const containerClass = isLight
    ? `${classes.eventContainer} ${classes.lightEventContainer}`
    : classes.eventContainer;

  return (
    <Container className={containerClass} style={{ position: "relative" }}>
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
        <EventInformationRow
          event={event}
          housingUrl={housingUrl}
          removeHousingUrl={handleRemoveHousing}
        />
        {event.eventType !== DISCIPLINES.SPECIAL.id && (
          <RegisteredRidersRow event={event} registrations={registrations} />
        )}

        <InterestedRidersRow
          riders={interestedRiders}
          removeRider={handleRemoveInterestedRider}
        />
      </Grid>
      <Flex justify="center">
        <EventCardForm
          hasHousingUrl={!!housingUrl}
          handleSubmitHousing={handleSubmitHousing}
          handleSubmitInterestedRider={handleSubmitInterestedRider}
        />
      </Flex>
      <Hypometer numberOfRiders={numberOfRidersRegdOrInterested} />
      <Divider mt="16" />
    </Container>
  );
}
