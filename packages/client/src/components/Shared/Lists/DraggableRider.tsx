import { Flex, Paper, Text } from "@mantine/core";
import classes from "../shared.module.css";
import DismissButton from "../DismissButton";

interface DraggableRiderProps {
  name: string;
}

/**
 * DraggableRider component represents a draggable rider element.
 *
 * @param name - The name of the rider.
 * @returns The rendered DraggableRider component.
 */
const DraggableRider = ({ name }: DraggableRiderProps): JSX.Element => {
  return (
    <Paper className={classes.draggingRider} shadow="sm" p="xs" withBorder>
      <Flex align="center" justify="left">
        <DismissButton
          xs
          clickHandler={() => {}}
          position="left"
          disabled={true}
        />
        <Text ml="8" span fw="600">
          {name}
        </Text>
      </Flex>
    </Paper>
  );
};

export default DraggableRider;
