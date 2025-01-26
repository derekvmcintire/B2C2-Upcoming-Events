import { useState } from "react";
import { Flex, TextInput, Button, Text, Stack, Alert } from "@mantine/core";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByType } from "../../api/fetchEventsByType";
import classes from "./submit.module.css";
import { clearEventCache } from "../../infrastructure/event-cache";
import { v4 as uuidv4 } from "uuid";
import { EventDiscipline } from "../../types";
import { DISCIPLINES } from "../../constants";
import { submitSpecialEvent } from "../../api/submitSpecialEvent";

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
   * Updates the special events by fetching the latest list from the server.
   */
  const updateEvents = () => {
    const getEvents = async () => {
      const response = await fetchEventsByType(DISCIPLINES.SPECIAL.id);
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

    const selectedDate = new Date(date); // date is in YYYY-MM-DD format
    selectedDate.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)

    // Get the timezone offset in minutes and adjust the date
    const timezoneOffset = selectedDate.getTimezoneOffset(); // Offset in minutes
    selectedDate.setMinutes(selectedDate.getMinutes() - timezoneOffset);

    // Convert to ISO string and remove the 'Z' (to indicate local time)
    const formattedDate = selectedDate.toISOString().slice(0, -1);

    try {
      const submission = {
        eventId: uuidv4(),
        eventType: DISCIPLINES.SPECIAL.id as EventDiscipline,
        city,
        date: formattedDate,
        name,
        state,
        eventUrl: eventUrl || undefined,
        housingUrl: housingUrl || undefined,
      };

      const success = await submitSpecialEvent(submission);

      if (success) {
        setShowSuccess(true);
        // Reset form fields
        setCity("");
        setDate("");
        setName("");
        setState("");
        setEventUrl("");
        setHousingUrl("");

        // Clear cache and update events
        clearEventCache("special");
        updateEvents();
      } else {
        setError("Failed to submit special event");
      }
    } catch (err) {
      setError("An error occurred while submitting the special event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formCore = (
    <Stack w="80%" className={classes.formCore}>
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
        onClick={handleSubmit}
        loading={isSubmitting}
        disabled={!isFormValid() || isSubmitting}
      >
        Submit Special Event
      </Button>
    </Stack>
  );

  return (
    <Stack align="center" w="100%" className={classes.submissionForm}>
      <Text className={classes.formDescription}>
        Submit a special event - or any event that isn't on BikeReg, to add it
        to the calendar.
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
          Special event submitted successfully!
        </Alert>
      )}
      <Flex w="100%" justify="center">
        {formCore}
      </Flex>
    </Stack>
  );
};

export default SpecialEventSubmissionForm;
