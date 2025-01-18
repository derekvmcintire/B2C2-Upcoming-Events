import { useEffect, useState } from "react";
import "./App.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import EventDetails from "./components/EventDetails";
import TopNav from "./components/TopNav";
import RaceSubmissionForm from "./components/Submit"
import { fetchEventsByType } from "./api/fetchEventsByType";
import type { Event } from "./types";

function App() {
  const [events, setEvents] = useState<Event[]>([]);

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
          <EventDetails key={event.eventId} event={event} />
        ))}
      </MantineProvider>
    </>
  );
}

export default App;
