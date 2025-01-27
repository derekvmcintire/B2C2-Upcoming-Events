import { Alert, Flex, Group, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import HamburgerNav from "./HamburgerNav";
import { useLocation } from "react-router-dom";
import classes from "./top-nav.module.css";
import { MOBILE_BREAK_POINT } from "../../constants";
import { useEventsContext } from "../../context/events-context";
import SubmissionDrawer from "../Submit/Drawer";
import Nav from "./Nav";

/**
 * TopNav Component
 *
 * A header component to hold the web page title, as well as the race submission form, and hamburger nav on mobile
 *
 */
export default function TopNav(): JSX.Element {
  const eventsContext = useEventsContext();
  const { errors, setErrors } = eventsContext;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const location = useLocation();

  const getNavbarContents =
    location.pathname !== "/submit" ? <SubmissionDrawer /> : <Nav />;

  return (
    <div className={classes.topNavContainer}>
      <Flex justify="space-between" align="flex-end">
        {isMobile ? <HamburgerNav /> : getNavbarContents}
        <Group>
          <Title className={classes.title} ta="right">
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: "#f0b343", to: "#4385f0" }}
            >
              B2C2 Event Calendar
            </Text>
          </Title>
        </Group>
      </Flex>
      {errors &&
        errors.map((error) => (
          <Flex justify="center">
            <Alert
              w="80%"
              className={classes.errorAlert}
              color="red"
              withCloseButton
              onClose={() => setErrors([])}
            >
              {error}
            </Alert>
          </Flex>
        ))}
    </div>
  );
}
