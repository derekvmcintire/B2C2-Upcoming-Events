import { useState } from 'react';
import { Flex, TextInput, Select, Button, Text, Stack } from '@mantine/core';
import { EventSubmission } from '../../types';
import { submitEvent } from '../../api/submitEvent';
import classes from './submit.module.css';

const RaceSubmissionForm = () => {
  // State to hold form input values
  const [bikeregUrl, setBikeregUrl] = useState('');
  const [eventType, setEventType] = useState<string | null>(''); // Make sure it's string | null

  // Submit handler placeholder
  const handleSubmit = async () => {
    const submission: EventSubmission = {
      url: bikeregUrl,
      eventType: eventType || ''
    }
    const success = await submitEvent(submission);
    console.log('success??? ', success)
  };

  return (
    <Stack align="flex-start">
      <Text>Enter a BikeReg URL to submit a race.</Text>
      <Flex align="center" >

        <TextInput
        className={classes.formInput}
          placeholder="BikeReg URL"
          value={bikeregUrl}
          onChange={(e) => setBikeregUrl(e.target.value)}
        />

          <Select
            className={classes.formInput}
            placeholder="Race Type"
            value={eventType}
            onChange={(value: string | null) => setEventType(value)} // Correct type for eventType
            data={[
              { value: 'road', label: 'Road' },
              { value: 'xc', label: 'XC' },
              { value: 'cx', label: 'CX' },
            ]}
          />
          <Button onClick={handleSubmit}>Submit Race</Button>
      </Flex>
    </Stack>
  );
};

export default RaceSubmissionForm;
