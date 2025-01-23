import { useState } from 'react'
import { Container, Divider, Grid } from "@mantine/core";
import classes from './event.module.css';
import type { EventType, FetchRegistrationsResponse } from "../../types";
import RegisteredRidersRow from "./RegisteredRidersRow";
import InterestedRidersRow from "./InterestedRidersRow";
import EventInformationRow from "./EventInformationRow";
import FormRow from "./FormRow";


type EventProps = {
  event: EventType,
  registrations?: FetchRegistrationsResponse,
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

const handleSubmitInterestedRider = (value: string) => {
  console.log('value is: ', value)
  setInterestedRiders(prevState => [...prevState, value])
}

  return (
    <Container className={classes.eventContainer}>
      <Grid w="100%" className={classes.eventGrid}>
        <EventInformationRow event={event} />
        <RegisteredRidersRow event={event} registrations={registrations} />
        <InterestedRidersRow riders={interestedRiders} />
        <FormRow openedLabel="Enter Rider Name" closedLabel="Add Interested Rider" placeholder="Enter Rider Name" submitHandler={handleSubmitInterestedRider}  />
        <FormRow openedLabel="Please Provide a Link" closedLabel="Add Housing" placeholder="Enter a URL" submitHandler={() => {} }  />
      </Grid>
      <Divider />
    </Container>
  );
}
