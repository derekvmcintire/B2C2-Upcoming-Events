import { useState } from 'react';
import { Flex, TextInput, Select, Button, Text, Stack, Alert } from '@mantine/core';
import { EventSubmission } from '../../types';
import { submitEvent } from '../../api/submitEvent';
import { useEventsContext } from '../../context/events-context';
import { fetchEventsByType } from '../../api/fetchEventsByType';
import { DISCIPLINES } from '../../constants';
import classes from './submit.module.css';

/**
 * RaceSubmissionForm Component
 * 
 * A form to submit a race by entering a BikeReg URL and selecting a race type. The form validates the URL input 
 * and the race type selection. Upon successful submission, it updates the race events list and provides feedback 
 * through success or error messages.
 * 
 * State variables include:
 * - bikeregUrl: URL input for the race event from BikeReg
 * - eventType: Selected type of the event (e.g., road, CX, or XC)
 * - isSubmitting: Flag indicating if the form is in the process of submission
 * - error: Stores error messages if submission fails
 * - showSuccess: Flag indicating whether a success message should be displayed
 * 
 * @returns A form with a text input for the BikeReg URL, a select dropdown for the race type, and a submit button.
 */

const RaceSubmissionForm = (): JSX.Element => {
  // State variables
  const [bikeregUrl, setBikeregUrl] = useState('');
  const [eventType, setEventType] = useState<string | null>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const eventsContext = useEventsContext();
  const { setEvents } = eventsContext;

  /**
   * Updates the road events by fetching the latest list from the server.
   */
  const updateEvents = () => {
    if (!eventType) {
      return;
    }
    const getEvents = async () => {
      const response = await fetchEventsByType(eventType);
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
    if (!url) return 'URL is required';
    try {
      const urlObj = new URL(url);
      if (!urlObj.hostname.endsWith('bikereg.com')) {
        return 'URL must be from bikereg.com';
      }
      return '';
    } catch {
      return 'Invalid URL format';
    }
  };

  /**
   * Checks if the form is valid for submission.
   * @returns True if valid, false otherwise.
   */
  const isFormValid = () => {
    return !validateUrl(bikeregUrl) && eventType !== null && eventType !== '';
  };

  /**
   * Handles form submission by validating input, submitting data, and updating the UI accordingly.
   */
  const handleSubmit = async () => {
    setError('');
    setShowSuccess(false);

    if (!isFormValid()) {
      setError('Please fill in all fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: EventSubmission = {
        url: bikeregUrl,
        eventType: eventType || ''
      };

      const success = await submitEvent(submission);

      if (success) {
        setShowSuccess(true);
        setBikeregUrl('');
        setEventType(null);
        updateEvents();
      } else {
        setError('Failed to submit race');
      }
    } catch (err) {
      setError('An error occurred while submitting the race');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack align="flex-start">
      <Text>Enter a BikeReg URL and select Race Type to submit a race.</Text>

      {error && (
        <Alert 
          color="red" 
          withCloseButton
          onClose={() => setError('')}
        >
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

      <Flex align="center">
        <TextInput
          className={classes.formInput}
          placeholder="https://www.bikereg.com/..."
          value={bikeregUrl}
          onChange={(e) => setBikeregUrl(e.target.value)}
        />

        <Select
          className={classes.formInput}
          placeholder="Race Type"
          value={eventType}
          onChange={(value: string | null) => setEventType(value)}
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
};

export default RaceSubmissionForm;
