import { useEventContext } from "../../../context/event-context";
import { DISCIPLINES } from "../../../constants";
import RidersLists from "../../Shared/Lists/RidersLists";
import {
  RIDER_LIST_EVENT_TYPES,
  RiderListEventType,
} from "../../Shared/Lists/types";

/**
 * Renders a block of draggable riders for an event.
 */
export default function HousingRidersBlock(): JSX.Element {
  const { event } = useEventContext();
  const { eventType } = event;

  const riderListEventType: RiderListEventType =
    eventType === DISCIPLINES.SPECIAL.id
      ? RIDER_LIST_EVENT_TYPES.SPECIAL
      : RIDER_LIST_EVENT_TYPES.RACE;

  return (
    <RidersLists
      isHousing
      isStatic={event.eventType !== DISCIPLINES.SPECIAL.id}
      eventListType={riderListEventType}
      xs
    />
  );
}
