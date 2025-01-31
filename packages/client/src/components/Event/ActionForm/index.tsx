import { Flex } from "@mantine/core";
import ToggleInputForm from "./ToggleInputForm";
import { UpdateEventData } from "../../../api/updateEvent";
import { useEventContext } from "../../../context/event-context";

interface ActionFormProps {
  handleUpdateEvent: (data: UpdateEventData) => void;
}

const ActionFormRefactored = ({ handleUpdateEvent }: ActionFormProps) => {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventId, eventType, interestedRiders } = event;

  /**
   * Handles the submission of an interested rider.
   *
   * @param rider - The rider to be submitted.
   */
  const handleSubmitInterestedRider = (rider: string) => {
    const existingInterestedRiders = interestedRiders || [];
    return handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      interestedRiders: [...existingInterestedRiders, rider],
    });
  };

  return (
    <Flex pr="16" justify="center" wrap="wrap">
      <ToggleInputForm
        buttonConfig={{
          label: "I'm interested",
          mobileLabel: "Interested",
          testId: "interested-button",
        }}
        inputConfig={{
          placeholder: "Enter Name",
          validate: () => true,
        }}
        onSubmit={handleSubmitInterestedRider}
      />
    </Flex>
  );
};

export default ActionFormRefactored;
