import { Stack, Tabs, Text } from '@mantine/core';
import LogisticSection from './LogisticSection';

export default function Component() {
    return (
      <Tabs defaultValue="housing" inverted>
      <Tabs.Panel value="housing" pb="xs">
        <Stack>
          <Text>Housing Logistics</Text>
          <LogisticSection />
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="carpool" pb="xs">
      <Stack>
          <Text>Carpool Logistics</Text>
          <LogisticSection />
        </Stack>
      </Tabs.Panel>

      <Tabs.List>
        <Tabs.Tab value="housing">Housing</Tabs.Tab>
        <Tabs.Tab value="carpool">Carpool</Tabs.Tab>
      </Tabs.List>
    </Tabs>
    )
}
