import { useState } from "react";
import { DragStartEvent, DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  RiderLists,
  ListConfigId,
  MovableListType,
  COMMITTED_LIST_TYPE,
  INTERESTED_LIST_TYPE,
} from "../types";

interface UseDragAndDropProps {
  validContainers: string[];
  riders: RiderLists;
  setRiders: (riders: RiderLists) => void;
  onMoveRider: (
    sourceList: MovableListType,
    targetList: MovableListType,
    name: string,
  ) => void;
}

export const useDragAndDrop = ({
  validContainers,
  riders,
  setRiders,
  onMoveRider,
}: UseDragAndDropProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overContainer, setOverContainer] = useState<ListConfigId | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const container = event.over?.id as ListConfigId;

    // Only update if the container actually changed
    if (
      container &&
      validContainers.includes(container) &&
      container !== overContainer
    ) {
      setOverContainer(container);
    }
  };

  const isMovableListType = (list: ListConfigId): list is MovableListType => {
    return list === INTERESTED_LIST_TYPE || list === COMMITTED_LIST_TYPE;
  };

  const findContainer = (id: string): ListConfigId => {
    if (riders.interested?.find((item) => item.id === id)) return "interested";
    if (riders.committed?.find((item) => item.id === id)) return "committed";
    return overContainer || "interested";
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
        setRiders({
          ...riders,
          [sourceContainer]: arrayMove(items, oldIndex, newIndex),
        });
      }
    } else {
      const sourceItems = [...(riders[sourceContainer] || [])];
      const destinationItems = [...(riders[destinationContainer] || [])];
      const movedItem = sourceItems.find((item) => item.id === active.id);

      if (
        movedItem &&
        isMovableListType(sourceContainer) &&
        isMovableListType(destinationContainer)
      ) {
        setRiders({
          ...riders,
          [sourceContainer]: sourceItems.filter(
            (item) => item.id !== active.id,
          ),
          [destinationContainer]: [...destinationItems, movedItem],
        });

        onMoveRider(sourceContainer, destinationContainer, movedItem.name);
      }
    }
  };

  return {
    activeId,
    overContainer,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
