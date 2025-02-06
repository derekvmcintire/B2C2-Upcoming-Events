import { Flex, Button, Text, Stack, Alert } from "@mantine/core";
import { useEventsContext } from "../../context/events-context";
import { fetchEventsByDiscipline } from "../../api/fetchEventsByType";
import { submitSpecialEvent } from "../../api/submitSpecialEvent";
import { SpecialEventFormCore } from "./SpecialEventFormCore";
import { isEventDiscipline } from "../../utils/discipline";
import classes from "./submit.module.css";
import { useSpecialEventForm } from "../../hooks/useSpecialEventForm";

interface SpecialEventSubmissionFormProps {
  isQuickContes?: boolean;
}

/**
 * Special Event Submission Form component.
 *
 * @component
 * @param {SpecialEventSubmissionFormProps} props - The component props.
 * @returns {JSX.Element} The rendered Special Event Submission Form.
 */
const SpecialEventSubmissionForm = ({
  isQuickContes = false,
}: SpecialEventSubmissionFormProps): JSX.Element => {
  const {
    formData,
    submissionState,
    disciplineOptions,
    labelOptions,
    methods,
  } = useSpecialEventForm({ isQuickContes });

  const eventsContext = useEventsContext();
  const { setEvents } = eventsContext;

  /**
   * Updates the events after form submission.
   * Fetches events by discipline and updates the state with the response events.
   */
  const updateEventsAfterSubmit = async () => {
    const response = await fetchEventsByDiscipline({
      discipline: formData.discipline,
      skipCache: true,
    });
    setEvents(response.events);
  };

  /**
   * Handles the form submission for the SpecialEventForm component.
   * This function performs form validation, prepares the submission data, and submits the special event.
   * If the submission is successful, it resets the form and updates the events.
   * If there is an error during the submission, it sets the submission state with the error message.
   */
  const handleSubmit = async () => {
    const { validateForm, prepareSubmission, resetForm, setSubmissionState } =
      methods;

    // Reset previous submission state
    setSubmissionState({
      error: "",
      showSuccess: false,
      isSubmitting: true,
    });

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setSubmissionState({
        error: validationError,
        isSubmitting: false,
      });
      return;
    }

    try {
      const submission = prepareSubmission();
      const response = await submitSpecialEvent(submission);
      console.log("got response: ", response);

      if (response.success) {
        resetForm(true);
        await updateEventsAfterSubmit();
      } else {
        setSubmissionState({
          error: `FAILED TO SUBMIT TEAM EVENT: ${response.message || "Unknown Error"}`,
          isSubmitting: false,
        });
      }
    } catch (error) {
      setSubmissionState({
        error: `Unknown Error when submitting team event: ${error}`,
        isSubmitting: false,
      });
    }
  };

  return (
    <Stack align="center" w="100%" className={classes.submissionForm}>
      {!isQuickContes ? (
        <Text className={classes.formDescription}>
          Submit a special event - or any event that isn't on BikeReg, to add it
          to the calendar. Discipline will default to "Team Events" - but you
          can select another discipline if you want.
        </Text>
      ) : (
        <Text className={classes.formDescription}>
          Select the date and add a Conte's Ride
        </Text>
      )}

      {submissionState.error && (
        <Alert
          color="red"
          withCloseButton
          onClose={() => methods.setSubmissionState({ error: "" })}
        >
          {submissionState.error}
        </Alert>
      )}

      {submissionState.showSuccess && (
        <Alert
          color="green"
          withCloseButton
          onClose={() => methods.setSubmissionState({ showSuccess: false })}
        >
          Event submitted successfully!
        </Alert>
      )}

      <Flex w="100%" justify="center">
        <SpecialEventFormCore
          formData={formData}
          isQuickContes={isQuickContes}
          disciplineOptions={disciplineOptions}
          labelOptions={labelOptions}
          onUpdate={methods.updateFormData}
          onToggleVirtual={methods.toggleVirtual}
          onDisciplineChange={(value) =>
            isEventDiscipline(value) &&
            methods.updateFormData({ discipline: value })
          }
        />
      </Flex>

      <Button
        className={classes.formInput}
        onClick={handleSubmit}
        loading={submissionState.isSubmitting}
        disabled={submissionState.isSubmitting}
      >
        Submit Event
      </Button>
    </Stack>
  );
};

export default SpecialEventSubmissionForm;
