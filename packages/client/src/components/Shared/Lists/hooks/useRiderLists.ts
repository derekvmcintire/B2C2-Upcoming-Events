import { useState, useCallback, useEffect } from "react";
import { UpdateEventData, updateEvent } from "../../../../api/updateEvent";
import {
  RiderLists,
  ListConfigId,
  COMMITTED_LIST_TYPE,
  INTERESTED_LIST_TYPE,
  HOUSING_COMMITTED_LIST_TYPE,
  HOUSING_INTERESTED_LIST_TYPE,
} from "../types";
import { Housing } from "../../../../types";
import { useEventContext } from "../../../../context/event-context";
import { useEventsContext } from "../../../../context/events-context";
import { buildRiderLists } from "../../../../utils/buildRiderLists";
import { getEntriesByEventId } from "../../../../utils/findRegisteredRiders";

interface UseRiderListsProps {
  initialRiders: RiderLists;
}

/**
 * Custom hook for managing rider lists in an event.
 *
 * @param event - The event these rider lists are attached to.
 * @param initialRiders - The initial list of riders.
 * @returns An object containing the riders state, update functions, and helper functions.
 */
export const useRiderLists = ({ initialRiders }: UseRiderListsProps) => {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const {
    eventId,
    eventType,
    interestedRiders = [],
    committedRiders = [],
    housing = { committed: [], interested: [] },
    housingUrl = "",
  } = event;

  const eventsListContext = useEventsContext();
  const { registrations } = eventsListContext;
  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

  const [riders, setRiders] = useState<RiderLists>(initialRiders);

  // NEW CODE
  // Need to handle this cleanly - when interestedRiders, or comittedRiders, or housing.committed or housing.interested lists change,
  // we need to build new rider lists and setRiders with those new lists.
  // ALSO - instead of accepting initialRiders as a parameter, we should just build the initial riders internally when this hook is first called,
  // the same way we do in the useEffect hook below
  // BUT
  // we need to do this for two separate lists:
  // the event lists: committedRiders and interestedRiders
  // and the housing lists: housing.committed and housing.interested
  // and we should return event riders OR housing riders
  // OR I need two separate custom hooks - one for managing event lists and one for managing housing lists
  // I am not sure how to procede
  useEffect(() => {
    const newRiders = buildRiderLists(
      registeredNames,
      committedRiders,
      interestedRiders,
    );
    setRiders(newRiders);
  }, [interestedRiders, committedRiders]);

  /**
   * Handles the submission of an event update.
   * @param data The data for the event update.
   * @returns A promise that resolves when the event update is complete.
   */
  const handleSubmitEventUpdate = useCallback(
    async (data: UpdateEventData): Promise<void> => {
      console.log("update event in useRiderLists hook");
      console.log("update data is: ", data);

      // @UPDATE
      const response = await updateEvent(data);

      if (!response.success) {
        // @TODO: Error handling here
        console.log("problems update event from draglist");
      }
    },
    [eventType],
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

  // @TODO: update this to accommodate housing and eventually carpools as well
  const getMoveRiderUpdateData = useCallback(
    (
      sourceList: ListConfigId,
      targetList: ListConfigId,
      name: string,
    ): UpdateEventData => {
      const newInterestedRiders = [...interestedRiders];
      const newCommittedRiders = [...committedRiders];

      // Existing logic for top-level riders lists
      if (
        sourceList === INTERESTED_LIST_TYPE &&
        targetList === COMMITTED_LIST_TYPE
      ) {
        const index = newInterestedRiders.indexOf(name);
        if (index !== -1) {
          newInterestedRiders.splice(index, 1);
          // Only add if not already in committed
          if (!newCommittedRiders.includes(name)) {
            newCommittedRiders.push(name);
          }
        }
      } else if (
        sourceList === COMMITTED_LIST_TYPE &&
        targetList === INTERESTED_LIST_TYPE
      ) {
        const index = newCommittedRiders.indexOf(name);
        if (index !== -1) {
          newCommittedRiders.splice(index, 1);
          // Only add if not already in interested
          if (!newInterestedRiders.includes(name)) {
            newInterestedRiders.push(name);
          }
        }
      }

      // New logic for housing lists
      const newHousing: Housing = { ...housing };

      if (
        sourceList === HOUSING_INTERESTED_LIST_TYPE &&
        targetList === HOUSING_COMMITTED_LIST_TYPE
      ) {
        // Move from housing interested to housing committed
        if (newHousing.interested) {
          const index = newHousing.interested.indexOf(name);
          if (index !== -1) {
            newHousing.interested.splice(index, 1);

            // Add to committed only if not already there
            if (!newHousing.committed) {
              newHousing.committed = [];
            }
            if (!newHousing.committed.includes(name)) {
              newHousing.committed.push(name);
            }
          }
        }
      } else if (
        sourceList === HOUSING_COMMITTED_LIST_TYPE &&
        targetList === HOUSING_INTERESTED_LIST_TYPE
      ) {
        // Move from housing committed to housing interested
        if (newHousing.committed) {
          const index = newHousing.committed.indexOf(name);
          if (index !== -1) {
            newHousing.committed.splice(index, 1);

            // Add to interested only if not already there
            if (!newHousing.interested) {
              newHousing.interested = [];
            }
            if (!newHousing.interested.includes(name)) {
              newHousing.interested.push(name);
            }
          }
        }
      }

      return {
        eventId,
        eventType,
        interestedRiders: newInterestedRiders,
        committedRiders: newCommittedRiders,
        housing: newHousing,
        housingUrl,
      };
    },
    [eventId, eventType, interestedRiders, committedRiders, housing],
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
