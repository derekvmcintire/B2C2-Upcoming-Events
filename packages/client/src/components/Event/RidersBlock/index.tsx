import { Box, Collapse, Flex, Group, Text } from "@mantine/core";
import classes from "./riders-lists.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import CollapseButton from "../../Shared/CollapseButton";
import DismissButton from "../../Shared/DismissButton";

type RidersListProps = {
  riders: string[];
  removeRider: (rider: string) => void;
};

/**
 * RidersList Component
 *
 * Renders a row that contains a list of riders that are interested in this event
 *
 * @param {RidersListProps} props
 */
export default function RidersList({
  riders,
  removeRider,
}: RidersListProps) {
  const [opened, { toggle }] = useDisclosure(true);

  const numberOfRidersInterested = riders.length;
  const interestedLabelText =
    numberOfRidersInterested === 1
      ? `${numberOfRidersInterested} Rider Interested`
      : `${numberOfRidersInterested} Riders Interested`;

  const handleRemoveRider = useCallback(
    (rider: string) => removeRider(rider),
    [removeRider],
  );

  return (
    <Box
      w="100%"
      data-testid="interested-row"
      className={classes.interestedListContainer}
    >
      <Group justify="center" mb={5}>
        <CollapseButton label={interestedLabelText} opened={opened} toggleFn={toggle} />
      </Group>

      <Collapse in={opened}>
        {numberOfRidersInterested > 0 &&
          riders.map((rider: string) => (
            <div key={rider} className={classes.interestedRiderFlex}>
              <Flex justify="flex-start" align="flex-end">
                <DismissButton clickHandler={() => handleRemoveRider(rider)} />
                <Text span fw="600" className={classes.interestedRiderText}>
                  {rider}
                </Text>
              </Flex>
            </div>
          ))}
      </Collapse>
    </Box>
  );
}