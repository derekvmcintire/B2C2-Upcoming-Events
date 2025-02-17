import TopNav from "../TopNav";
import ColorSchemeToggle from "../ColorSchemeToggle";
import RaceSubmissionForm from "./RaceSubmissionForm";
import { Container, Divider, Flex, SegmentedControl } from "@mantine/core";
import { EventsProvider } from "../../context/events-context";
import classes from "./submit.module.css";
import SpecialEventSubmissionForm from "./SpecialEventForm";
import { useState } from "react";
import { FORMS } from "../../types";

/**
 * Submit Component
 *
 * A page that contains the top navigation, race submission form, special event submission form and
 * color scheme toggle. The component is wrapped in Mantine and events context providers to manage state and
 * provide consistent styling.
 *
 * @returns A container for the race submission form, along with top navigation and color scheme toggle.
 */
const Submit = (): JSX.Element => {
  const [value, setValue] = useState<string>(FORMS.RACE.value);

  return (
    <>
      <EventsProvider>
        <TopNav />
        <Flex>
          <SegmentedControl
            mt="24"
            value={value}
            onChange={setValue}
            data={[
              { label: FORMS.RACE.label, value: FORMS.RACE.value },
              { label: FORMS.SPECIAL.label, value: FORMS.SPECIAL.value },
              { label: FORMS.CONTES.label, value: FORMS.CONTES.value },
            ]}
          />
        </Flex>
        <Divider />
        <Container className={classes.formContainer}>
          {value === FORMS.RACE.value ? (
            <RaceSubmissionForm vertical={true} />
          ) : value === FORMS.CONTES.value ? (
            <SpecialEventSubmissionForm isQuickContes />
          ) : (
            <SpecialEventSubmissionForm />
          )}
        </Container>
        <ColorSchemeToggle />
      </EventsProvider>
    </>
  );
};

export default Submit;
