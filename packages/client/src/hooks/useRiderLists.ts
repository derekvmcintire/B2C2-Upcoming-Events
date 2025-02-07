import { useState, useEffect, useCallback, useMemo } from "react";
import {
  COMMITTED_LIST_TYPE,
  HOUSING_COMMITTED_LIST_TYPE,
  HOUSING_INTERESTED_LIST_TYPE,
  INTERESTED_LIST_TYPE,
  ListConfigId,
  RiderLists,
} from "../components/Shared/Lists/types";
import { useEventContext } from "../context/event-context";
import {
  buildEventRiderLists,
  buildHousingRiderLists,
} from "../utils/buildRiderLists";
import { UpdateEventData } from "../api/updateEvent";
import { Housing } from "../types";
import { getEntriesByEventId } from "../utils/findRegisteredRiders";
import { useEventsContext } from "../context/events-context";
import { useEventUpdate } from "./useEventUpdate";

export const RIDER_LIST_TYPE_HOUSING = "housing";
export const RIDER_LIST_TYPE_EVENT = "event";

type RiderListType =
  | typeof RIDER_LIST_TYPE_EVENT
  | typeof RIDER_LIST_TYPE_HOUSING;

/**
 * Custom hook for managing rider lists in an event.
 *
 * @param type - The type of rider list to manage (default: RIDER_LIST_TYPE_EVENT)
 * @returns An object containing various functions and state variables for managing rider lists
 */
