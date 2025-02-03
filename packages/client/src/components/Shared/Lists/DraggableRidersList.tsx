import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { RACE_CONFIG, RiderLists, SPECIAL_EVENT_CONFIG } from "./types";
import { RiderListsContainer } from "./RiderListsContainer";
import DraggableRider from "./DraggableRider";
import { useEventContext } from "../../../context/event-context";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useRiderLists } from "./hooks/useRiderLists";
import { Flex } from "@mantine/core";

interface DraggableRidersListsProps {
  isStatic?: boolean;
  eventListType: "race" | "special";
  initialRiders: RiderLists;
}

/**
 * DraggableRidersLists component renders a list of draggable riders.
 */
const DraggableRidersLists = ({
  isStatic = false,
  eventListType,
  initialRiders,
}: DraggableRidersListsProps): JSX.Element => {
  const { event } = useEventContext();
  const {
    eventId,
    eventType,
    interestedRiders = [],
    committedRiders = [],
  } = event;

  const config = eventListType === "race" ? RACE_CONFIG : SPECIAL_EVENT_CONFIG;
  const validContainers = [config.primaryList.id, config.secondaryList.id];

  const {
    riders,
    setRiders,
    handleRemoveInterestedRider,
    handleRemoveCommittedRider,
    getMoveRiderUpdateData,
    handleSubmitEventUpdate,
  } = useRiderLists({
    eventId,
    eventType,
    initialRiders,
    interestedRiders,
    committedRiders,
  });

  const { activeId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragAndDrop({
      validContainers,
      riders,
      setRiders,
      onMoveRider: (sourceList, targetList, name) => {
        const updateData = getMoveRiderUpdateData(sourceList, targetList, name);
        handleSubmitEventUpdate(updateData);
      },
    });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // if primary list is not committed then it is registered, and we can't remove registered riders
  // secondary lists are only allowed to be interested for now
  const removeFns = {
    primary:
      config.primaryList.id === "committed"
        ? handleRemoveCommittedRider
        : () => {},
    secondary: handleRemoveInterestedRider,
  };

  const activeRider = activeId
    ? Object.values(riders)
        .flat()
        .find((rider) => rider.id === activeId)
    : null;

  if (isStatic) {
    return (
      <Flex w="100%" justify="center">
        <RiderListsContainer
          config={config}
          riders={riders}
          draggable={false}
          removeFns={removeFns}
        />
      </Flex>
    );
  }

  return (
    <Flex w="100%" justify="center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <RiderListsContainer
          config={config}
          riders={riders}
          draggable={true}
          removeFns={removeFns}
        />

        <DragOverlay dropAnimation={null}>
          {activeId && activeRider ? (
            <DraggableRider name={activeRider.name} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Flex>
  );
};

export default DraggableRidersLists;
