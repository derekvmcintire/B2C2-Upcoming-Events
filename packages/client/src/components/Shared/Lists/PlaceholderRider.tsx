import { Paper, Text } from "@mantine/core";
import classes from "../shared.module.css";

/**
 * Renders a static rider component.
 *
 * @param name - The name of the rider.
 * @param hasDismiss - Indicates whether the rider has a dismiss button.
 * @param dismissRider - The dismiss rider callback function.
 * @returns The rendered static rider component.
 */
const PlaceholderRider = ({xs = false}: { xs: boolean }): JSX.Element => {
  const textClassName = xs ? classes.xsRiderListText : classes.riderListText;

  return (
    <Paper
      shadow="xs"
      className={classes.placeholderRider}
      styles={() => ({
        root: {
          fontSize: "0.875rem",
        },
      })}
    >
      <Text span className={textClassName} style={{ flex: 1, textAlign: "center" }}>
      Drop Rider Here
        </Text>
    </Paper>
  );
};

export default PlaceholderRider;
