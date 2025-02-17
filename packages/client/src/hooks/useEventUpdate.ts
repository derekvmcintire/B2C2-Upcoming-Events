import { useCallback, useState } from "react";
import { useEventContext } from "../context/event-context";
import { UpdateEventData, updateEvent } from "../api/updateEvent";
import { EventType } from "../types";

interface EventUpdateError {
  message: string;
  code?: string;
  data?: UpdateEventData;
}

/**
 * Hook that provides functionality to update an event, managing both local state and API interactions.
 * It also handles optimistic updates and reverts in case of an error.
 *
 * @returns {Object} An object containing:
 *   - `handleEventUpdate`: A function to update the event data.
 *   - `error`: An error object containing the error message and related data, if the update fails.
 *   - `setError`: A function to manually set an error.
 *   - `isUpdating`: A boolean indicating if an update is in progress.
 */
export const useEventUpdate = () => {
  const { event, setEvent, isUpdating, setIsUpdating } = useEventContext();
  const [error, setError] = useState<EventUpdateError | null>(null);

  /**
   * Checks if the given housing object is valid.
   *
   * @param housing - The housing object to validate.
   * @returns A boolean indicating whether the housing object is valid.
   */
  function isValidHousing(
    housing: any,
  ): housing is { interested: any[]; committed: any[] } {
    return (
      housing &&
      Array.isArray(housing.interested) &&
      Array.isArray(housing.committed)
    );
  }

  /**
   * Updates the current event with the provided data. This function first updates the local state optimistically.
   * If the API request fails, it reverts the local state and sets an error.
   *
   * @param {UpdateEventData} data - The data to update the event with. Must include `eventId`.
   *
   * @throws {Error} Throws an error if the response from the update API is unsuccessful.
   */
  const handleEventUpdate = useCallback(
    async (data: UpdateEventData) => {
      if (!event || event.eventId !== data.eventId) {
        setError({ message: "Event not found or eventId mismatch", data });
        return;
      }

      setIsUpdating(true);
      setError(null);

      try {
        // Optimistically update local state
        const updatedEvent: EventType = {
          ...event,
          ...data,
          interestedRiders: data.interestedRiders ?? event.interestedRiders,
          committedRiders: data.committedRiders ?? event.committedRiders,
          housingUrl:
            data?.housingUrl === ""
              ? ""
              : data?.housingUrl || event?.housingUrl,
          housing: (isValidHousing(data?.housing) && data.housing) ||
            (isValidHousing(event?.housing) && event.housing) || {
              interested: [],
              committed: [],
            },
          description: data.description ?? event.description,
          carpools: data?.carpools ?? event?.carpools,
        };
        setEvent(updatedEvent);

        // Update event in the database
        const response = await updateEvent(data);
        if (!response.success) {
          throw new Error(response.message);
        }
      } catch (err) {
        // Revert local state on error
        setEvent(event);
        setError({
          message:
            err instanceof Error ? err.message : "Failed to update event",
          data,
        });
      } finally {
        setIsUpdating(false);
      }
    },
    [event, setEvent, setIsUpdating],
  );

  return { handleEventUpdate, error, setError, isUpdating };
};
