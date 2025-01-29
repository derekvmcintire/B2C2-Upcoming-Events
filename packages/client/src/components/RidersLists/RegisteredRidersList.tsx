import { Box, Collapse, Flex, Group, Text } from "@mantine/core";
import classes from "./riders-lists.module.css";
import { useDisclosure } from "@mantine/hooks";
import CollapseButton from "./CollapseButton";

type RegisteredRidersRowList = {
  registeredNames?: string[];
};

/**
 * RegisteredRidersRow Component
 *
 * Renders a row that contains a list of riders that are registered for this event
 *
 * @param {RegisteredRidersRowList} props
 */
export default function RegisteredRidersList({
  registeredNames = [],
}: RegisteredRidersRowList) {
  const [opened, { toggle }] = useDisclosure(true);

  const numberOfRidersRegistered = registeredNames.length;
  const registeredLabelText =
    numberOfRidersRegistered === 1
      ? `${numberOfRidersRegistered} Rider Reg'd`
      : `${numberOfRidersRegistered} Riders Reg'd`;

  const contentClassName =
    numberOfRidersRegistered > 0
      ? classes.registeredName
      : classes.registeredLabel;

  /**
   * Renders the content of the RegisteredRidersRow component.
   *
   * @returns The JSX element representing the content.
   */
  const content = (
    <Flex justify="flex-start" align="flex-end">
      <Text className={contentClassName}>
        {numberOfRidersRegistered > 0
          && registeredNames.join(", ")}
      </Text>
    </Flex>
  );

  return (
    <Box
      w="100%"
      data-testid="interested-row"
      className={classes.interestedListContainer}
    >
      <Group justify="center" mb={5}>
      <CollapseButton label={registeredLabelText} opened={opened} toggleFn={toggle} />

      </Group>

      <Collapse in={opened}>{content}</Collapse>
    </Box>
  );
}
