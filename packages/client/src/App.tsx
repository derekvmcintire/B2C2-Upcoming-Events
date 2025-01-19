import "./App.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import TopNav from "./components/TopNav";
import ListTabs from "./components/EventList/ListTabs";
import { EventsProvider } from "./context/events-context";

function App() {
  return (
    <>
      <MantineProvider>
        <EventsProvider>
          <TopNav />
          <ListTabs />
        </EventsProvider>
      </MantineProvider>
    </>
  );
}

export default App;
