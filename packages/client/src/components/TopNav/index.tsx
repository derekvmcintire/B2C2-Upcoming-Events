import { Flex, Group, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import HamburgerNav from './HamburgerNav';
import RaceSubmissionForm from '../Submit';
import classes from './top-nav.module.css';

/**
 * TopNav Component
 * 
 * A header component to hold the web page title, as well as the race submission form, and hamburger nav on mobile
 */
export default function TopNav() {
  const isMobile = useMediaQuery('(max-width: 950px)');

  return (
    <div className={classes.topNavContainer}>
      <Flex justify="space-between" align="center" pt={10}>
        {isMobile ? <HamburgerNav /> : <RaceSubmissionForm />}
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
    </div>
  );
}