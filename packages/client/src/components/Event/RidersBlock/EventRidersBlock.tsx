import { useEventContext } from "../../../context/event-context";
import { DISCIPLINES } from "../../../constants";
import RidersLists from "../../Shared/Lists/RidersLists";
import {
  RIDER_LIST_EVENT_TYPES,
  RiderListEventType,
} from "../../Shared/Lists/types";
import InterestedRiderForm from "../ActionForm";
import { UpdateEventData } from "../../../api/updateEvent";
import { Stack } from "@mantine/core";

interface EventRidersBlockProps {
  updateEventFn: (data: UpdateEventData) => void;
}

/**
 * Renders the block of event riders.
 */
const EventRidersBlock = ({
  updateEventFn,
}: EventRidersBlockProps): JSX.Element => {
  const { event } = useEventContext();
  const { eventType } = event;

  const riderListEventType: RiderListEventType =
    eventType === DISCIPLINES.SPECIAL.id
      ? RIDER_LIST_EVENT_TYPES.SPECIAL
      : RIDER_LIST_EVENT_TYPES.RACE;

  return (
    <Stack mb="16">
      <RidersLists
        isStatic={eventType !== DISCIPLINES.SPECIAL.id}
        eventListType={riderListEventType}
      />
      <InterestedRiderForm handleUpdateEvent={updateEventFn} />
    </Stack>
  );
};

export default EventRidersBlock;
