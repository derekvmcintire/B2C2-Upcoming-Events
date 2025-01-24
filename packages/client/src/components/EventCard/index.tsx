import { useState } from "react";
import { Alert, Container, Divider, Flex, Grid } from "@mantine/core";
import type { EventType, FetchRegistrationsResponse } from "../../types";
import RegisteredRidersRow from "./RegisteredRidersRow";
import InterestedRidersRow from "./InterestedRidersRow";
import EventInformationRow from "./EventInformationRow";
import FormRow from "./FormRow";
import { MdOutlineWarning } from "react-icons/md";

import classes from "./event.module.css";
import { updateEvent } from "../../api/updateEvent";
import { useEventsContext } from "../../context/events-context";

type EventProps = {
  event: EventType;
  registrations?: FetchRegistrationsResponse;
};

/**
 * EventCard Component
 *
 * Renders the details of a specific event, including the event's date, name, location, registration link,
 * and the names of registered teammates (if available).
 * - Displays the formatted event date with the weekday and date string.
 * - Displays event details including name, location (city and state), and a link to the registration page.
 * - Lists the names of registered riders, if provided in the `registrations` prop.
 *
 * @param {EventProps} props - The props for the component, including:
 *   - `event`: The event object containing details about the event (name, date, location, URL).
 *   - `registrations` (optional): The list of registrations for the event, used to display registered rider names.
 *
 */
export default function EventCard({
  event,
  registrations,
}: EventProps): JSX.Element {
  const [isSubmittingInterestedRider, setIsSubmittingInterestedRider] =
    useState<boolean>(false);
  const [isSubmittingHousingUrl, setIsSubmittingHousingUrl] =
    useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const eventsContext = useEventsContext();

  const { setRequestFreshData } = eventsContext;

  const { housingUrl, interestedRiders = [] } = event;

  const handleSubmitInterestedRider = async (rider: string) => {
    setIsSubmittingInterestedRider(true);
    const response: any = await updateEvent({
      eventId: event.eventId,
      eventType: event.eventType,
      interestedRiders: [...interestedRiders, rider],
    });
    if (response.status === 200) {
      setRequestFreshData(true);
      setIsSubmittingInterestedRider(false);
    }
  };

  const handleSubmitHousing = async (url: string) => {
    setError("");
    if (!url.startsWith("http")) {
      setError("Housing URL must start with 'http'");
      return;
    }
    setIsSubmittingHousingUrl(true);
    const response: any = await updateEvent({
      eventId: event.eventId,
      eventType: event.eventType,
      housingUrl: url,
    });
    if (response.status === 200) {
      setRequestFreshData(true);
      setIsSubmittingHousingUrl(false);
    }
  };

  const handleRemoveHousing = async () => {
    setIsSubmittingHousingUrl(true);
    const response = await updateEvent({
      eventId: event.eventId,
      eventType: event.eventType,
      housingUrl: null,
    });
    if (response.status === 200) {
      setRequestFreshData(true);
      setIsSubmittingInterestedRider(false);
    }
  };

  const handleRemoveInterestedRider = async (riderToRemove: string) => {
    setIsSubmittingInterestedRider(true);
    const response = await updateEvent({
      eventId: event.eventId,
      eventType: event.eventType,
      interestedRiders: interestedRiders.filter(
        (rider) => rider !== riderToRemove,
      ),
    });
    if (response.status === 200) {
      setRequestFreshData(true);
      setIsSubmittingInterestedRider(false);
    }
  };

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
        <RegisteredRidersRow event={event} registrations={registrations} />
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
        <FormRow
          openedLabel="Please Provide a Link"
          closedLabel="Add Housing"
          placeholder="Enter a URL"
          isSubmitting={isSubmittingHousingUrl}
          submitHandler={handleSubmitHousing}
        />
      </Grid>
      <Divider />
    </Container>
  );
}
