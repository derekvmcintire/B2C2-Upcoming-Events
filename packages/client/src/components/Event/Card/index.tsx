import { Alert, Divider, Flex, Grid, Stack } from "@mantine/core";
import { MdOutlineWarning } from "react-icons/md";

import classes from "../styles/event.module.css";
import { UpdateEventData } from "../../../api/updateEvent";
import { FetchRegistrationsResponse } from "../../../types";
import { getEntriesByEventId } from "../../../utils/findRegisteredRiders";
import EventName from "../TitleBlock";
import LocationBlock from "../LocationBlock";
import LinkBlock from "../LinkBlock";
import Description from "../DescriptionBlock";
import LogisticsBlock from "../LogisticsBlock";
import Hypometer from "../Hypometer";
import Date from "../Date";
import { useMediaQuery } from "@mantine/hooks";
import { LABELS, MOBILE_BREAK_POINT } from "../../../constants";
import EventRidersBlock from "../RidersBlock/DraggableRidersBlock";
import SubTitle from "../../Shared/SubTitle";
import { useEventContext } from "../../../context/event-context";
import { useEventUpdate } from "../../../hooks/useEventUpdate";

type EventProps = {
  registrations?: FetchRegistrationsResponse;
};

/**
 * Renders an event card component.
 *
 * @param registrations - The registrations for the event.
 * @param isStripe - Used to determine the background color of the card to create a "striped" effect.
 * @returns The rendered event card component.
 */
export default function EventCard({ registrations }: EventProps): JSX.Element {
  const eventContext = useEventContext();
  const { event } = eventContext;

  const {
    eventId,
    eventUrl,
    interestedRiders = [],
    committedRiders = [],
    labels,
  } = event;

  const { handleEventUpdate, error, setError } = useEventUpdate();

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const isVirtualEvent = labels?.includes(LABELS.VIRTUAL.id);

  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

  const handleSubmitEventUpdate = async (data: UpdateEventData) => {
    await handleEventUpdate(data);
    if (error) {
      // Handle error (e.g. show toast notification)
      console.log("got an error: ", error);
    }
  };

  return (
    <Stack gap={0}>
      <Stack
        key={eventId}
        gap={0}
        className={classes.eventContainer}
        style={{ position: "relative" }}
      >
        {error && (
          <Flex justify="center">
            <Alert
              className={classes.alert}
              variant="light"
              color="red"
              title="Error"
              withCloseButton
              onClose={() => setError(null)}
              icon={<MdOutlineWarning />}
            >
              {error.message}
            </Alert>
          </Flex>
        )}
        <Hypometer
          numberOfInterestedRiders={interestedRiders.length}
          numberOfRegisteredRiders={registeredNames.length}
          numberOfCommittedRiders={committedRiders.length}
        />
        <Grid w="100%" className={classes.eventGrid}>
          <Grid.Col span={isMobile ? 12 : 3}>
            <Date />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 9}>
            <Stack h="100%" justify="center" p="16">
              <EventName />
              <LinkBlock eventUrl={eventUrl} />
            </Stack>
          </Grid.Col>
          <Divider w="100%" mb="16" />
          {!isVirtualEvent && (
            <Grid.Col span={isMobile ? 12 : 5}>
              <Flex w="100%" justify="center">
                <LocationBlock />
              </Flex>
            </Grid.Col>
          )}
          <Grid.Col span={isMobile || isVirtualEvent ? 12 : 7}>
            <Flex
              w="100%"
              h="100%"
              p={isMobile ? "0" : "24"}
              justify="center"
              align="center"
            >
              <Description submitFn={handleSubmitEventUpdate} />
            </Flex>
          </Grid.Col>
          <Divider w="100%" mb="16" />
          <Grid.Col span={12}>
            {/* Rider Lists */}
            <SubTitle text="Riders Attending" ta="center" />
            <EventRidersBlock
              registrations={registeredNames}
              updateEventFn={handleSubmitEventUpdate}
            />
          </Grid.Col>
          {!isVirtualEvent && (
            <Grid.Col span={12}>
              <Stack w="100%" h="100%" justify="flex-end">
                <LogisticsBlock handleUpdateEvent={handleSubmitEventUpdate} />
              </Stack>
            </Grid.Col>
          )}
        </Grid>
        <Divider />
      </Stack>
    </Stack>
  );
}
