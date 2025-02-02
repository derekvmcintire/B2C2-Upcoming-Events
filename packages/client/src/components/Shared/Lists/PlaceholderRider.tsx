import { Paper } from "@mantine/core";
import classes from "../shared.module.css";

/**
 * Renders a static rider component.
 *
 * @param name - The name of the rider.
 * @param hasDismiss - Indicates whether the rider has a dismiss button.
 * @param dismissRider - The dismiss rider callback function.
 * @returns The rendered static rider component.
 */
const PlaceholderRider = ({
}): JSX.Element => {

  return (
    <Paper
      shadow="xs"
      p="xs"
      className={classes.placeholderRider}
      styles={() => ({
        root: {
          fontSize: "0.875rem",
        },
      })}
    >
    Drop Rider Here
    </Paper>
  );
};

export default PlaceholderRider;
