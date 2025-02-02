import { Flex, Paper, Text } from "@mantine/core";
import classes from "../shared.module.css";
import DismissButton from "../DismissButton";

interface DraggableRiderProps {
  name: string;
}

/**
 * DraggableRider component represents a draggable rider element.
 */
const DraggableRider = ({ name }: DraggableRiderProps): JSX.Element => {
  return (
    <Paper className={classes.draggingRider} shadow="sm" p="xs" withBorder>
      <Flex align="center" justify="space-between" w="100%">
        <DismissButton
          xs
          clickHandler={() => {}}
          position="left"
          disabled={true}
        />
        <Text ml="8" span fw="600" style={{ flex: 1, textAlign: "center" }}>
          {name}
        </Text>
      </Flex>
    </Paper>
  );
};

export default DraggableRider;
