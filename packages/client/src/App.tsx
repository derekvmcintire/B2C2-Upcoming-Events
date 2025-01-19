import { useEffect, useState } from "react";
import "./App.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import EventDetails from "./components/EventDetails";
import TopNav from "./components/TopNav";
import RaceSubmissionForm from "./components/Submit"
import { fetchEventsByType } from "./api/fetchEventsByType";
import { FetchEventsWithRegisteredRidersResponse, type Event } from "./types";
import { fetchEventsWithRegisteredRiders } from "./api/fetchRegisteredRiders";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredRiders, setRegisteredRiders] = useState<FetchEventsWithRegisteredRidersResponse | undefined>(undefined);

  useEffect(() => {
    const getRegisteredRiders = async () => {
      const response = await fetchEventsWithRegisteredRiders('road%20race');
      setRegisteredRiders(response);
    };

    getRegisteredRiders();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetchEventsByType('road');
      setEvents(response.events);
    };

    getEvents();
  }, []);

  return (
    <>
      <MantineProvider>
        <TopNav />
        <RaceSubmissionForm />
        {events.map((event) => (
          <EventDetails key={event.eventId} event={event} registeredRiders={registeredRiders} />
        ))}
      </MantineProvider>
    </>
  );
}

export default App;
