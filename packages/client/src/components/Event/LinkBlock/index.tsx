import { Button, Flex } from "@mantine/core";
import classes from "../styles/event.module.css";
import ActionFormRefactored from "../ActionForm";
import { UpdateEventData } from "../../../api/updateEvent";

type LinkBlockProps = {
  handleUpdateEvent: (data: UpdateEventData) => void;
};

export default function LinkBlock({ handleUpdateEvent }: LinkBlockProps) {
  return (
    <Flex className={classes.linkBlock} justify="right" align="center">
      <ActionFormRefactored handleUpdateEvent={handleUpdateEvent} />
      <Button size="sm">Link to Event</Button>
    </Flex>
  );
}
