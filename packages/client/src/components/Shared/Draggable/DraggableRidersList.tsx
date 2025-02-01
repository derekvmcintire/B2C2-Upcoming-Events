import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Box, Group } from "@mantine/core";
import DraggableRider from "./DraggableRider";
import DroppableContainer from "./DroppableContainer";
import {
  RiderLists,
  RiderListsConfig,
  RACE_CONFIG,
  SPECIAL_EVENT_CONFIG,
  VALID_LIST_CONFIG_IDS,
  ListConfigId,
} from "./types";
import { updateEvent, UpdateEventData } from "../../../api/updateEvent";
import { useEventData } from "../../../hooks/useEventData";
import { useEventContext } from "../../../context/event-context";

interface DraggableRidersListsProps {
  isStatic?: boolean;
  eventListType: "race" | "special";
}

const DraggableRidersLists = ({
  isStatic = false,
  eventListType,
}: DraggableRidersListsProps): JSX.Element => {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventId, eventType, interestedRiders = [] } = event;

  const mappedInterestedRiders = interestedRiders.map((name) => {
    return {
      id: name,
      name,
    };
  });

  const initialRiders: RiderLists = {
    interested: mappedInterestedRiders,
    committed: [
      { id: "rider-4", name: "Sarah J." },
      { id: "rider-5", name: "David L." },
    ],
    registered: [{ id: "rider-4", name: "Derek J." }],
  };

  const [riders, setRiders] = useState<RiderLists>(initialRiders);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overContainer, setOverContainer] = useState<string | null>(null);

  useEffect(() => {
    console.log("probably need to update interested riders bruh");
  }, [interestedRiders]);

  const { requestFreshDataForEventType } = useEventData();

  // Select the appropriate configuration based on event type
  const config: RiderListsConfig =
    eventListType === "race" ? RACE_CONFIG : SPECIAL_EVENT_CONFIG;
  const validContainers = [config.primaryList.id, config.secondaryList.id];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  /**
   * Handles the form submission by calling the provided update function with the given data.
   * @param {UpdateEventData} data The data to be submitted.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleSubmitEventUpdate = useCallback(
    async (data: UpdateEventData): Promise<void> => {
      const response = await updateEvent(data);

      if (response.success) {
        requestFreshDataForEventType(eventType);
      } else {
        console.log("problems update event from draglist");
      }
    },
    [requestFreshDataForEventType, eventType],
  );

  type RemoveFunction = (name: string) => void;

  /**
   * Handles the removal of an interested rider from the event.
   * @param {string} nameToRemove - The rider to be removed.
   */
  const handleRemoveInterestedRider = (nameToRemove: string) =>
    handleSubmitEventUpdate({
      eventId: eventId,
      eventType: eventType,
      interestedRiders: interestedRiders.filter(
        (name) => name !== nameToRemove,
      ),
    });

  const removeCommitted: RemoveFunction = (name: string) => {
    console.log("remove committed:", name);
  };

  /**
   * Returns the remove function based on the provided configuration.
   * @param {Object} options - The options object.
   * @param {boolean} options.isPrimary - Indicates whether the list is primary or not.
   * @returns {RemoveFunction} - The remove function.
   */
  const getRemoveFn = ({
    isPrimary,
  }: {
    isPrimary: boolean;
  }): RemoveFunction => {
    const { id } = isPrimary ? config.primaryList : config.secondaryList;
    const removeFnMap: Record<string, (name: string) => void> = {
      [VALID_LIST_CONFIG_IDS.COMMITTED]: removeCommitted,
      [VALID_LIST_CONFIG_IDS.INTERESTED]: handleRemoveInterestedRider,
    };

    return removeFnMap[id] || (() => {});
  };

  // If dragging is disabled, render a simple view
  if (isStatic) {
    return (
      <Box p="sm">
        <Group align="stretch" grow>
          <DroppableContainer
            id={config.primaryList.id}
            items={riders[config.primaryList.id] || []}
            title={config.primaryList.title}
            hasDismiss={config.primaryList.hasDismiss}
            draggable={false}
            removeFn={getRemoveFn({ isPrimary: true })}
          />
          <DroppableContainer
            id={config.secondaryList.id}
            items={riders[config.secondaryList.id] || []}
            title={config.secondaryList.title}
            hasDismiss={config.secondaryList.hasDismiss}
            draggable={false}
            removeFn={getRemoveFn({ isPrimary: false })}
          />
        </Group>
      </Box>
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const container = event.over?.id as ListConfigId;
    if (container && validContainers.includes(container)) {
      setOverContainer(container);
    }
  };

  const findContainer = (id: string): string => {
    if (riders[config.primaryList.id]?.find((item) => item.id === id))
      return config.primaryList.id;
    if (riders[config.secondaryList.id]?.find((item) => item.id === id))
      return config.secondaryList.id;
    return overContainer || config.secondaryList.id;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setOverContainer(null);
    const { active, over } = event;

    if (!active || !over) return;

    const sourceContainer = findContainer(active.id as ListConfigId);
    const destinationContainer = validContainers.includes(
      over.id as ListConfigId,
    )
      ? (over.id as ListConfigId)
      : findContainer(over.id as ListConfigId);

    if (sourceContainer === destinationContainer) {
      const items = [...(riders[sourceContainer] || [])];
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (newIndex !== -1) {
        console.log("Sorting items");

        setRiders({
          ...riders,
          [sourceContainer]: arrayMove(items, oldIndex, newIndex),
        });
      }
    } else {
      const sourceItems = [...(riders[sourceContainer] || [])];
      const destinationItems = [...(riders[destinationContainer] || [])];
      const movedItem = sourceItems.find((item) => item.id === active.id);

      if (movedItem) {
        // move update function here
        console.log(
          `Moving ${movedItem.name} from ${sourceContainer} to ${destinationContainer}`,
        );
        setRiders({
          ...riders,
          [sourceContainer]: sourceItems.filter(
            (item) => item.id !== active.id,
          ),
          [destinationContainer]: [...destinationItems, movedItem],
        });
      }
    }
  };

  const activeRider = activeId
    ? Object.values(riders)
        .flat()
        .find((rider) => rider.id === activeId)
    : null;

  return (
    <Box p="sm">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Group align="stretch" grow>
          <DroppableContainer
            id={config.primaryList.id}
            items={riders[config.primaryList.id] || []}
            title={config.primaryList.title}
            hasDismiss={config.primaryList.hasDismiss}
            draggable={true}
            removeFn={getRemoveFn({ isPrimary: true })}
          />
          <DroppableContainer
            id={config.secondaryList.id}
            items={riders[config.secondaryList.id] || []}
            title={config.secondaryList.title}
            hasDismiss={config.secondaryList.hasDismiss}
            draggable={true}
            removeFn={getRemoveFn({ isPrimary: false })}
          />
        </Group>

        <DragOverlay dropAnimation={null}>
          {activeId && activeRider ? (
            <DraggableRider name={activeRider.name} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default DraggableRidersLists;