export const useRiderLists = ({
  type = RIDER_LIST_TYPE_EVENT,
}: {
  type?: RiderListType;
}) => {
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

  const { handleEventUpdate, error, isUpdating } = useEventUpdate();

  const eventsListContext = useEventsContext();
  const { registrations } = eventsListContext;
  const registeredNames = useMemo(
    () =>
      registrations ? getEntriesByEventId(registrations, Number(eventId)) : [],
    [registrations, eventId],
  );

  const [riders, setRiders] = useState<RiderLists>({});

  useEffect(() => {
    const newRiders =
      type === RIDER_LIST_TYPE_HOUSING
        ? buildHousingRiderLists(housing)
        : buildEventRiderLists(
            registeredNames,
            committedRiders,
            interestedRiders,
          );

    setRiders(newRiders);
  }, [type, interestedRiders, committedRiders, housing, registeredNames]);

  /**
   * Handles the submission of an event update.
   *
   * @param data - The data for the event update.
   */
  const handleSubmitEventUpdate = async (data: UpdateEventData) => {
    await handleEventUpdate(data);
    if (error) {
      // @TODO Handle error (e.g. show toast notification)
      console.log("got an errorz: ", error);
    }
  };

  /**
   * Moves an item from the source list to the target list.
   * If the item is already in the target list, it will not be duplicated.
   *
   * @param source - The source list.
   * @param target - The target list.
   * @param item - The item to be moved.
   * @returns An object containing the updated source and target lists.
   */
  const moveItemBetweenLists = (
    source: string[] | undefined,
    target: string[] | undefined,
    item: string,
  ): { newSource: string[]; newTarget: string[] } => {
    const newSource = [...(source || [])];
    const newTarget = [...(target || [])];
    const index = newSource.indexOf(item);

    if (index !== -1) {
      newSource.splice(index, 1);
      if (!newTarget.includes(item)) {
        newTarget.push(item);
      }
    }

    return { newSource, newTarget };
  };

  /**
   * Returns the update data for moving a rider between lists.
   * @param sourceList - The ID of the source list.
   * @param targetList - The ID of the target list.
   * @param name - The name of the rider.
   * @returns The update event data.
   */
  const getMoveRiderUpdateData = useCallback(
    (
      sourceList: ListConfigId,
      targetList: ListConfigId,
      name: string,
    ): UpdateEventData => {
      /**
       * Updates the lists of interested and committed riders based on the specified parameters.
       * @param sourceList - The source list configuration ID.
       * @param targetList - The target list configuration ID.
       * @param name - The name of the rider.
       * @returns An object containing the updated arrays of interested and committed riders.
       */
      const updateRiders = (
        sourceList: ListConfigId,
        targetList: ListConfigId,
        name: string,
      ): { newInterestedRiders: string[]; newCommittedRiders: string[] } => {
        if (
          sourceList === INTERESTED_LIST_TYPE &&
          targetList === COMMITTED_LIST_TYPE
        ) {
          const { newSource, newTarget } = moveItemBetweenLists(
            interestedRiders,
            committedRiders,
            name,
          );
          return {
            newInterestedRiders: newSource,
            newCommittedRiders: newTarget,
          };
        } else if (
          sourceList === COMMITTED_LIST_TYPE &&
          targetList === INTERESTED_LIST_TYPE
        ) {
          const { newSource, newTarget } = moveItemBetweenLists(
            committedRiders,
            interestedRiders,
            name,
          );
          return {
            newInterestedRiders: newTarget,
            newCommittedRiders: newSource,
          };
        }

        return {
          newInterestedRiders: interestedRiders,
          newCommittedRiders: committedRiders,
        };
      };

      /**
       * Updates the housing object by moving an item between source and target lists.
       *
       * @param sourceList - The source list identifier.
       * @param targetList - The target list identifier.
       * @param name - The name of the item to be moved.
       * @returns The updated housing object.
       */
      const updateHousing = (
        sourceList: ListConfigId,
        targetList: ListConfigId,
        name: string,
      ): Housing => {
        const newHousing = { ...housing };

        if (
          sourceList === HOUSING_INTERESTED_LIST_TYPE &&
          targetList === HOUSING_COMMITTED_LIST_TYPE
        ) {
          const { newSource, newTarget } = moveItemBetweenLists(
            newHousing.interested,
            newHousing.committed,
            name,
          );
          newHousing.interested = newSource;
          newHousing.committed = newTarget;
        } else if (
          sourceList === HOUSING_COMMITTED_LIST_TYPE &&
          targetList === HOUSING_INTERESTED_LIST_TYPE
        ) {
          const { newSource, newTarget } = moveItemBetweenLists(
            newHousing.committed,
            newHousing.interested,
            name,
          );
          newHousing.committed = newSource;
          newHousing.interested = newTarget;
        }

        return newHousing;
      };

      const { newInterestedRiders, newCommittedRiders } = updateRiders(
        sourceList,
        targetList,
        name,
      );

      const newHousing = updateHousing(sourceList, targetList, name);

      return {
        eventId,
        eventType,
        interestedRiders: newInterestedRiders,
        committedRiders: newCommittedRiders,
        housing: newHousing,
        housingUrl,
      };
    },
    [
      eventId,
      eventType,
      housingUrl,
      committedRiders,
      housing,
      interestedRiders,
    ],
  );

  /**
   * Removes a rider from the given list.
   *
   * @param nameToRemove - The name of the rider to remove.
   * @param list - The list of riders.
   * @returns The updated list with the rider removed.
   */
  const removeRiderFromList = (
    nameToRemove: string,
    list?: string[],
  ): string[] => {
    if (!list) {
      return [];
    }
    return list.filter((name) => name !== nameToRemove);
  };

  /**
   * Builds the data object for removing a rider from a specific list.
   * @param name - The name of the rider to be removed.
   * @param listId - The ID of the list from which the rider should be removed.
   * @returns The data object for removing the rider from the list.
   */
  const buildDataForRemoveFromList = (name: string, listId: string) => {
    return {
      eventId,
      eventType,
      housing: {
        committed:
          listId === HOUSING_COMMITTED_LIST_TYPE
            ? removeRiderFromList(name, housing?.committed)
            : housing?.committed || [],
        interested:
          listId === HOUSING_INTERESTED_LIST_TYPE
            ? removeRiderFromList(name, housing?.interested)
            : housing?.interested || [],
      },
      housingUrl,
      interestedRiders:
        listId === INTERESTED_LIST_TYPE
          ? removeRiderFromList(name, interestedRiders)
          : interestedRiders,
      committedRiders:
        listId === COMMITTED_LIST_TYPE
          ? removeRiderFromList(name, committedRiders)
          : committedRiders,
    };
  };

  /**
   * Creates a remove handler function for a specific list type.
   * @param listType - The type of the list.
   * @returns The remove handler function.
   */
  const createRemoveHandler = (listType: string) => (nameToRemove: string) => {
    const data = buildDataForRemoveFromList(nameToRemove, listType);
    handleSubmitEventUpdate(data);
  };

  return {
    riders,
    setRiders,
    handleSubmitEventUpdate,
    createRemoveHandler,
    getMoveRiderUpdateData,
    isUpdating,
  };
};
