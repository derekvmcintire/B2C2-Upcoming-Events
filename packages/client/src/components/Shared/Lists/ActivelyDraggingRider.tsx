import { Flex, Paper, Text } from "@mantine/core";
import classes from "../shared.module.css";
import DismissButton from "../DismissButton";

interface ActivelyDraggingRiderProps {
  name: string;
  xs?: boolean;
}

/**
 * ActivelyDraggingRider component represents a rider element that is actively being dragged.
 */
const ActivelyDraggingRider = ({
  name,
  xs = false,
}: ActivelyDraggingRiderProps): JSX.Element => {
  const riderClassName = xs ? classes.xsDraggingRider : classes.draggingRider;

  const textClassName = xs ? classes.xsRiderListText : classes.riderListText;

  return (
    <Paper className={riderClassName} shadow="sm" withBorder>
      <Flex align="center" justify="space-between" w="100%">
        <DismissButton
          xs
          clickHandler={() => {}}
          position="left"
          disabled={true}
        />
        <Text
          span
          className={textClassName}
          style={{ flex: 1, textAlign: "center" }}
        >
          {name}
        </Text>
      </Flex>
    </Paper>
  );
};

export default ActivelyDraggingRider;
