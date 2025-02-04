import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Divider, Paper, Text } from "@mantine/core";
import StaticRider from "./StaticRider";
import classes from "../shared.module.css";
import { RACE_CONFIG, SPECIAL_EVENT_CONFIG, type Rider } from "./types";
import SortableRider from "./SortableRider";
import PlaceholderRider from "./PlaceholderRider";

interface DroppableContainerProps {
  id: string;
  items: Rider[];
  title: string;
  isOver?: boolean;
  draggable: boolean;
  hasDismiss?: boolean;
  removeFn: (name: string) => void;
  xs?: boolean;
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
  xs = false,
  removeFn,
}: DroppableContainerProps): JSX.Element => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled: !draggable,
  });

  const isPrimary =
    title === RACE_CONFIG.primaryList.title ||
    title === SPECIAL_EVENT_CONFIG.primaryList.title;
  const containerClass = `${classes.paper} ${isOver ? classes.over : classes.default}`;

  const titleSize = xs ? "md" : "xl";

  const paperContainerClass = xs
    ? `${classes.xsListPaper} ${containerClass}`
    : containerClass;

  return (
    <Box className={classes.droppableContainer}>
      <Text fw={600} size={titleSize} mb="xs">
        {`${items.length} ${title}`}
      </Text>
      <Divider />
      <Paper
        ref={draggable ? setNodeRef : undefined}
        // p="sm"
        radius="md"
        className={paperContainerClass}
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
                isPrimary={isPrimary}
                xs={xs}
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
              isPrimary={isPrimary}
              xs={xs}
            />
          ))
        )}
        {draggable && (
          <Box className={classes.draggableRidersBox}>
            <PlaceholderRider xs={xs} />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DroppableContainer;
