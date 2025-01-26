import { useState } from "react";
import {
  Flex,
  TextInput,
  Select,
  Button,
  Text,
  Stack,
  Alert,
  Anchor,
} from "@mantine/core";
import { EventDiscipline, EventSubmission } from "../../types";
import { submitEvent } from "../../api/submitEvent";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByDiscipline } from "../../api/fetchEventsByType";
import { DISCIPLINES } from "../../constants";
import classes from "./submit.module.css";
import { clearEventCache } from "../../infrastructure/event-cache";

interface RaceSubmissionFormProps {
  vertical?: boolean;
}

/**
 * RaceSubmissionForm Component
 *
 * A form to submit a race by entering a BikeReg URL and selecting a race type. The form validates the URL input
 * and the race type selection. Upon successful submission, it sends data to the API, which requests race data from the bikereg API
 * and then updates the race events list in the database and provides feedback through success or error messages.
 *
 * @returns A form with a text input for the BikeReg URL, a select dropdown for the race type, and a submit button.
 */
const RaceSubmissionForm = ({
  vertical = false,
}: RaceSubmissionFormProps): JSX.Element => {
  // State variables
  const [bikeregUrl, setBikeregUrl] = useState("");
  const [discipline, setDiscipline] = useState<EventDiscipline | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const eventsContext = useEventsContext();
  const { setEvents } = eventsContext;

  /**
   * Updates the road events by fetching the latest list from the server.
   */
  const updateEvents = (discipline: EventDiscipline) => {
    const getEvents = async () => {
      const response = await fetchEventsByDiscipline({ discipline });
      setEvents(response.events);
    };

    getEvents();
  };

  /**
   * Validates the BikeReg URL.
   * @param url - The URL to validate.
   * @returns Error message if invalid, otherwise an empty string.
   */
  const validateUrl = (url: string) => {
    if (!url) return "URL is required";
    try {
      const urlObj = new URL(url);
      if (!urlObj.hostname.endsWith("bikereg.com")) {
        return "URL must be from bikereg.com";
      }
      return "";
    } catch {
      return "Invalid URL format";
    }
  };

  /**
   * Checks if the form is valid for submission.
   * @returns True if valid, false otherwise.
   */
  const isFormValid = () => {
    return !validateUrl(bikeregUrl) && discipline !== null;
  };

  /**
   * Handles form submission by validating input, submitting data, and updating the UI accordingly.
   */
  const handleSubmit = async () => {
    setError("");
    setShowSuccess(false);

    if (!isFormValid()) {
      setError("Please fill in all fields correctly");
      return;
    }

    if (!discipline) {
      setError("Must select a discipline");
    }

    setIsSubmitting(true);

    try {
      const submission: EventSubmission = {
        url: bikeregUrl,
        eventType: discipline as EventDiscipline,
      };

      if (!discipline) {
        setError("Must select a discipline");
        return;
      }

      const response = await submitEvent(submission);

      if (response.success) {
        setShowSuccess(true);
        setBikeregUrl("");
        setDiscipline(null);
        clearEventCache(discipline);
        updateEvents(discipline);
      } else {
        setError(
          `FAILED TO SUBMIT RACE:  ${response.message || "Unknown Error"}`,
        );
      }
    } catch (error) {
      setError(`Unknown Error when submitting race: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEventDiscipline = (
    value: string | null,
  ): value is EventDiscipline => {
    return (
      value !== null && Object.values(DISCIPLINES).some((d) => d.id === value)
    );
  };

  const handleOnChangeSelect = (value: string | null) => {
    if (isEventDiscipline(value)) {
      setDiscipline(value); // Safely call setDiscipline
    } else {
      console.error("Invalid value selected:", value);
    }
  };

  const disciplineOptions = Object.values(DISCIPLINES).map((d) => ({
    value: d.id,
    label: d.text,
  }));

  const formCore = (
    <Stack w="80%" className={classes.formCore}>
      <TextInput
        className={`${classes.formInput} ${classes.urlInput}`}
        placeholder="https://www.bikereg.com/..."
        value={bikeregUrl}
        onChange={(e) => setBikeregUrl(e.target.value)}
      />
      <Flex w="100%" justify="space-between">
        <Select
          className={`${classes.formInput} ${classes.disciplineInput}`}
          placeholder="Race Discipline"
          value={discipline}
          onChange={handleOnChangeSelect}
          data={disciplineOptions}
        />

        <Button
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!isFormValid() || isSubmitting}
        >
          Submit Race
        </Button>
      </Flex>
    </Stack>
  );

  const alignment = vertical ? "center" : "flex-start";
  return (
    <Stack align={alignment} w="100%" className={classes.submissionForm}>
      {vertical ? (
        <>
          <Text className={classes.formDescription}>
            Enter a valid BikeReg URL, select a race discipline and we will grab
            the race info from BikeReg and add it to the calendar.
          </Text>
        </>
      ) : (
        <Text>
          Submit a race or <Anchor href="/submit">Submit a Team Event</Anchor>
        </Text>
      )}

      {error && (
        <Alert color="red" withCloseButton onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {showSuccess && (
        <Alert
          color="green"
          withCloseButton
          onClose={() => setShowSuccess(false)}
        >
          Race submitted successfully!
        </Alert>
      )}

      {vertical ? (
        <Stack w="100%" align="center">
          {formCore}
        </Stack>
      ) : (
        <Flex w="100%" justify="flex-start">
          {formCore}
        </Flex>
      )}
    </Stack>
  );
};

export default RaceSubmissionForm;
