import { useEventContext } from "../../../context/event-context";
import { DISCIPLINES, MOBILE_BREAK_POINT } from "../../../constants";
import RidersLists from "../../Shared/Lists/RidersLists";
import {
  RIDER_LIST_EVENT_TYPES,
  RiderListEventType,
} from "../../Shared/Lists/types";
import InterestedRiderForm from "../ActionForm";
import { useMediaQuery } from "@mantine/hooks";
import { UpdateEventData } from "../../../api/updateEvent";
import { Flex, Stack } from "@mantine/core";

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

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

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
      {!isMobile && (
        <Flex justify="center">
          {eventType === DISCIPLINES.SPECIAL.id && (
            <InterestedRiderForm
              handleUpdateEvent={updateEventFn}
              isCommitted
            />
          )}
          <InterestedRiderForm handleUpdateEvent={updateEventFn} />
        </Flex>
      )}
    </Stack>
  );
};

export default EventRidersBlock;
