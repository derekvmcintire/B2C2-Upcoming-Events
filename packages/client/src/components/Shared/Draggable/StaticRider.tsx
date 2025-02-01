import { Flex, Paper, Text } from "@mantine/core";
import DismissButton from "../DismissButton";

interface StaticRiderProps {
  name: string;
  hasDismiss?: boolean;
}

/**
 * Renders a static rider component.
 * @param name - The name of the rider.
 * @returns The JSX element representing the static rider.
 */
const StaticRider = ({
  name,
  hasDismiss = false,
}: StaticRiderProps): JSX.Element => {
  return (
    <Paper
      shadow="xs"
      p="xs"
      withBorder
      styles={() => ({
        root: {
          fontSize: "0.875rem",
        },
      })}
    >
      {hasDismiss ? (
        <Flex align="center" justify="left">
          <DismissButton
            xs
            clickHandler={() => {}}
            position="left"
            disabled={false}
          />
          <Text ml="8" span fw="600">
            {name}
          </Text>
        </Flex>
      ) : (
        name
      )}
    </Paper>
  );
};

export default StaticRider;
