import { Box, Stack, Tabs } from "@mantine/core";
import HousingLogistics from "./HousingLogistics";
import CarpoolManager from "./CarpoolLogistics";
import classes from "../styles/event.module.css";
import { UpdateEventData } from "../../../api/updateEvent";
import { useEventContext } from "../../../context/event-context";

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
  const eventContext = useEventContext();
  const { event } = eventContext;

  const CARPOOL = "carpool";
  const HOUSING = "housing";

  const hasCarpools = event?.carpools && event?.carpools.length > 0;
  const hasHousing = event?.housingUrl;

  const defaultTab = !hasCarpools && hasHousing ? HOUSING : CARPOOL;
  return (
    <Stack
      w="100%"
      h="100%"
      justify="flex-end"
      className={classes.logisticsTabs}
    >
      <Tabs
        defaultValue={defaultTab}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Box>
          <Tabs.List>
            <Tabs.Tab value={CARPOOL}>Carpool</Tabs.Tab>
            <Tabs.Tab value={HOUSING}>Housing</Tabs.Tab>
          </Tabs.List>
        </Box>

        <Tabs.Panel value={CARPOOL} p="16">
          <Stack w="100%" h="100%">
            <CarpoolManager />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value={HOUSING} p="16">
          <Stack w="100%" h="100%">
            <HousingLogistics handleUpdateEvent={handleUpdateEvent} />
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
