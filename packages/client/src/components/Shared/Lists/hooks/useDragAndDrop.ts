import { useState } from "react";
import { DragStartEvent, DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  RiderLists,
  ListConfigId,
  RiderListsConfig,
  MOVABLE_LISTS,
} from "../types";

interface UseDragAndDropProps {
  config: RiderListsConfig;
  validContainers: string[];
  riders: RiderLists;
  setRiders: (riders: RiderLists) => void;
  onMoveRider: (
    sourceList: ListConfigId,
    targetList: ListConfigId,
    name: string,
  ) => void;
}

/**
 * Custom hook for handling drag and drop functionality.
 *
 * @param validContainers - An array of valid container IDs where items can be dropped.
 * @param riders - The current state of the riders.
 * @param setRiders - A function to update the state of the riders.
 * @param onMoveRider - A callback function to be called when a rider is moved.
 * @returns An object containing the active ID, over container, and event handlers for drag and drop.
 */
export const useDragAndDrop = ({
  config,
  validContainers,
  riders,
  setRiders,
  onMoveRider,
}: UseDragAndDropProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overContainer, setOverContainer] = useState<ListConfigId | null>(null);

  /**
   * Handles the drag start event.
   * @param event The drag start event.
   */
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  /**
   * Handles the drag over event for the drag and drop functionality.
   * Updates the over container if the container actually changed.
   * @param event - The drag over event.
   */
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

  /**
   * Checks if a given list is a movable list.
   * @param list - The list to check.
   * @returns True if the list is a movable list, false otherwise.
   */
  const hasMovableItems = (list: ListConfigId): boolean => {
    return MOVABLE_LISTS.includes(list);
  };

  /**
   * Finds the container for the given ID in the drag and drop list.
   * @param id - The ID of the item to find the container for.
   * @returns The container ID where the item belongs.
   */
  const findContainer = (id: string): ListConfigId => {
    if (riders[config.secondaryList.id]?.find((item) => item.id === id))
      return config.secondaryList.id;
    if (riders[config.primaryList.id]?.find((item) => item.id === id))
      return config.primaryList.id;
    return overContainer || config.secondaryList.id;
  };

  /**
   * Handles the drag end event.
   * @param event The drag end event.
   */
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
        hasMovableItems(sourceContainer) &&
        hasMovableItems(destinationContainer)
      ) {
        // Prevent duplicate entries in destination list
        const alreadyExists = destinationItems.some(
          (item) => item.name === movedItem.name,
        );

        if (!alreadyExists) {
          setRiders({
            ...riders,
            [sourceContainer]: sourceItems.filter(
              (item) => item.id !== active.id,
            ),
            [destinationContainer]: [...destinationItems, movedItem],
          });
          onMoveRider(sourceContainer, destinationContainer, movedItem.name);
        } else {
          // Just remove from source if it already exists in destination
          setRiders({
            ...riders,
            [sourceContainer]: sourceItems.filter(
              (item) => item.id !== active.id,
            ),
          });
        }
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
