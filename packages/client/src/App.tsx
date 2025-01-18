
import "./App.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Event from "./components/EventDetails";
import TopNav from "./components/TopNav";
import { mockEvents } from './types/index'

function App() {

  return (
    <>
      <MantineProvider>
        <TopNav />
        {mockEvents.map(event => {
          return (
            <Event event={event}/>
          )
        })}
        
      </MantineProvider>
    </>
  );
}

export default App;
