import { Flex } from "@mantine/core";
import ToggleInputForm from "./ToggleInputForm";
import { UpdateEventData } from "../../../api/updateEvent";
import { useEventContext } from "../../../context/event-context";

interface InterestedRiderFormProps {
  handleUpdateEvent: (data: UpdateEventData) => void;
  isHousing?: boolean;
  customLabel?: string;
  isCommitted?: boolean;
}

// @TODO: naming of this component vs naming of this file
/**
 * Represents a form component for capturing interested riders for an event.
 *
 * @param handleUpdateEvent - The function to handle the update of the event.
 */
const InterestedRiderForm = ({
  handleUpdateEvent,
  isHousing = false,
  customLabel,
  isCommitted = false,
}: InterestedRiderFormProps) => {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const {
    eventId,
    eventType,
    interestedRiders,
    committedRiders,
    housingUrl,
    housing = {},
  } = event;

  const handleSubmitInterestedInEvent = (rider: string) => {
    const existingInterestedRiders = interestedRiders || [];
    return handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      interestedRiders: [...existingInterestedRiders, rider],
    });
  };

  const handleSubmitCommittedToEvent = (rider: string) => {
    const existingCommittedRiders = committedRiders || [];
    return handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      committedRiders: [...existingCommittedRiders, rider],
    });
  };

  const handleSubmitInterestedInHousing = (rider: string) => {
    const existingInterestedInHousingList = housing?.interested || [];

    return handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      housingUrl,
      housing: {
        interested: [...existingInterestedInHousingList, rider],
        committed: housing?.committed || [],
      },
    });
  };

  /**
   * Handles the submission of an interested rider.
   *
   * @param rider - The rider to be submitted.
   */
  const handleSubmitInterestedRider = (rider: string) => {
    if (isHousing) {
      return handleSubmitInterestedInHousing(rider);
    }
    return isCommitted
      ? handleSubmitCommittedToEvent(rider)
      : handleSubmitInterestedInEvent(rider);
  };

  const getDesktopLabel = () => {
    if (customLabel) {
      return customLabel;
    }
    return isCommitted ? "I'm Committed" : "I'm Interested";
  };

  const getMobileLabel = () => {
    if (customLabel) {
      return customLabel;
    }

    return isCommitted ? "Committed" : "Interested";
  };

  return (
    <Flex pr="16" justify="center" wrap="wrap">
      <ToggleInputForm
        buttonConfig={{
          label: getDesktopLabel(),
          mobileLabel: getMobileLabel(),
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

export default InterestedRiderForm;
