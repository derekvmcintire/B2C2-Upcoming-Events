import { Box, Stack, Tabs } from "@mantine/core";
import HousingLogistics from "./HousingLogistics";
import CarpoolManager from "./CarpoolLogistics";
import classes from "../styles/event.module.css";
import { UpdateEventData } from "../../../api/updateEvent";

interface LogisticsBlockProps {
  handleUpdateEvent: (data: UpdateEventData) => void;
}

/**
 * Renders the logistics block component.
 *
 * @param handleUpdateEvent - Function to handle event updates.
 * @returns The rendered logistics block component.
 */
export default function LogisticsBlock({
  handleUpdateEvent,
}: LogisticsBlockProps) {
  return (
    <Stack
      w="100%"
      h="100%"
      justify="flex-end"
      className={classes.logisticsTabs}
    >
      <Tabs
        defaultValue="housing"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Box>
          <Tabs.List>
            <Tabs.Tab value="carpool">Carpool</Tabs.Tab>
            <Tabs.Tab value="housing">Housing</Tabs.Tab>
          </Tabs.List>
        </Box>

        <Tabs.Panel value="carpool" pb="xs">
          <Stack w="100%" h="100%">
            <CarpoolManager />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="housing" pb="xs">
          <Stack w="100%" h="100%">
            <HousingLogistics handleUpdateEvent={handleUpdateEvent} />
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
