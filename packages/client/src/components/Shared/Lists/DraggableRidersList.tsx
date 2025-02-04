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
import {
  EVENT_HOUSING_LIST_CONFIG,
  RACE_CONFIG,
  RiderLists,
  RiderListsConfig,
  SPECIAL_EVENT_CONFIG,
} from "./types";
import { RiderListsContainer } from "./RiderListsContainer";
import DraggableRider from "./DraggableRider";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { useRiderLists } from "../../../hooks/useRiderLists";

interface DraggableRidersListsProps {
  isStatic?: boolean;
  eventListType: "race" | "special";
  initialRiders: RiderLists;
  xs?: boolean;
  isHousing?: boolean;
}

/**
 * DraggableRidersLists component renders a list of draggable riders.
 */
const DraggableRidersLists = ({
  isStatic = false,
  eventListType,
  initialRiders,
  xs = false,
  isHousing = false,
}: DraggableRidersListsProps): JSX.Element => {
  const {
    riders,
    setRiders,
    handleRemoveInterestedRider,
    handleRemoveCommittedRider,
    getMoveRiderUpdateData,
    handleSubmitEventUpdate,
  } = useRiderLists({
    initialRiders,
  });

  const getConfig = (): RiderListsConfig => {
    if (isHousing) {
      const config = EVENT_HOUSING_LIST_CONFIG;
      return config;
    }
    return eventListType === "race" ? RACE_CONFIG : SPECIAL_EVENT_CONFIG;
  };

  const config = getConfig();

  const validContainers = [config.primaryList.id, config.secondaryList.id];

  // @UPDATE
  useEffect(() => {
    console.log("");
  }, [initialRiders]);

  const { activeId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragAndDrop({
      config,
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
          xs={xs}
        />

        <DragOverlay dropAnimation={null}>
          {activeId && activeRider ? (
            <DraggableRider name={activeRider.name} xs={xs} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Flex>
  );
};

export default DraggableRidersLists;
