import { Box, Grid } from "@mantine/core";
import DroppableContainer from "./DroppableContainer";
import { RiderLists, RiderListsConfig } from "./types";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";
import classes from "../shared.module.css";

interface RiderListsContainerProps {
  config: RiderListsConfig;
  riders: RiderLists;
  draggable: boolean;
  removeFns: {
    primary: (name: string) => void;
    secondary: (name: string) => void;
  };
  xs?: boolean;
}

/**
 * Renders a container for rider lists.
 *
 * @param config - The configuration for the rider lists.
 * @param riders - The riders data.
 * @param draggable - Indicates whether the items are draggable.
 * @param removeFns - The remove functions for each list.
 * @returns The rendered RiderListsContainer component.
 */
export const RiderListsContainer = ({
  config,
  riders,
  draggable,
  removeFns,
  xs = false,
}: RiderListsContainerProps): JSX.Element => {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const rideListContainerClass = xs
    ? classes.xsRiderListContainer
    : classes.riderListContainer;

  return (
    <Box p="sm" w="100%" className={rideListContainerClass}>
      <Grid>
        <Grid.Col span={isMobile ? 12 : 6}>
          <DroppableContainer
            id={config.primaryList.id}
            items={riders[config.primaryList.id] || []}
            title={config.primaryList.title}
            hasDismiss={config.primaryList.hasDismiss}
            draggable={draggable}
            removeFn={removeFns.primary}
            xs={xs}
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
            xs={xs}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
};
