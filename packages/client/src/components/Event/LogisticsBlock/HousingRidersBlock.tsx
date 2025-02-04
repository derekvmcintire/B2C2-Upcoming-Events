import { useEventContext } from "../../../context/event-context";
import { DISCIPLINES } from "../../../constants";
import DraggableRidersLists from "../../Shared/Lists/DraggableRidersList";
import {
  RIDER_LIST_EVENT_TYPES,
  RiderListEventType,
  RiderLists,
} from "../../Shared/Lists/types";
import { useRiderLists } from "../../../hooks/useRiderLists";

/**
 * Renders a block of draggable riders for an event.
 *
 * @param registrations - An array of registered rider names.
 * @returns The JSX element representing the draggable riders block.
 */
export default function HousingRidersBlock() {
  const { event } = useEventContext();
  const { eventType, housing = {} } = event;

  // mock lists
  const housingInterestedRiders = housing?.interested || [];
  const housingCommittedRiders = housing?.committed || [];

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

  const mappedCommittedRiders = filterUniqueRiders(housingCommittedRiders).map(
    (name) => ({
      id: name,
      name,
    }),
  );

  const mappedInterestedRiders = filterUniqueRiders(
    housingInterestedRiders,
  ).map((name) => ({
    id: name,
    name,
  }));

  const initialRiders: RiderLists = {
    housingCommitted: mappedCommittedRiders,
    housingInterested: mappedInterestedRiders,
  };

  const { riders } = useRiderLists({
    type: "housing",
  });

  console.log("riders is: ", riders);

  return (
    <DraggableRidersLists
      isHousing
      isStatic={event.eventType !== DISCIPLINES.SPECIAL.id}
      eventListType={riderListEventType}
      initialRiders={riders}
      xs
    />
  );
}
