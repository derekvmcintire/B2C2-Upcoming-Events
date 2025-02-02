import { useState, useCallback } from "react";
import { UpdateEventData, updateEvent } from "../../../../api/updateEvent";
import { useEventData } from "../../../../hooks/useEventData";
import { RiderLists, MovableListType } from "../types";
import { EventDiscipline } from "../../../../types";

interface UseRiderListsProps {
  eventId: string;
  eventType: EventDiscipline;
  initialRiders: RiderLists;
  interestedRiders: string[];
  committedRiders: string[];
}

/**
 * Custom hook for managing rider lists in an event.
 *
 * @param eventId - The ID of the event.
 * @param eventType - The type of the event.
 * @param initialRiders - The initial list of riders.
 * @param interestedRiders - The list of interested riders.
 * @param committedRiders - The list of committed riders.
 * @returns An object containing the riders state, update functions, and helper functions.
 */
export const useRiderLists = ({
  eventId,
  eventType,
  initialRiders,
  interestedRiders,
  committedRiders,
}: UseRiderListsProps) => {
  const [riders, setRiders] = useState<RiderLists>(initialRiders);
  const { requestFreshDataForEventType } = useEventData();

  /**
   * Handles the submission of an event update.
   * @param data The data for the event update.
   * @returns A promise that resolves when the event update is complete.
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

  /**
   * Handles the removal of an interested rider from the event.
   * @param nameToRemove - The name of the rider to remove.
   */
  const handleRemoveInterestedRider = useCallback(
    (nameToRemove: string) =>
      handleSubmitEventUpdate({
        eventId,
        eventType,
        interestedRiders: interestedRiders.filter(
          (name) => name !== nameToRemove,
        ),
      }),
    [eventId, eventType, interestedRiders, handleSubmitEventUpdate],
  );

  /**
   * Handles the removal of a committed rider from the event.
   *
   * @param nameToRemove - The name of the rider to remove.
   */
  const handleRemoveCommittedRider = useCallback(
    (nameToRemove: string) =>
      handleSubmitEventUpdate({
        eventId,
        eventType,
        committedRiders: committedRiders.filter(
          (name) => name !== nameToRemove,
        ),
      }),
    [eventId, eventType, committedRiders, handleSubmitEventUpdate],
  );

  const getMoveRiderUpdateData = useCallback(
    (
      sourceList: MovableListType,
      targetList: MovableListType,
      name: string,
    ): UpdateEventData => {
      const newInterestedRiders = [...interestedRiders];
      const newCommittedRiders = [...committedRiders];

      if (sourceList === "interested" && targetList === "committed") {
        const index = newInterestedRiders.indexOf(name);
        if (index !== -1) {
          newInterestedRiders.splice(index, 1);
          // Only add if not already in committed
          if (!newCommittedRiders.includes(name)) {
            newCommittedRiders.push(name);
          }
        }
      } else if (sourceList === "committed" && targetList === "interested") {
        const index = newCommittedRiders.indexOf(name);
        if (index !== -1) {
          newCommittedRiders.splice(index, 1);
          // Only add if not already in interested
          if (!newInterestedRiders.includes(name)) {
            newInterestedRiders.push(name);
          }
        }
      }

      return {
        eventId,
        eventType,
        interestedRiders: newInterestedRiders,
        committedRiders: newCommittedRiders,
      };
    },
    [eventId, eventType, interestedRiders, committedRiders],
  );

  return {
    riders,
    setRiders,
    handleSubmitEventUpdate,
    handleRemoveInterestedRider,
    handleRemoveCommittedRider,
    getMoveRiderUpdateData,
  };
};
