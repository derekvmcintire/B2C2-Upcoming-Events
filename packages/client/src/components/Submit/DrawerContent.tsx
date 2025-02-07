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
                { label: FORMS.CONTES.label, value: FORMS.CONTES.value },
              ]}
            />
          </Stack>
        </Flex>
        <Divider />
        <Container className={classes.formContainer}>
          {value === FORMS.RACE.value ? (
            <RaceSubmissionForm vertical={true} />
          ) : value === FORMS.CONTES.value ? (
            <>
              {/* forcing a remount with key so initial state is updated */}
              <SpecialEventSubmissionForm key={"contes"} isQuickContes />
            </>
          ) : (
            <>
              {/* forcing a remount with key so initial state is updated */}
              <SpecialEventSubmissionForm key={"special"} />
            </>
          )}
        </Container>
      </EventsProvider>
    </>
  );
};

export default DrawerContent;
