import { Box, Grid } from "@mantine/core";
import DroppableContainer from "./DroppableContainer";
import { RiderLists, RiderListsConfig } from "./types";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";

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
}: RiderListsContainerProps) => {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  return (
    <Box p="sm">
      <Grid>
        <Grid.Col span={isMobile ? 12 : 6}>
          <DroppableContainer
            id={config.primaryList.id}
            items={riders[config.primaryList.id] || []}
            title={config.primaryList.title}
            hasDismiss={config.primaryList.hasDismiss}
            draggable={draggable}
            removeFn={removeFns.primary}
          />
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 6}>
          <DroppableContainer
            id={config.secondaryList.id}
            items={riders[config.secondaryList.id] || []}
            title={config.secondaryList.title}
            hasDismiss={config.secondaryList.hasDismiss}
            draggable={draggable}
            removeFn={removeFns.secondary}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
};
