import { useState } from 'react';
import { Flex, TextInput, Select, Button, Text, Stack, Alert } from '@mantine/core';
import { EventSubmission } from '../../types';
import { submitEvent } from '../../api/submitEvent';
import classes from './submit.module.css';

const RaceSubmissionForm = ({ getEvents }: any) => {
  const [bikeregUrl, setBikeregUrl] = useState('');
  const [eventType, setEventType] = useState<string | null>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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

  const isFormValid = () => {
    return !validateUrl(bikeregUrl) && eventType !== null && eventType !== '';
  };

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
        getEvents();
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
            { value: 'road', label: 'Road' },
            { value: 'xc', label: 'XC' },
            { value: 'cx', label: 'CX' },
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