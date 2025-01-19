import TopNav from "../TopNav";
import ListTabs from "../EventList/ListTabs";
import ColorSchemeToggle from "../ColorSchemeToggle";
import { MantineProvider } from "@mantine/core";
import { EventsProvider } from "../../context/events-context";

/**
 * Home Component
 * 
 * A page that displays the event list and top navigation, along with a color scheme toggle. The component is 
 * wrapped in Mantine and events context providers to manage state and ensure consistent styling across the page.
 * 
 * @returns A container for the event list, top navigation, and color scheme toggle.
 */
const Home = (): JSX.Element => {
    return (
      <>
        <MantineProvider
          defaultColorScheme="dark"
        >
          <EventsProvider>
            <TopNav />
            <ListTabs />
            <ColorSchemeToggle />
          </EventsProvider>
        </MantineProvider>
      </>
    )
}

export default Home;