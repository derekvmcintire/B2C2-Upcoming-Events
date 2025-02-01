import { useSortable } from "@dnd-kit/sortable";
import { Flex, Paper, Text } from "@mantine/core";
import { CSS } from "@dnd-kit/utilities";
import { Rider } from "./types";
import DismissButton from "../DismissButton";

interface SortableRiderProps extends Rider {
  draggable: boolean;
  hasDismiss?: boolean;
  dismissRider?: (name: string) => void;
}

/**
 * SortableRider component represents a draggable rider element that can be sorted.
 *
 * @param id - The unique identifier of the rider.
 * @param name - The name of the rider.
 * @param draggable - Indicates whether the rider is draggable.
 * @param hasDismiss - Indicates whether the rider has a dismiss button.
 * @param dismissRider - The callback function to dismiss the rider.
 */
const SortableRider = ({
  id,
  name,
  draggable,
  hasDismiss = false,
  dismissRider = () => {},
}: SortableRiderProps): JSX.Element => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !draggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...(draggable ? { ...attributes, ...listeners } : {})}
      shadow="xs"
      p="xs"
      withBorder
      styles={() => ({
        root: {
          cursor: draggable ? "grab" : "default",
          userSelect: "none",
          fontSize: "0.875rem",
          "&:hover": draggable
            ? {
                backgroundColor: "#f8f9fa",
              }
            : {},
          "&:active": {
            cursor: draggable ? "grabbing" : "default",
          },
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

export default SortableRider;
