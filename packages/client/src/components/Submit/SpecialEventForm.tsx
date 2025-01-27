import { useState } from "react";
import {
  Flex,
  TextInput,
  Button,
  Text,
  Stack,
  Alert,
  Select,
} from "@mantine/core";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByDiscipline } from "../../api/fetchEventsByType";
import classes from "./submit.module.css";
import { v4 as uuidv4 } from "uuid";
import { EventDiscipline } from "../../types";
import { DISCIPLINES } from "../../constants";
import { submitSpecialEvent } from "../../api/submitSpecialEvent";
import { isEventDiscipline } from "../../utils/discipline";
import { formatDateForStorage } from "../../utils/dates";

/**
 * SpecialEventSubmissionForm Component
 *
 * A form to submit a special event. This form collects all data relevant to an event and sends it to the API to be inserted into the database.
 * Unlike the RaceSubmissionForm, this flow relies on no external APIs for data, all data is user submitted.
 *
 * @returns A form with a input to collect event information, and a submit button.
 */
const SpecialEventSubmissionForm = (): JSX.Element => {
  // State variables for required fields
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [discipline, setDiscipline] = useState<EventDiscipline>(
    DISCIPLINES.SPECIAL.id,
  );

  const disciplineOptions = Object.values(DISCIPLINES).map((d) => ({
    value: d.id,
    label: d.text,
  }));

  // State variables for optional fields
  const [eventUrl, setEventUrl] = useState("");
  const [housingUrl, setHousingUrl] = useState("");

  // Other state variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const eventsContext = useEventsContext();
  const { setEvents } = eventsContext;

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
   * Updates the special events by fetching the latest list from the server.
   */
  const updateEventsAfterSubmit = () => {
    const getEvents = async () => {
      const response = await fetchEventsByDiscipline({
        discipline: discipline,
        skipCache: true,
      });
      setEvents(response.events);
    };

    getEvents();
  };

  /**
   * Validates the form inputs.
   * @returns Error message if invalid, otherwise an empty string.
   */
  const getValidationErrors = () => {
    if (!city.trim()) return "City is required";
    if (!date.trim()) return "Date is required";
    if (!name.trim()) return "Name is required";
    if (!state.trim()) return "State is required";

    // Optional URL validation
    if (eventUrl && !isValidUrl(eventUrl)) return "Invalid event URL";
    if (housingUrl && !isValidUrl(housingUrl)) return "Invalid housing URL";

    return "";
  };

  /**
   * Checks if a URL is valid.
   * @param url - The URL to validate.
   * @returns True if valid, false otherwise.
   */
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Checks if the form is valid by performing several validation steps.
   *
   * @returns {boolean} True if the form is valid; otherwise, false.
   */
  const isFormValid = (): boolean => {
    // Validate the form and return false if there's an error
    if (getValidationErrors()) {
      return false;
    }

    // Validate the event URL if it exists
    if (eventUrl && !isValidUrl(eventUrl)) {
      return false;
    }

    // Validate the housing URL if it exists
    if (housingUrl && !isValidUrl(housingUrl)) {
      return false;
    }

    // If all checks pass, the form is valid
    return true;
  };

  /**
   * Resets the form fields to their initial values.
   */
  const resetFormFields = () => {
    setCity("");
    setDate("");
    setName("");
    setState("");
    setEventUrl("");
    setHousingUrl("");
    setDiscipline(DISCIPLINES.SPECIAL.id);
  };

  /**
   * Handles form submission by validating input, submitting data, and updating the UI accordingly.
   */
  const handleSubmit = async () => {
    setError("");
    setShowSuccess(false);

    const validationError = getValidationErrors();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = {
        eventId: uuidv4(),
        eventType: discipline,
        city,
        date: formatDateForStorage(date),
        name,
        state,
        eventUrl: eventUrl || undefined,
        housingUrl: housingUrl || undefined,
      };

      const response = await submitSpecialEvent(submission);

      if (response.success) {
        setShowSuccess(true);
        resetFormFields();
        updateEventsAfterSubmit();
      } else {
        setError(
          `FAILED TO SUBMIT TEAM EVENT:  ${response.message || "Unknown Error"}`,
        );
      }
    } catch (error) {
      setError(`Unknown Error when submitting team event: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formCore = (
    <Stack w="100%" className={classes.formCore}>
      <TextInput
        className={classes.formInput}
        placeholder="Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextInput
        className={classes.formInput}
        placeholder="Date*"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <TextInput
        className={classes.formTextInput}
        placeholder="City*"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <TextInput
        className={classes.formInput}
        placeholder="State*"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <Select
        className={`${classes.formInput} ${classes.disciplineInput}`}
        placeholder="Race Discipline"
        value={discipline}
        onChange={handleOnChangeSelect}
        data={disciplineOptions}
      />
      <TextInput
        className={classes.formInput}
        placeholder="Event URL (optional)"
        value={eventUrl}
        onChange={(e) => setEventUrl(e.target.value)}
      />
      <TextInput
        className={classes.formInput}
        placeholder="Housing URL (optional)"
        value={housingUrl}
        onChange={(e) => setHousingUrl(e.target.value)}
      />

      <Button
        className={classes.formInput}
        onClick={handleSubmit}
        loading={isSubmitting}
        disabled={!isFormValid() || isSubmitting}
      >
        Submit Event
      </Button>
    </Stack>
  );

  return (
    <Stack align="center" w="100%" className={classes.submissionForm}>
      <Text className={classes.formDescription}>
        Submit a special event - or any event that isn't on BikeReg, to add it
        to the calendar. Discipline will default to "Team Events" - but you can
        select another discipline if you want.
      </Text>

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
          Event submitted successfully!
        </Alert>
      )}
      <Flex w="100%" justify="center">
        {formCore}
      </Flex>
    </Stack>
  );
};

export default SpecialEventSubmissionForm;
