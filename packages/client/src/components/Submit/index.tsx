import TopNav from "../TopNav";
import ColorSchemeToggle from "../ColorSchemeToggle";
import RaceSubmissionForm from "./RaceSubmissionForm";
import { Container, Divider, Flex, SegmentedControl } from "@mantine/core";
import { EventsProvider } from "../../context/events-context";
import classes from "./submit.module.css";
import SpecialEventSubmissionForm from "./SpecialEventForm";
import { useState } from "react";

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
  const [value, setValue] = useState<string>('team')
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
              { label: 'Submit Race by URL', value: 'race' },
              { label: 'Submit Special Team Event', value: 'team' },
            ]}
          />
          
          </Flex>
          <Divider />
        <Container className={classes.formContainer}>
        
          {value === 'race' ? (
            <RaceSubmissionForm vertical={true} />
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
