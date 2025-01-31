import { Box, Stack, Tabs } from '@mantine/core';
import LogisticSection from './LogisticSection';
import classes from '../styles/event.module.css';


export default function LogisticsBlock() {
    return (
      <Box className={classes.logisticsTabs}>
      <Tabs h="100%" defaultValue="housing" inverted>
      <Tabs.Panel value="housing" pb="xs">
        <Stack>
          <LogisticSection />
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="carpool" pb="xs">
      <Stack>
          <LogisticSection />
        </Stack>
      </Tabs.Panel>

      <Tabs.List>
        <Tabs.Tab value="housing">Housing</Tabs.Tab>
        <Tabs.Tab value="carpool">Carpool</Tabs.Tab>
      </Tabs.List>
    </Tabs>
    </Box>
    )
}
