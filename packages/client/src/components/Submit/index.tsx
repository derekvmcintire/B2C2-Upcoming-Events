import TopNav from "../TopNav";
import ColorSchemeToggle from "../ColorSchemeToggle";
import RaceSubmissionForm from "./RaceSubmissionForm";
import { Container, Divider } from "@mantine/core";
import { EventsProvider } from "../../context/events-context";
import classes from "./submit.module.css";
import SpecialEventSubmissionForm from "./SpecialEventForm";

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
  return (
    <>
      <EventsProvider>
        <TopNav />
        <Container className={classes.formContainer}>
          <RaceSubmissionForm vertical={true} />
          <Divider />
          <SpecialEventSubmissionForm />
        </Container>
        <ColorSchemeToggle />
      </EventsProvider>
    </>
  );
};

export default Submit;
