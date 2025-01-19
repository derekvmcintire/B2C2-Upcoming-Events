import React, { createContext, ReactNode, useContext, useState } from 'react';
import { FetchRegistrationsResponse, type Event } from "../types";


interface EventsContextType {
  roadEvents: Event[],
  setRoadEvents: (events: Event[]) => void;
  cxEvents: Event[],
  setCxEvents: (events: Event[]) => void;
  xcEvents: Event[],
  setXcEvents: (events: Event[]) => void;
  registrations: FetchRegistrationsResponse | undefined;
  setRegistrations: (registrations: FetchRegistrationsResponse | undefined) => void;
  errors: string[];
  setErrors: (errors: string[]) => void;
}

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

const EventsContext = createContext<EventsContextType>(defaultEventsContext);

interface EventsProviderProps {
  children: ReactNode;
  initialRoadEvents?: Event[];
  initialCxEvents?: Event[];
  initialXcEvents?: Event[];
  initialRegistrations?: FetchRegistrationsResponse | undefined;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({
  children,
  initialRoadEvents = defaultEventsContext.roadEvents,
  initialCxEvents = defaultEventsContext.cxEvents,
  initialXcEvents = defaultEventsContext.cxEvents,
  initialRegistrations = defaultEventsContext.registrations,
}) => {
  const [roadEvents, setRoadEvents] = useState<Event[]>(initialRoadEvents);
  const [cxEvents, setCxEvents] = useState<Event[]>(initialCxEvents);
  const [xcEvents, setXcEvents] = useState<Event[]>(initialXcEvents);
  const [registrations, setRegistrations] = useState<FetchRegistrationsResponse | undefined>(initialRegistrations);
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <EventsContext.Provider
      value={{ roadEvents, setRoadEvents, cxEvents, setCxEvents, xcEvents, setXcEvents, registrations, setRegistrations, errors, setErrors }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEventsContext must be used within a MyContextProvider');
  }
  return context;
};