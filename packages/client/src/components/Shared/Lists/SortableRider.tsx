import { useSortable } from "@dnd-kit/sortable";
import { Flex, Paper, Text } from "@mantine/core";
import { CSS } from "@dnd-kit/utilities";
import { Rider } from "./types";
import DismissButton from "../DismissButton";
import classes from "../shared.module.css";
import { useEventContext } from "../../../context/event-context";

interface SortableRiderProps extends Rider {
  draggable: boolean;
  hasDismiss?: boolean;
  dismissRider?: (name: string) => void;
  isPrimary?: boolean;
  xs?: boolean;
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
  isPrimary = false,
  xs = false,
}: SortableRiderProps): JSX.Element => {
  const eventContext = useEventContext();
  const { isUpdating } = eventContext;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !draggable || isUpdating,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const defaultRiderClassName = isPrimary
    ? classes.primaryListRider
    : classes.secondaryListRider;

  const riderClassName = xs ? classes.xsListRider : defaultRiderClassName;

  const textClassName = xs ? classes.xsRiderListText : classes.riderListText;

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      className={riderClassName}
      {...(draggable ? { ...attributes, ...listeners } : {})}
      shadow="xs"
      withBorder
      styles={() => ({
        root: {
          cursor: draggable ? "grab" : "default",
          userSelect: "none",
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
        <Flex align="center" justify="space-between" w="100%">
          <DismissButton
            xs
            clickHandler={() => dismissRider(name)}
            position="left"
            disabled={isUpdating}
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

export default SortableRider;
