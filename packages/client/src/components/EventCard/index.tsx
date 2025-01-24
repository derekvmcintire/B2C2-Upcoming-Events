import { useState } from "react";
import { Alert, Container, Divider, Flex, Grid } from "@mantine/core";
import { MdOutlineWarning } from "react-icons/md";

import type {
  EventDiscipline,
  EventType,
  FetchRegistrationsResponse,
} from "../../types";
import { updateEvent } from "../../api/updateEvent";
import classes from "./event.module.css";

import RegisteredRidersRow from "./RegisteredRidersRow";
import InterestedRidersRow from "./InterestedRidersRow";
import EventInformationRow from "./EventInformationRow";
import FormRow from "./FormRow";
import { DISCIPLINES } from "../../constants";

type EventProps = {
  event: EventType;
  registrations?: FetchRegistrationsResponse;
  requestDataCallback: (eventType: EventDiscipline) => void;
};

export default function EventCard({
  event,
  registrations,
  requestDataCallback,
}: EventProps): JSX.Element {
  const [isSubmittingInterestedRider, setIsSubmittingInterestedRider] =
    useState(false);
  const [isSubmittingHousingUrl, setIsSubmittingHousingUrl] = useState(false);
  const [error, setError] = useState("");

  const { housingUrl, interestedRiders = [] } = event;

  const handleSubmit = async (
    updateFn: (data: any) => Promise<any>,
    setter: (value: boolean) => void,
    data: any,
  ) => {
    setter(true);
    const response = await updateFn(data);
    if (response.status === 200) {
      requestDataCallback(event.eventType);
      setter(false);
    }
  };

  const handleSubmitInterestedRider = (rider: string) =>
    handleSubmit(updateEvent, setIsSubmittingInterestedRider, {
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
    handleSubmit(updateEvent, setIsSubmittingHousingUrl, {
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

  return (
    <Container className={classes.eventContainer}>
      {error && (
        <Flex justify="center">
          <Alert
            className={classes.alert}
            variant="light"
            color="red"
            title="Error"
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
        <FormRow
          openedLabel="Enter Rider Name"
          closedLabel="Add Interested Rider"
          placeholder="Enter Rider Name"
          isSubmitting={isSubmittingInterestedRider}
          submitHandler={handleSubmitInterestedRider}
        />
        {!housingUrl && (
          <FormRow
            openedLabel="Please Provide a Link"
            closedLabel="Add Housing"
            placeholder="Enter a URL"
            isSubmitting={isSubmittingHousingUrl}
            submitHandler={handleSubmitHousing}
          />
        )}
      </Grid>
      <Divider />
    </Container>
  );
}
