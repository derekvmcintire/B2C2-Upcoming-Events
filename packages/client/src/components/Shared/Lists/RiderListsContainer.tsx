import { Box, Group } from "@mantine/core";
import DroppableContainer from "./DroppableContainer";
import { RiderLists, RiderListsConfig } from "./types";

interface RiderListsContainerProps {
  config: RiderListsConfig;
  riders: RiderLists;
  draggable: boolean;
  removeFns: {
    primary: (name: string) => void;
    secondary: (name: string) => void;
  };
}

export const RiderListsContainer = ({
  config,
  riders,
  draggable,
  removeFns,
}: RiderListsContainerProps) => (
  <Box p="sm">
    <Group align="stretch" grow>
      <DroppableContainer
        id={config.primaryList.id}
        items={riders[config.primaryList.id] || []}
        title={config.primaryList.title}
        hasDismiss={config.primaryList.hasDismiss}
        draggable={draggable}
        removeFn={removeFns.primary}
      />
      <DroppableContainer
        id={config.secondaryList.id}
        items={riders[config.secondaryList.id] || []}
        title={config.secondaryList.title}
        hasDismiss={config.secondaryList.hasDismiss}
        draggable={draggable}
        removeFn={removeFns.secondary}
      />
    </Group>
  </Box>
);
