import { useEventContext } from "../../../context/event-context";
import { DISCIPLINES } from "../../../constants";
import DraggableRidersLists from "../../Shared/Lists/DraggableRidersList";
import {
  RIDER_LIST_EVENT_TYPES,
  RiderListEventType,
  RiderLists,
} from "../../Shared/Lists/types";

/**
 * Renders a block of draggable riders for an event.
 *
 * @param registrations - An array of registered rider names.
 * @returns The JSX element representing the draggable riders block.
 */
export default function HousingRidersBlock() {
  const { event } = useEventContext();
  const { eventType } = event;

  // mock lists
  const mockRidersInterestedHousing = ["Wout", "Jonas"];
  const mockRidersConfirmedHousing = ["Tadej", "Remco", "Fabian"];

  const riderListEventType: RiderListEventType =
    eventType === DISCIPLINES.SPECIAL.id
      ? RIDER_LIST_EVENT_TYPES.SPECIAL
      : RIDER_LIST_EVENT_TYPES.RACE;

  // Create a Set to track unique rider names
  const seenRiders = new Set<string>();

  // Function to filter riders, ensuring uniqueness
  const filterUniqueRiders = (riders: string[]) =>
    riders.filter((name) => {
      if (seenRiders.has(name)) {
        return false; // Skip if already seen
      }
      seenRiders.add(name);
      return true;
    });

  const mappedCommittedRiders = filterUniqueRiders(
    mockRidersConfirmedHousing,
  ).map((name) => ({
    id: name,
    name,
  }));

  const mappedInterestedRiders = filterUniqueRiders(
    mockRidersInterestedHousing,
  ).map((name) => ({
    id: name,
    name,
  }));

  const initialRiders: RiderLists = {
    committed: mappedCommittedRiders,
    interested: mappedInterestedRiders,
  };

  return (
    <DraggableRidersLists
      isStatic={event.eventType !== DISCIPLINES.SPECIAL.id}
      eventListType={riderListEventType}
      initialRiders={initialRiders}
    />
  );
}
