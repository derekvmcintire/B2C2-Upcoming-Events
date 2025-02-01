import { useState } from "react";
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
  initialRiders,
  RiderListsConfig,
  RACE_CONFIG,
  SPECIAL_EVENT_CONFIG,
} from "./types";

interface DraggableRidersListsProps {
  isStatic?: boolean;
  eventType: "race" | "special";
}

const DraggableRidersLists = ({
  isStatic = false,
  eventType,
}: DraggableRidersListsProps): JSX.Element => {
  const [riders, setRiders] = useState<RiderLists>(initialRiders);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overContainer, setOverContainer] = useState<string | null>(null);

  // Select the appropriate configuration based on event type
  const config: RiderListsConfig =
    eventType === "race" ? RACE_CONFIG : SPECIAL_EVENT_CONFIG;
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

          />
          <DroppableContainer
            id={config.secondaryList.id}
            items={riders[config.secondaryList.id] || []}
            title={config.secondaryList.title}
            hasDismiss={config.secondaryList.hasDismiss}
            draggable={false}
          />
        </Group>
      </Box>
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const container = event.over?.id as string;
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

    const sourceContainer = findContainer(active.id as string);
    const destinationContainer = validContainers.includes(over.id as string)
      ? (over.id as string)
      : findContainer(over.id as string);

    if (sourceContainer === destinationContainer) {
      const items = [...(riders[sourceContainer] || [])];
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (newIndex !== -1) {
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
          />
          <DroppableContainer
            id={config.secondaryList.id}
            items={riders[config.secondaryList.id] || []}
            title={config.secondaryList.title}
            hasDismiss={config.secondaryList.hasDismiss}
            draggable={true}
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
