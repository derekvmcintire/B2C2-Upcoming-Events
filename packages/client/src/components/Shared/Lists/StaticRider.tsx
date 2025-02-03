import { Flex, Paper, Text } from "@mantine/core";
import DismissButton from "../DismissButton";
import classes from "../shared.module.css";

interface StaticRiderProps {
  name: string;
  hasDismiss?: boolean;
  dismissRider?: (name: string) => void;
  isPrimary?: boolean;
  xs?: boolean;
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
  isPrimary = false,
  xs = false,
}: StaticRiderProps): JSX.Element => {
  const riderClassName = isPrimary
    ? classes.primaryListRider
    : classes.secondaryListRider;

    const textClassName = xs ? classes.xsRiderListText : classes.riderListText;

  return (
    <Paper
      shadow="xs"
      p="xs"
      withBorder
      className={riderClassName}
      styles={() => ({
        root: {
          fontSize: "0.875rem",
        },
      })}
    >
      {hasDismiss ? (
        <Flex align="center" justify="space-between" w="100%">
          <DismissButton
            xs
            clickHandler={() => dismissRider(name)}
            position="left"
            disabled={false}
          />
          <Text
            span
            className={textClassName}
            style={{ flex: 1, textAlign: "center" }}
          >
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
