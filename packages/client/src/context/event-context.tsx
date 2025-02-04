import React, { createContext, ReactNode, useContext, useState } from "react";
import { type EventType } from "../types";
import { DISCIPLINES } from "../constants";

/**
 * Type definition for the Event Context.
 * Holds a single event with no setter.
 */
interface EventContextType {
  event: EventType;
  setEvent: (data: EventType) => void;
  isUpdating: boolean;
  setIsUpdating: (is: boolean) => void;
}

export const defaultEventContext: EventContextType = {
  event: {
    eventId: "",
    name: "",
    date: "",
    city: "",
    state: "",
    eventUrl: "",
    eventType: DISCIPLINES.ROAD.id,
  },
  setEvent: () => {},
  isUpdating: false,
  setIsUpdating: () => {},
};

/**
 * EventContext object. Must be provided with an actual event.
 */
const EventContext = createContext<EventContextType>(defaultEventContext);

/**
 * Props for the `EventProvider` component.
 */
interface EventProviderProps {
  children: ReactNode; // React children to be rendered inside the provider
  initialEvent: EventType; // The event to provide to the context
}

/**
 * EventProvider Component
 *
 * Provides a single `EventType` object to be accessed by nested components.
 */
export const EventProvider: React.FC<EventProviderProps> = ({
  children,
  initialEvent,
}) => {
  const [event, setEvent] = useState<EventType>(initialEvent);
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <EventContext.Provider
      value={{ event, setEvent, isUpdating, setIsUpdating }}
    >
      {children}
    </EventContext.Provider>
  );
};

/**
 * useEventContext Hook
 *
 * A custom hook to access the `EventContext`.
 * Ensures that the hook is used only within a valid provider.
 */
export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};
