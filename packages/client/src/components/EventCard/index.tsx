import { useState } from "react";
import { Alert, Container, Divider, Flex, Grid } from "@mantine/core";
import type { EventType, FetchRegistrationsResponse } from "../../types";
import RegisteredRidersRow from "./RegisteredRidersRow";
import InterestedRidersRow from "./InterestedRidersRow";
import EventInformationRow from "./EventInformationRow";
import FormRow from "./FormRow";
import { MdOutlineWarning } from "react-icons/md";

import classes from "./event.module.css";

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
  const [interestedRiders, setInterestedRiders] = useState<string[]>([]);
  const [housingUrl, setHousingUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmitInterestedRider = (value: string) => {
    setInterestedRiders((prevState) => [...prevState, value]);
  };

  const handleSubmitHousing = (url: string) => {
    setError("");
    if (!url.startsWith("http")) {
      setError("Housing URL must start with 'http'");
      return;
    }
    setHousingUrl(url);
  };

  const handleRemoveHousing = () => {
    setHousingUrl("");
  };

  const handleInterestedRemoveRider = (riderToRemove: string) => {
    setInterestedRiders((prevRiders) =>
      prevRiders.filter((interestedRider) => interestedRider !== riderToRemove),
    );
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
          removeRider={handleInterestedRemoveRider}
        />
        <FormRow
          openedLabel="Enter Rider Name"
          closedLabel="Add Interested Rider"
          placeholder="Enter Rider Name"
          submitHandler={handleSubmitInterestedRider}
        />
        <FormRow
          openedLabel="Please Provide a Link"
          closedLabel="Add Housing"
          placeholder="Enter a URL"
          submitHandler={handleSubmitHousing}
        />
      </Grid>
      <Divider />
    </Container>
  );
}
