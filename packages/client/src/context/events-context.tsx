import React, { createContext, ReactNode, useContext, useState } from 'react';
import { FetchRegistrationsResponse, type Event } from "../types";

/**
 * Type definition for the Events Context.
 * Describes the shape of the state and its associated setters for event-related data.
 */
interface EventsContextType {
  roadEvents: Event[]; // List of road events
  setRoadEvents: (events: Event[]) => void; // Setter for road events
  cxEvents: Event[]; // List of cyclocross events
  setCxEvents: (events: Event[]) => void; // Setter for cyclocross events
  xcEvents: Event[]; // List of cross-country events
  setXcEvents: (events: Event[]) => void; // Setter for cross-country events
  registrations: FetchRegistrationsResponse | undefined; // API response for registrations
  setRegistrations: (registrations: FetchRegistrationsResponse | undefined) => void; // Setter for registrations
  errors: string[]; // List of error messages
  setErrors: (errors: string[]) => void; // Setter for error messages
}

/**
 * Default values for the Events Context.
 * Used to initialize the context and provide default implementations for setters.
 */
export const defaultEventsContext: EventsContextType = {
  roadEvents: [],
  setRoadEvents: () => {},
  cxEvents: [],
  setCxEvents: () => {},
  xcEvents: [],
  setXcEvents: () => {},
  registrations: undefined,
  setRegistrations: () => {},
  errors: [],
  setErrors: () => {},
};

/**
 * The actual Events Context object.
 * This will be provided to components that need access to event-related state.
 */
const EventsContext = createContext<EventsContextType>(defaultEventsContext);

/**
 * Props for the `EventsProvider` component.
 * Allows optional initialization of context state with preloaded data.
 */
interface EventsProviderProps {
  children: ReactNode; // React children to be rendered inside the provider
  initialRoadEvents?: Event[]; // Optional initial road events
  initialCxEvents?: Event[]; // Optional initial cyclocross events
  initialXcEvents?: Event[]; // Optional initial cross-country events
  initialRegistrations?: FetchRegistrationsResponse | undefined; // Optional initial registrations
}

/**
 * EventsProvider Component
 *
 * A context provider for managing event-related state. Wraps its children
 * with the `EventsContext.Provider` and provides state management logic.
 */
export const EventsProvider: React.FC<EventsProviderProps> = ({
  children,
  initialRoadEvents = defaultEventsContext.roadEvents,
  initialCxEvents = defaultEventsContext.cxEvents,
  initialXcEvents = defaultEventsContext.xcEvents, // Typo in your default - should be `defaultEventsContext.xcEvents`
  initialRegistrations = defaultEventsContext.registrations,
}) => {
  // State management for different types of events and registrations
  const [roadEvents, setRoadEvents] = useState<Event[]>(initialRoadEvents);
  const [cxEvents, setCxEvents] = useState<Event[]>(initialCxEvents);
  const [xcEvents, setXcEvents] = useState<Event[]>(initialXcEvents);
  const [registrations, setRegistrations] = useState<FetchRegistrationsResponse | undefined>(initialRegistrations);
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <EventsContext.Provider
      value={{
        roadEvents,
        setRoadEvents,
        cxEvents,
        setCxEvents,
        xcEvents,
        setXcEvents,
        registrations,
        setRegistrations,
        errors,
        setErrors,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

/**
 * useEventsContext Hook
 *
 * A custom hook to access the `EventsContext`.
 * Ensures that the hook is used only within a valid provider.
 */
export const useEventsContext = (): EventsContextType => {
  const context = useContext(EventsContext);

  // Throw an error if the hook is used outside of the provider
  if (!context) {
    throw new Error('useEventsContext must be used within an EventsProvider');
  }

  return context;
};
