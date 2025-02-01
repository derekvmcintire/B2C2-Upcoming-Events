import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Paper, Text } from "@mantine/core";
import StaticRider from "./StaticRider";
import classes from "../shared.module.css";
import { type Rider } from "./types";
import SortableRider from "./SortableRider";

interface DroppableContainerProps {
  id: string;
  items: Rider[];
  title: string;
  isOver?: boolean;
  draggable: boolean;
  hasDismiss?: boolean;
  removeFn: (name: string) => void;
}

/**
 * Renders a droppable container component.
 *
 * @param id - The ID of the droppable container.
 * @param items - The array of items to be rendered in the container.
 * @param title - The title of the container.
 * @param draggable - A boolean indicating whether the container is draggable.
 * @returns The JSX element representing the droppable container.
 */
const DroppableContainer = ({
  id,
  items,
  title,
  draggable,
  hasDismiss,
  removeFn,
}: DroppableContainerProps): JSX.Element => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled: !draggable,
  });

  const containerClass = `${classes.paper} ${isOver ? classes.over : classes.default}`;

  return (
    <Box>
      <Text mb="xs">{title}</Text>
      <Paper
        ref={draggable ? setNodeRef : undefined}
        p="sm"
        radius="md"
        className={containerClass}
      >
        {draggable ? (
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((rider) => (
              <SortableRider
                key={rider.id}
                {...rider}
                hasDismiss={hasDismiss}
                draggable={draggable}
                dismissRider={removeFn}
              />
            ))}
          </SortableContext>
        ) : (
          items.map((rider) => (
            <StaticRider
              key={rider.id}
              name={rider.name}
              hasDismiss={hasDismiss}
              dismissRider={removeFn}
            />
          ))
        )}
        {items.length === 0 && draggable && (
          <Box className={classes.draggableRidersBox}>Drop rider here</Box>
        )}
      </Paper>
    </Box>
  );
};

export default DroppableContainer;
