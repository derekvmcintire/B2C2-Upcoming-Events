import React, { createContext, ReactNode, useContext, useState } from "react";
import { FetchRegistrationsResponse, type EventType } from "../types";

/**
 * Type definition for the Events Context.
 * Describes the shape of the state and its associated setters for event-related data.
 */
interface EventsContextType {
  events: EventType[]; // List of road events
  setEvents: (events: EventType[]) => void; // Setter for road events
  registrations: FetchRegistrationsResponse | undefined; // API response for registrations
  setRegistrations: (
    registrations: FetchRegistrationsResponse | undefined,
  ) => void; // Setter for registrations
  registrationsLoading: boolean; // If registrations are loading
  setRegistrationsLoading: (isLoading: boolean) => void; // Setter for registrationsLoading
  errors: string[]; // List of error messages
  setErrors: (errors: string[]) => void; // Setter for error messages
  requestFreshData: boolean;
  setRequestFreshData: (request: boolean) => void;
}

/**
 * Default values for the Events Context.
 * Used to initialize the context and provide default implementations for setters.
 */
export const defaultEventsContext: EventsContextType = {
  events: [],
  setEvents: () => {},
  registrations: undefined,
  setRegistrations: () => {},
  registrationsLoading: true,
  setRegistrationsLoading: () => {},
  errors: [],
  setErrors: () => {},
  requestFreshData: false,
  setRequestFreshData: () => {}
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
  initialRoadEvents?: EventType[]; // Optional initial road events
  initialRegistrations?: FetchRegistrationsResponse | undefined; // Optional initial registrations
  initialRegistrationsLoading?: boolean;
  initialRequestFreshData?: boolean;
}

/**
 * EventsProvider Component
 *
 * A context provider for managing event-related state. Wraps its children
 * with the `EventsContext.Provider` and provides state management logic.
 */
export const EventsProvider: React.FC<EventsProviderProps> = ({
  children,
  initialRoadEvents = defaultEventsContext.events,
  initialRegistrations = defaultEventsContext.registrations,
  initialRegistrationsLoading = defaultEventsContext.registrationsLoading,
  initialRequestFreshData = defaultEventsContext.requestFreshData,
}) => {
  // State management for different types of events and registrations
  const [events, setEvents] = useState<EventType[]>(initialRoadEvents);
  const [registrations, setRegistrations] = useState<
    FetchRegistrationsResponse | undefined
  >(initialRegistrations);
  const [errors, setErrors] = useState<string[]>([]);
  const [requestFreshData, setRequestFreshData] = useState<boolean>(initialRequestFreshData);
  const [registrationsLoading, setRegistrationsLoading] = useState<boolean>(
    initialRegistrationsLoading,
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        registrations,
        setRegistrations,
        registrationsLoading,
        setRegistrationsLoading,
        errors,
        setErrors,
        requestFreshData,
        setRequestFreshData
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
    throw new Error("useEventsContext must be used within an EventsProvider");
  }

  return context;
};
