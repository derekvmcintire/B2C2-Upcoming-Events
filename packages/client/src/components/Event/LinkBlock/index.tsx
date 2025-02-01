import { Button, Flex } from "@mantine/core";
import classes from "../styles/event.module.css";
import ActionFormRefactored from "../ActionForm";
import { UpdateEventData } from "../../../api/updateEvent";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";

type LinkBlockProps = {
  handleUpdateEvent: (data: UpdateEventData) => void;
};

export default function LinkBlock({ handleUpdateEvent }: LinkBlockProps) {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const alignment = isMobile ? "center" : "right";

  const buttonSize = isMobile ? "compact-xs" : "compact-sm";

  return (
    <Flex className={classes.linkBlock} justify={alignment} align="center">
      <ActionFormRefactored handleUpdateEvent={handleUpdateEvent} />
      <Button size={buttonSize}>Link to Event</Button>
    </Flex>
  );
}
