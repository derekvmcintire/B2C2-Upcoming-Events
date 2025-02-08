import { Button, Flex } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { DISCIPLINES, MOBILE_BREAK_POINT } from "../../../constants";
import InterestedRiderForm from "../ActionForm";
import { UpdateEventData } from "../../../api/updateEvent";
import { useEventContext } from "../../../context/event-context";

/**
 * Renders a link block component for an event.
 */
export default function LinkBlock({
  updateEventFn,
}: {
  updateEventFn: (data: UpdateEventData) => void;
}) {
  const { event } = useEventContext();
  const { eventType, eventUrl } = event;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const alignment = isMobile ? "center" : "right";

  const buttonSize = isMobile ? "compact-xs" : "compact-sm";

  return (
    <Flex
      className={classes.linkBlock}
      justify={alignment}
      align="center"
      wrap="wrap"
    >
      {eventType == DISCIPLINES.SPECIAL.id && (
        <InterestedRiderForm handleUpdateEvent={updateEventFn} isCommitted />
      )}
      <InterestedRiderForm handleUpdateEvent={updateEventFn} />
      {eventUrl && (
        <Button size={buttonSize}>
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.eventLink}
          >
            Event Details
          </a>
        </Button>
      )}
    </Flex>
  );
}
