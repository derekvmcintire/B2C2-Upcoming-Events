import { Button, Flex } from "@mantine/core";
import classes from "../styles/event.module.css";
import ActionForm from "../ActionForm";
import { useEventContext } from "../../../context/event-context";
import ActionFormRefactored from "../ActionForm/ActionFormRefactored";

type LinkBlockProps = {
  handleSubmitHousing: (value: string) => void;
  handleSubmitInterestedRider: (value: string) => void;
};

export default function LinkBlock({
  handleSubmitHousing,
  handleSubmitInterestedRider,
}: LinkBlockProps) {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { housingUrl } = event;

  return (
    <Flex className={classes.linkBlock} justify="right" align="center">
      <ActionFormRefactored
        hasHousingUrl={!!housingUrl}
        handleSubmitHousing={handleSubmitHousing}
        handleSubmitInterestedRider={handleSubmitInterestedRider}
      />
      <Button size="sm">Link to Event</Button>
    </Flex>
  );
}
