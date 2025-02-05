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

const RIDER_LIST_TYPE_HOUSING = "housing";
const RIDER_LIST_TYPE_EVENT = "event";

type RiderListType =
  | typeof RIDER_LIST_TYPE_EVENT
  | typeof RIDER_LIST_TYPE_HOUSING;

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
  }, [
    type,
    interestedRiders,
    committedRiders,
    housing.committed,
    housing.interested,
    registeredNames,
  ]);

  const handleSubmitEventUpdate = async (data: UpdateEventData) => {
    await handleEventUpdate(data);
    if (error) {
      // @TODO Handle error (e.g. show toast notification)
      console.log("got an errorz: ", error);
    }
  };

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

  const removeRiderFromList = (
    nameToRemove: string,
    list?: string[],
  ): string[] => {
    if (!list) {
      return [];
    }
    return list.filter((name) => name !== nameToRemove);
  };

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

  const handleRemoveCommittedRider = useCallback(
    (nameToRemove: string) =>
      handleSubmitEventUpdate(
        buildDataForRemoveFromList(nameToRemove, COMMITTED_LIST_TYPE),
      ),
    [],
  );

  const handleRemoveInterestedRider = useCallback(
    (nameToRemove: string) =>
      handleSubmitEventUpdate(
        buildDataForRemoveFromList(nameToRemove, INTERESTED_LIST_TYPE),
      ),
    [],
  );

  const handleRemoveHousingCommittedRider = useCallback(
    (nameToRemove: string) =>
      handleSubmitEventUpdate(
        buildDataForRemoveFromList(nameToRemove, HOUSING_COMMITTED_LIST_TYPE),
      ),
    [],
  );

  const handleRemoveHousingInterestedRider = useCallback(
    (nameToRemove: string) =>
      handleSubmitEventUpdate(
        buildDataForRemoveFromList(nameToRemove, HOUSING_INTERESTED_LIST_TYPE),
      ),
    [],
  );

  return {
    riders,
    setRiders,
    handleSubmitEventUpdate,
    handleRemoveInterestedRider,
    handleRemoveCommittedRider,
    handleRemoveHousingCommittedRider,
    handleRemoveHousingInterestedRider,
    getMoveRiderUpdateData,
    isUpdating,
  };
};
