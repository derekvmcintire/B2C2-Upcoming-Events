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
import { EventSubmission } from "../../types";
import { submitEvent } from "../../api/submitEvent";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByType } from "../../api/fetchEventsByType";
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
 * and the race type selection. Upon successful submission, it updates the race events list and provides feedback
 * through success or error messages.
 *
 * State variables include:
 * - bikeregUrl: URL input for the race event from BikeReg
 * - discipline: Selected type of the event (e.g., road, CX, or XC)
 * - isSubmitting: Flag indicating if the form is in the process of submission
 * - error: Stores error messages if submission fails
 * - showSuccess: Flag indicating whether a success message should be displayed
 *
 * @returns A form with a text input for the BikeReg URL, a select dropdown for the race type, and a submit button.
 */

const RaceSubmissionForm = ({
  vertical = false,
}: RaceSubmissionFormProps): JSX.Element => {
  // State variables
  const [bikeregUrl, setBikeregUrl] = useState("");
  const [discipline, setDiscipline] = useState<string | null>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const eventsContext = useEventsContext();
  const { setEvents } = eventsContext;

  /**
   * Updates the road events by fetching the latest list from the server.
   */
  const updateEvents = (discipline: string) => {
    const getEvents = async () => {
      const response = await fetchEventsByType(discipline);
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
    return !validateUrl(bikeregUrl) && discipline !== null && discipline !== "";
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

    setIsSubmitting(true);

    try {
      const submission: EventSubmission = {
        url: bikeregUrl,
        eventType: discipline || "",
      };

      if (!discipline) {
        setError("Must select a discipline");
        return;
      }

      const success = await submitEvent(submission);

      if (success) {
        setShowSuccess(true);
        setBikeregUrl("");
        setDiscipline(null);
        clearEventCache(discipline);
        updateEvents(discipline);
      } else {
        setError("Failed to submit race");
      }
    } catch (err) {
      setError("An error occurred while submitting the race");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          onChange={(value: string | null) => setDiscipline(value)}
          data={[
            { value: DISCIPLINES.ROAD.id, label: DISCIPLINES.ROAD.text },
            { value: DISCIPLINES.CX.id, label: DISCIPLINES.CX.text },
            { value: DISCIPLINES.XC.id, label: DISCIPLINES.XC.text },
          ]}
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
        <Text>Submit a race</Text>
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
