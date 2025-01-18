import { useState } from 'react';
import { TextInput, Select, Button, Group, Text } from '@mantine/core';
import { EventSubmission } from '../../types';
import { submitEvent } from '../../api/submitEvent';

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
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Text size="xl" mb="lg">
        Submit a Race
      </Text>

      <TextInput
        label="Enter a Bikereg URL"
        placeholder="https://example.com/race"
        value={bikeregUrl}
        onChange={(e) => setBikeregUrl(e.target.value)}
        mb="md"
      />

      

      <Group justify="center">
        <Select
          label="Select Event Type"
          placeholder="Pick one"
          value={eventType}
          onChange={(value: string | null) => setEventType(value)} // Correct type for eventType
          data={[
            { value: 'road', label: 'Road' },
            { value: 'xc', label: 'XC' },
            { value: 'cx', label: 'CX' },
          ]}
          mb="md"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Group>
    </div>
  );
};

export default RaceSubmissionForm;
