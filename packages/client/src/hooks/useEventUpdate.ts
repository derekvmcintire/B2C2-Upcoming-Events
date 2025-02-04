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
          housingUrl: data.housingUrl !== null ? data.housingUrl : undefined,
          housing: data.housing ?? event.housing,
          description: data.description ?? event.description,
        };
        setEvent(updatedEvent);

        // Update database
        const response = await updateEvent(data);
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
