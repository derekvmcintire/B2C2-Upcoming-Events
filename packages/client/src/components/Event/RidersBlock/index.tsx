import { Box, Collapse, Divider, Flex, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import CollapseButton from "../../Shared/CollapseButton";
import DismissButton from "../../Shared/DismissButton";

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

  const numberOfRidersInterested = interestedRiders.length;

  const handleRemoveRider = useCallback(
    (rider: string) => removeRider(rider),
    [removeRider],
  );

  const InterestedRiders = () => (
    <Stack gap={0} className={classes.riderListStack}>
      <Text ta="left">{`${numberOfRidersInterested} Riders Interested`}</Text>
      <Divider mb="8" w="100%" />
    {numberOfRidersInterested > 0 &&
    interestedRiders.map((rider: string) => (
      <div key={rider} className={classes.interestedRiderFlex}>
        <Flex justify="flex-start" align="center">
          <DismissButton xs clickHandler={() => handleRemoveRider(rider)} position="left" />
          <Text ta="left" span fw="600" className={classes.interestedRiderText}>
            {rider}
          </Text>
        </Flex>
      </div>
    ))}
    </Stack>
    )

    const RegisteredRiders = () => (
      <Stack gap={0} className={classes.riderListStack}>
        <Text ta="left">{`${registeredRiders.length} Riders Registered`}</Text>
        <Divider mb="8" w="100%" />
      {registeredRiders.length > 0 &&
    registeredRiders.map((rider: string) => (
      <div key={rider} className={classes.interestedRiderFlex}>
        <Flex justify="flex-start" align="center">
          <DismissButton xs clickHandler={() => handleRemoveRider(rider)} position="left" />
          <Text ta="left" span fw="600" className={classes.registeredRiderText}>
            {rider}
          </Text>
        </Flex>
      </div>
    ))}
    </Stack>
    )

  return (
    <Box
      data-testid="interested-row"
      className={classes.ridersListContainer}
    >
      <Group justify="center" mb={5}>
        <CollapseButton label="Riders Attending" opened={opened} toggleFn={toggle} />
      </Group>

      <Collapse in={opened} className={classes.riderListCollapse}>
        <SimpleGrid cols={2}>
        <RegisteredRiders />
        <InterestedRiders />
        </SimpleGrid>
        
      </Collapse>
    </Box>
  );
}