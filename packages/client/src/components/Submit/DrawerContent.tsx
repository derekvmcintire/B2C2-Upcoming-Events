import RaceSubmissionForm from "./RaceSubmissionForm";
import {
  Container,
  Divider,
  Flex,
  SegmentedControl,
  Stack,
  Title,
} from "@mantine/core";
import { EventsProvider } from "../../context/events-context";
import classes from "./submit.module.css";
import SpecialEventSubmissionForm from "./SpecialEventForm";
import { useState } from "react";
import { FORMS } from "../../types";

const DrawerContent = (): JSX.Element => {
  const [value, setValue] = useState<string>(FORMS.RACE.value);
  return (
    <>
      <EventsProvider>
        <Flex>
          <Stack>
            <Title fw="600">Submit an Event</Title>
            <SegmentedControl
              data-testid="sub-control"
              value={value}
              onChange={setValue}
              data={[
                { label: FORMS.RACE.label, value: FORMS.RACE.value },
                { label: FORMS.SPECIAL.label, value: FORMS.SPECIAL.value },
              ]}
            />
          </Stack>
        </Flex>
        <Divider />
        <Container className={classes.formContainer}>
          {value === FORMS.RACE.value ? (
            <RaceSubmissionForm vertical={true} />
          ) : (
            <SpecialEventSubmissionForm />
          )}
        </Container>
      </EventsProvider>
    </>
  );
};

export default DrawerContent;
