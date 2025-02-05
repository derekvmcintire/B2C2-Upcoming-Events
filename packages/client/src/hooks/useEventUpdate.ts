import { useCallback, useState } from "react";
import { useEventContext } from "../context/event-context";
import { UpdateEventData, updateEvent } from "../api/updateEvent";
import { EventType } from "../types";

interface EventUpdateError {
  message: string;
  code?: string;
  data?: UpdateEventData;
}

export const useEventUpdate = () => {
  const { event, setEvent, isUpdating, setIsUpdating } = useEventContext();
  const [error, setError] = useState<EventUpdateError | null>(null);

  const handleEventUpdate = useCallback(
    async (data: UpdateEventData) => {
      if (!event || event.eventId !== data.eventId) {
        setError({ message: "Event not found or eventId mismatch", data });
        return;
      }

      setIsUpdating(true);
      setError(null);

      try {
        // Update local state optimistically
        const updatedEvent: EventType = {
          ...event,
          ...data,
          interestedRiders: data.interestedRiders ?? event.interestedRiders,
          committedRiders: data.committedRiders ?? event.committedRiders,
          housingUrl: data?.housingUrl || event?.housingUrl,
          housing: data?.housing ?? event?.housing,
          description: data.description ?? event.description,
          carpools: data?.carpools ?? event?.carpools,
        };
        setEvent(updatedEvent);

        const getValidatedUpdateData = () => {
          // housing lists can only be saved with a housing URL
          if (data?.housing && !data?.housingUrl) {
            if (!event?.housingUrl) {
              // @TODO error handling
              console.log(
                "ERROR: must have a housing URL before adding housing lists",
              );
            }
            return { ...data, housingUrl: event.housingUrl };
          }
          // if we don't have housing data or we do, but we also have a housing URL already, just return the data
          return data;
        };

        // Update database
        const response = await updateEvent(getValidatedUpdateData());
        if (!response.success) {
          throw new Error(response.message);
        }
      } catch (err) {
        // Revert local state
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
    [event, setEvent],
  );

  return { handleEventUpdate, error, setError, isUpdating };
};
