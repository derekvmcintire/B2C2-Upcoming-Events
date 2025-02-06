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
  HOUSING_INTERESTED_LIST_TYPE,
  INTERESTED_LIST_TYPE,
  RACE_CONFIG,
  RiderListsConfig,
  SPECIAL_EVENT_CONFIG,
} from "./types";
import { RiderListsContainer } from "./RiderListsContainer";
import ActivelyDraggingRider from "./ActivelyDraggingRider";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop";
import { Flex } from "@mantine/core";
import {
  RIDER_LIST_TYPE_EVENT,
  RIDER_LIST_TYPE_HOUSING,
  useRiderLists,
} from "../../../hooks/useRiderLists";

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
    getMoveRiderUpdateData,
    handleSubmitEventUpdate,
    createRemoveHandler,
  } = useRiderLists({
    type: isHousing ? RIDER_LIST_TYPE_HOUSING : RIDER_LIST_TYPE_EVENT,
  });

  /**
   * Retrieves the configuration for the rider lists based on the event type and housing flag.
   * @returns The configuration object for the rider lists.
   */
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

  const eventRemoveFns = {
    primary:
      config.primaryList.id === COMMITTED_LIST_TYPE
        ? createRemoveHandler(COMMITTED_LIST_TYPE)
        : () => {},
    secondary: createRemoveHandler(INTERESTED_LIST_TYPE),
  };

  const housingRemoveFns = {
    primary:
      config.primaryList.id === HOUSING_COMMITTED_LIST_TYPE
        ? createRemoveHandler(HOUSING_COMMITTED_LIST_TYPE)
        : () => {},
    secondary: createRemoveHandler(HOUSING_INTERESTED_LIST_TYPE),
  };

  const removeFns = isHousing ? housingRemoveFns : eventRemoveFns;

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
