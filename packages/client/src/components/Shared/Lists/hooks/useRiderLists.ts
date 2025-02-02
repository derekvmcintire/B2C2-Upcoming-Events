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

export const useRiderLists = ({
  eventId,
  eventType,
  initialRiders,
  interestedRiders,
  committedRiders,
}: UseRiderListsProps) => {
  const [riders, setRiders] = useState<RiderLists>(initialRiders);
  const { requestFreshDataForEventType } = useEventData();

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
          newCommittedRiders.push(name);
        }
      } else if (sourceList === "committed" && targetList === "interested") {
        const index = newCommittedRiders.indexOf(name);
        if (index !== -1) {
          newCommittedRiders.splice(index, 1);
          newInterestedRiders.push(name);
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
    getMoveRiderUpdateData,
  };
};
