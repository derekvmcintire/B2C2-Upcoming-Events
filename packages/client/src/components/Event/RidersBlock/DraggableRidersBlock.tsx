import { useEventContext } from "../../../context/event-context";
import { DISCIPLINES } from "../../../constants";
import DraggableRidersLists from "../../Shared/Lists/DraggableRidersList";
import {
  RIDER_LIST_EVENT_TYPES,
  RiderListEventType,
  RiderLists,
  Rider,
} from "../../Shared/Lists/types";
import InterestedRiderForm from "../ActionForm";
import { UpdateEventData } from "../../../api/updateEvent";
import { Stack } from "@mantine/core";
import { useState } from "react";

interface EventRidersBlockProps {
  registrations: string[];
  updateEventFn: (data: UpdateEventData) => void;
}

/**
 * Renders the block of event riders.
 */
const EventRidersBlock = ({
  registrations = [],
  updateEventFn,
}: EventRidersBlockProps): JSX.Element => {
  const { event } = useEventContext();
  const { eventType, interestedRiders = [], committedRiders = [] } = event;

  // @UPDATE

  /**
   * Creates an array of Rider objects based on the provided names, filtering out any duplicates.
   */
  const createRiderObjects = (
    names: string[],
    seenRiders: Set<string>,
  ): Rider[] =>
    names
      .filter((name) => {
        const isDuplicate = seenRiders.has(name);
        if (!isDuplicate) seenRiders.add(name);
        return !isDuplicate;
      })
      .map((name) => ({
        id: name,
        name,
      }));

  /**
   * Retrieves the initial riders for the draggable riders block.s.
   */
  const getInitialRiders = (): RiderLists => {
    const seenRiders = new Set<string>();

    return {
      registered: createRiderObjects(registrations, seenRiders),
      committed: createRiderObjects(committedRiders, seenRiders),
      interested: createRiderObjects(interestedRiders, seenRiders),
    };
  };

  const [initialRiders] = useState<RiderLists>(getInitialRiders());

  const riderListEventType: RiderListEventType =
    eventType === DISCIPLINES.SPECIAL.id
      ? RIDER_LIST_EVENT_TYPES.SPECIAL
      : RIDER_LIST_EVENT_TYPES.RACE;

  return (
    <Stack mb="16">
      <DraggableRidersLists
        isStatic={eventType !== DISCIPLINES.SPECIAL.id}
        eventListType={riderListEventType}
        initialRiders={initialRiders}
      />
      <InterestedRiderForm handleUpdateEvent={updateEventFn} />
    </Stack>
  );
};

export default EventRidersBlock;
