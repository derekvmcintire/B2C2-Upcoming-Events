import { Box, Collapse, Group, SimpleGrid } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import CollapseButton from "../../Shared/CollapseButton";
import RiderList from "./RiderList";

type RidersListProps = {
  interestedRiders: string[];
  registeredRiders: string[];
  removeInterestedRiderFn: (rider: string) => void;
};

/**
 * RidersList Component
 *
 * Renders a row that contains a list of interestedRiders that are interested in this event
 *
 * @param {RidersListProps} props
 */
export default function RidersList({
  interestedRiders,
  registeredRiders,
  removeInterestedRiderFn,
}: RidersListProps) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <Box data-testid="interested-row" className={classes.ridersListContainer}>
      <Group justify="center" mb={5}>
        <CollapseButton
          label="Riders Attending"
          opened={opened}
          toggleFn={toggle}
        />
      </Group>

      <Collapse in={opened} className={classes.riderListCollapse}>
        <SimpleGrid cols={2}>
          <RiderList
            label="Registered"
            isRegisteredList
            riders={registeredRiders}
          />
          <RiderList
            label="Interested"
            riders={interestedRiders}
            removeFn={removeInterestedRiderFn}
          />
        </SimpleGrid>
      </Collapse>
    </Box>
  );
}
