import { Flex, Group, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import HamburgerNav from './HamburgerNav';
import RaceSubmissionForm from '../Submit';
import classes from './top-nav.module.css';

export const TOP_NAV_TEST_ID = 'top-nav';

interface TopNavProps {
  getEvents: () => Promise<void>;
}

export default function TopNav({ getEvents }: TopNavProps) {
  const isMobile = useMediaQuery('(max-width: 950px)');

  return (
    <div data-testid={TOP_NAV_TEST_ID} className={classes.topNavContainer}>
      <Flex justify="space-between" align="center" pt={10}>
        {isMobile ? <HamburgerNav /> : <RaceSubmissionForm getEvents={getEvents} />}
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