import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { useDebounce } from "../../hooks/useDebounce";
import { isEventDiscipline } from "../../utils/discipline";
import DraggableRidersLists from "../Shared/Draggable/DraggableRidersList";

interface RaceSubmissionFormProps {
  vertical?: boolean;
  validateDelay?: number;
}

/**
 * RaceSubmissionForm Component
 *
 * A form to submit a race by entering a BikeReg URL and selecting a race type.
 * The form validates the URL input and the race type selection. Upon successful
 * submission, it sends data to the API, updates the race events list, and provides
 * feedback through success or error messages.
 *
 * @returns A form with a text input for the BikeReg URL, a select dropdown for the race type, and a submit button.
 */
const RaceSubmissionForm = ({
  vertical = false,
  validateDelay = 500,
}: RaceSubmissionFormProps): JSX.Element => {
  // State variables
  const [bikeregUrl, setBikeregUrl] = useState("");
  const [discipline, setDiscipline] = useState<EventDiscipline | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const eventsContext = useEventsContext();
  const { setEvents } = eventsContext;

  const debouncedValue = useDebounce(bikeregUrl, validateDelay);

  /**
   * Updates the race events list after a successful submission.
   *
   * @param discipline - The selected event discipline.
   */
  const updateEventsAfterSubmit = (discipline: EventDiscipline) => {
    const getEvents = async () => {
      const response = await fetchEventsByDiscipline({
        discipline,
        skipCache: true,
      });
      setEvents(response.events);
    };

    getEvents();
  };

  /**
   * Validates the provided BikeReg URL.
   *
   * @param url - The URL to validate.
   * @returns An error message if the URL is invalid, otherwise an empty string.
   */
  const validateUrl = useCallback((url: string) => {
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
  }, []);

  /**
   * Determines whether the form is valid for submission.
   *
   * @returns True if the form is valid, otherwise false.
   */
  const isFormValid = () => {
    return !validateUrl(bikeregUrl) && discipline !== null;
  };

  useEffect(() => {
    if (isTyping) {
      if (debouncedValue && validateUrl(debouncedValue)) {
        setError("Invalid URL. URL must be from https://www.bikereg.com");
      } else {
        setError("");
      }
      setIsTyping(false);
    }
  }, [debouncedValue, validateUrl, isTyping]);

  /**
   * Handles form submission, including validation, API call, and UI updates.
   */
  const handleSubmit = async () => {
    setError("");
    setShowSuccess(false);
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
        updateEventsAfterSubmit(discipline);
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

  /**
   * Handles the change event for the race discipline dropdown.
   *
   * @param value - The selected discipline value.
   */
  const handleOnChangeSelect = (value: string | null) => {
    if (isEventDiscipline(value)) {
      setDiscipline(value); // Safely call setDiscipline
    } else {
      console.error("Invalid value selected:", value);
    }
  };

  /**
   * Handles the change event for the BikeReg URL input.
   *
   * @param e - The change event from the input.
   */
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setBikeregUrl(e.target.value);
  };

  const disciplineOptions = Object.values(DISCIPLINES).map((d) => ({
    value: d.id,
    label: d.text,
    disabled: d.id === DISCIPLINES.SPECIAL.id,
  }));

  const formCore = (
    <Stack w="80%" className={classes.formCore}>
      <TextInput
        className={`${classes.formInput} ${classes.urlInput}`}
        placeholder="https://www.bikereg.com/..."
        value={bikeregUrl}
        onChange={handleUrlChange}
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

      <DraggableRidersLists />
    </Stack>
  );
};

export default RaceSubmissionForm;
