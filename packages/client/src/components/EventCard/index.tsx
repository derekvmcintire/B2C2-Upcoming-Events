import { useState } from "react";
import { Alert, Container, Divider, Flex, Grid } from "@mantine/core";
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
import EventInformationRow from "./EventInformationRow";
import { DISCIPLINES } from "../../constants";
import { SimpleResponse } from "simple-fetch-ts";
import EventCardForm from "./EventCardForm";

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
  const [isSubmittingInterestedRider, setIsSubmittingInterestedRider] =
    useState(false);
  const [isSubmittingHousingUrl, setIsSubmittingHousingUrl] = useState(false);
  const [error, setError] = useState("");

  const { housingUrl, interestedRiders = [] } = event;

  // Define a generic type for update function parameters
  type UpdateEventParams<T> = {
    eventId: string;
    eventType: EventDiscipline;
  } & T;

  const handleSubmit = async <T,>(
    updateFn: (
      data: UpdateEventParams<T>,
    ) => Promise<SimpleResponse<UpdateEventResponse>>,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    data: T,
  ): Promise<void> => {
    setter(true);
    try {
      const response = await updateFn({
        eventId: event.eventId,
        eventType: event.eventType,
        ...data,
      });

      if (response.status === 200) {
        requestDataCallback(event.eventType);
      }
    } finally {
      setter(false);
    }
  };

  const handleSubmitInterestedRider = (rider: string) =>
    handleSubmit<UpdateEventData>(updateEvent, setIsSubmittingInterestedRider, {
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
    handleSubmit<UpdateEventData>(updateEvent, setIsSubmittingHousingUrl, {
      eventId: event.eventId,
      eventType: event.eventType,
      housingUrl: url,
    });
  };

  const handleRemoveHousing = () =>
    handleSubmit(updateEvent, setIsSubmittingHousingUrl, {
      eventId: event.eventId,
      eventType: event.eventType,
      housingUrl: null,
    });

  const handleRemoveInterestedRider = (riderToRemove: string) =>
    handleSubmit(updateEvent, setIsSubmittingInterestedRider, {
      eventId: event.eventId,
      eventType: event.eventType,
      interestedRiders: interestedRiders.filter(
        (rider) => rider !== riderToRemove,
      ),
    });

  const containerClass = isLight ? `${classes.eventContainer} ${classes.lightEventContainer}` : classes.eventContainer;

  return (
    <Container className={containerClass}>
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
          isSubmitting={isSubmittingHousingUrl || isSubmittingInterestedRider}
          handleSubmitHousing={handleSubmitHousing}
          handleSubmitInterestedRider={handleSubmitInterestedRider}
        />
      </Flex>
      <Divider mt="16" />
    </Container>
  );
}
