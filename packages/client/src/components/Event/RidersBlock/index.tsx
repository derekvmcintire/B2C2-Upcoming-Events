import { Box, Collapse, Group, SimpleGrid } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useDisclosure } from "@mantine/hooks";
import CollapseButton from "../../Shared/CollapseButton";
import RiderList from "./RiderList";
import { useEventContext } from "../../../context/event-context";

type RidersListProps = {
  interestedRiders: string[];
  registeredRiders: string[];
  removeInterestedRiderFn: (rider: string) => void;
};

/**
 * RidersList Component
 *
 * Renders a row that contains a list of interestedRiders that are interested in this event
 *
 * @param {RidersListProps} props
 */
export default function RiderListBlock({
  interestedRiders,
  registeredRiders,
  removeInterestedRiderFn,
}: RidersListProps) {
  const [opened, { toggle }] = useDisclosure(true);

  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventType } = event;

  const isRace = eventType !== "special";

  const nonRaceButtonlabel = `${registeredRiders.length} Committed | ${interestedRiders.length} Interested`;
  const raceButtonlabel = `${registeredRiders.length} Reg'd | ${interestedRiders.length} Interested`;
  const buttonLabel = !isRace ? nonRaceButtonlabel : raceButtonlabel;

  return (
    <Box data-testid="interested-row" className={classes.ridersListContainer}>
      <Group justify="center" mb={5}>
        <CollapseButton label={buttonLabel} opened={opened} toggleFn={toggle} />
      </Group>

      <Collapse in={opened} className={classes.riderListCollapse}>
        <SimpleGrid cols={2}>
          <RiderList
            label={isRace ? "Registered" : "Committed"}
            isRegisteredList
            riders={registeredRiders}
          />
          <RiderList
            label="Interested"
            riders={interestedRiders}
            removeFn={removeInterestedRiderFn}
          />
        </SimpleGrid>
      </Collapse>
    </Box>
  );
}
