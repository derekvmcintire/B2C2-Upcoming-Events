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

  /**
   * Handles the submission of interest in an event.
   * @param rider - The rider's name.
   * @returns A promise that resolves when the event update is complete.
   */
  const handleSubmitInterestedInEvent = (rider: string) => {
    const existingInterestedRiders = interestedRiders || [];
    return handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      interestedRiders: [...existingInterestedRiders, rider],
    });
  };

  /**
   * Handles the submission of committing to an event.
   *
   * @param rider - The rider to be added to the list of committed riders.
   * @returns A Promise representing the result of the event update.
   */
  const handleSubmitCommittedToEvent = (rider: string) => {
    const existingCommittedRiders = committedRiders || [];
    return handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      committedRiders: [...existingCommittedRiders, rider],
    });
  };

  /**
   * Handles the submission of interest in housing for a rider.
   * @param rider - The rider's name.
   * @returns The result of the event update.
   */
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
   * Handles the submission of committed housing for a rider.
   * @param rider - The rider to be added to the committed housing list.
   * @returns The result of the event update.
   */
  const handleSubmitCommittedToHousing = (rider: string) => {
    const existingCommittedToHousingList = housing?.committed || [];

    return handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      housingUrl,
      housing: {
        committed: [...existingCommittedToHousingList, rider],
        interested: housing?.interested || [],
      },
    });
  };

  /**
   * Handles the submission of an interested rider.
   *
   * @param rider - The rider to be submitted.
   */
  const handleSubmit = (rider: string) => {
    if (isHousing) {
      return isCommitted
        ? handleSubmitCommittedToHousing(rider)
        : handleSubmitInterestedInHousing(rider);
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
        onSubmit={handleSubmit}
      />
    </Flex>
  );
};

export default InterestedRiderForm;
