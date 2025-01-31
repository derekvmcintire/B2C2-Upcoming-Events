import { Flex, Stack, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import ToggleInputForm from "../ActionForm/ToggleInputForm";
import { useEventContext } from "../../../context/event-context";
import { UpdateEventData } from "../../../api/updateEvent";
import DismissButton from "../../Shared/DismissButton";
import RiderList from "../RidersBlock/RiderList";

interface HousingLogisticProps {
  handleUpdateEvent: (data: UpdateEventData) => void;
}

export default function HousingLogistic({
  handleUpdateEvent,
}: HousingLogisticProps) {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventId, eventType, housingUrl } = event;

  const validateHousingUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Handles the submission of a housing URL.
   *
   * @param url - The housing URL to be submitted.
   */
  const handleSubmitHousing = (url: string) => {
    handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      housingUrl: url,
    });
  };

  /**
   * Handles the removal of housing for an event.
   */
  const handleRemoveHousing = () =>
    handleUpdateEvent({
      eventId: eventId,
      eventType: eventType,
      housingUrl: null,
    });

  const mockRidersInterestedHousing = ["Wout", "Jonas"];
  const mockRidersConfirmedHousing = ["Tadej", "Remco", "Fabian"];

  return (
    <Stack h="100%" className={classes.logisticCard}>
      {!housingUrl ? (
        <>
          <Text>Add Housing Info</Text>
          <ToggleInputForm
            buttonConfig={{
              label: "Housing",
              testId: "housing-button",
            }}
            inputConfig={{
              placeholder: "Add Housing Link",
              validate: validateHousingUrl,
            }}
            onSubmit={handleSubmitHousing}
          />
        </>
      ) : (
        <Stack>
          <Flex justify="flex-start" align="center">
            <Text className={classes.eventLink}>
              <a href={housingUrl} target="_blank" rel="noopener noreferrer">
                Link to Housing Information
              </a>
            </Text>
            <DismissButton clickHandler={handleRemoveHousing} />
          </Flex>
          <Flex w="100%" justify="space-around">
            <RiderList label="Confirmed" riders={mockRidersConfirmedHousing} />
            <RiderList
              label="Interested"
              riders={mockRidersInterestedHousing}
            />
          </Flex>
        </Stack>
      )}
    </Stack>
  );
}
