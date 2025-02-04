import { Rider, RiderLists } from "../components/Shared/Lists/types";
import { Housing } from "../types";

/**
 * Creates an array of Rider objects based on the provided names, filtering out any duplicates.
 */
export const createRiderObjects = (
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
export const buildEventRiderLists = (
  registrations: string[],
  committedRiders: string[],
  interestedRiders: string[],
): RiderLists => {
  const seenRiders = new Set<string>();

  return {
    registered: createRiderObjects(registrations, seenRiders),
    committed: createRiderObjects(committedRiders, seenRiders),
    interested: createRiderObjects(interestedRiders, seenRiders),
  };
};

/**
 * Retrieves the initial riders for the draggable riders block.s.
 */
export const buildHousingRiderLists = (housing: Housing): RiderLists => {
  console.log("building housing riders");
  const seenRiders = new Set<string>();

  return {
    housingCommitted: housing?.committed
      ? createRiderObjects(housing.committed, seenRiders)
      : [],
    housingInterested: housing?.interested
      ? createRiderObjects(housing?.interested, seenRiders)
      : [],
  };
};

// @UPDATE
