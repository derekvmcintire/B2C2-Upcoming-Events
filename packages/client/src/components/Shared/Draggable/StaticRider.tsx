import { Flex, Paper, Text } from "@mantine/core";
import DismissButton from "../DismissButton";

interface StaticRiderProps {
  name: string;
  hasDismiss?: boolean;
  dismissRider?: (name: string) => void;
}

/**
 * Renders a static rider component.
 *
 * @param name - The name of the rider.
 * @param hasDismiss - Indicates whether the rider has a dismiss button.
 * @param dismissRider - The dismiss rider callback function.
 * @returns The rendered static rider component.
 */
const StaticRider = ({
  name,
  hasDismiss = false,
  dismissRider = () => {},
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
            clickHandler={() => dismissRider(name)}
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
