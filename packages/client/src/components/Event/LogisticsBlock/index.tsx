import { Box, Flex, Stack, Tabs } from "@mantine/core";
import HousingLogistics from "./HousingLogistics";
import CarpoolLogistics from "./CarpoolLogistics";
import classes from "../styles/event.module.css";

export default function LogisticsBlock() {
  return (
    <Stack w="100%" h="100%" justify="flex-end" className={classes.logisticsTabs}>
      <Tabs defaultValue="carpool" inverted style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Tabs.Panel value="carpool" pb="xs">
          <Stack w="100%" h="100%" style={{border: "1px solid white"}}>
            <CarpoolLogistics />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="housing" pb="xs" >
          <Stack w="100%" h="100%" style={{border: "1px solid white"}}>
            <HousingLogistics />
          </Stack>
        </Tabs.Panel>

        <Box>
        <Tabs.List>
        <Tabs.Tab value="carpool">Carpool</Tabs.Tab>
          <Tabs.Tab value="housing">Housing</Tabs.Tab>
        </Tabs.List>
        </Box>
      </Tabs>
    </Stack>
  );
}
