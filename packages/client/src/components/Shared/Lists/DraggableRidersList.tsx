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
  COMMITTED_LIST_TYPE,
  EVENT_HOUSING_LIST_CONFIG,
  HOUSING_COMMITTED_LIST_TYPE,
  RACE_CONFIG,
  RiderListsConfig,
  SPECIAL_EVENT_CONFIG,
} from "./types";
import { RiderListsContainer } from "./RiderListsContainer";
import ActivelyDraggingRider from "./ActivelyDraggingRider";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop";
import { Flex } from "@mantine/core";
import { useRiderLists } from "../../../hooks/useRiderLists";

interface DraggableRidersListsProps {
  isStatic?: boolean;
  eventListType: "race" | "special";
  xs?: boolean;
  isHousing?: boolean;
}

/**
 * DraggableRidersLists component renders a list of draggable riders.
 */
const DraggableRidersLists = ({
  isStatic = false,
  eventListType,
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
    handleRemoveHousingCommittedRider,
    handleRemoveHousingInterestedRider,
  } = useRiderLists({ type: isHousing ? "housing" : "event" });

  const getConfig = (): RiderListsConfig => {
    if (isHousing) {
      const config = EVENT_HOUSING_LIST_CONFIG;
      return config;
    }
    return eventListType === "race" ? RACE_CONFIG : SPECIAL_EVENT_CONFIG;
  };

  const config = getConfig();

  const validContainers = [config.primaryList.id, config.secondaryList.id];

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
  const eventRemoveFns = {
    primary:
      config.primaryList.id === COMMITTED_LIST_TYPE
        ? handleRemoveCommittedRider
        : () => {},
    secondary: handleRemoveInterestedRider,
  };

  // if primary list is not committed then it is registered, and we can't remove registered riders
  // secondary lists are only allowed to be interested for now
  const housingRemovefns = {
    primary:
      config.primaryList.id === HOUSING_COMMITTED_LIST_TYPE
        ? handleRemoveHousingCommittedRider
        : () => {},
    secondary: handleRemoveHousingInterestedRider,
  };

  const removeFns = isHousing ? housingRemovefns : eventRemoveFns;

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
            <ActivelyDraggingRider name={activeRider.name} xs={xs} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Flex>
  );
};

export default DraggableRidersLists;
