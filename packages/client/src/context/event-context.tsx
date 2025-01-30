import React, { createContext, ReactNode, useContext } from "react";
import { type EventType } from "../types";

/**
 * Type definition for the Event Context.
 * Holds a single event with no setter.
 */
interface EventContextType {
  event: EventType;
}

/**
 * EventContext object. Must be provided with an actual event.
 */
const EventContext = createContext<EventContextType | undefined>(undefined);

/**
 * Props for the `EventProvider` component.
 */
interface EventProviderProps {
  children: ReactNode; // React children to be rendered inside the provider
  event: EventType; // The event to provide to the context
}

/**
 * EventProvider Component
 *
 * Provides a single `EventType` object to be accessed by nested components.
 */
export const EventProvider: React.FC<EventProviderProps> = ({ children, event }) => {
  return (
    <EventContext.Provider value={{ event }}>
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
