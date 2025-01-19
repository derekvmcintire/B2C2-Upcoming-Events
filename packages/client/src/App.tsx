import { useEffect, useState } from "react";
import "./App.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import TopNav from "./components/TopNav";
import { fetchEventsByType } from "./api/fetchEventsByType";
import { FetchRegistrationsResponse, type Event } from "./types";
import { fetchRegistrations } from "./api/fetchRegisteredRiders";
import ListTabs from "./components/EventList/ListTabs";

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
        <ListTabs events={events} registrations={registrations}/>
      </MantineProvider>
    </>
  );
}

export default App;
