import { Box, Collapse, Group, SimpleGrid } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import CollapseButton from "../../Shared/CollapseButton";
import RiderList from "./RiderList";

type RidersListProps = {
  interestedRiders: string[];
  registeredRiders: string[];
  removeRider: (rider: string) => void;
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
  removeRider,
}: RidersListProps) {
  const [opened, { toggle }] = useDisclosure(true);

  const handleRemoveRider = useCallback(
    (rider: string) => removeRider(rider),
    [removeRider],
  );

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
            label="Riders Registered"
            isRegisteredList
            riders={registeredRiders}
            removeFn={handleRemoveRider}
          />
          <RiderList
            label="Riders Interested"
            riders={interestedRiders}
            removeFn={handleRemoveRider}
          />
        </SimpleGrid>
      </Collapse>
    </Box>
  );
}
