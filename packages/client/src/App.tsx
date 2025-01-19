import { useEffect, useState } from "react";
import "./App.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import EventDetails from "./components/EventDetails";
import TopNav from "./components/TopNav";
import RaceSubmissionForm from "./components/Submit"
import { fetchEventsByType } from "./api/fetchEventsByType";
import { FetchRegistrationsResponse, type Event } from "./types";
import { fetchRegistrations } from "./api/fetchRegisteredRiders";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<FetchRegistrationsResponse | undefined>(undefined);

  useEffect(() => {
    const getRegisteredRiders = async () => {
      const response = await fetchRegistrations('road%20race');
      setRegistrations(response);
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
        {events.map((event) => (
          <EventDetails key={event.eventId} event={event} registrations={registrations} />
        ))}
      </MantineProvider>
    </>
  );
}

export default App;
