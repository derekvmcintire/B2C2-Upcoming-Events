import { Stack, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import ToggleInputForm from "../ActionForm/ToggleInputForm";
import { useEventContext } from "../../../context/event-context";
import { UpdateEventData } from "../../../api/updateEvent";

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

  return (
    <Stack h="100%" className={classes.logisticCard}>
      <Text>Housing Logistics Go Here</Text>
      {!housingUrl && (
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
      )}
    </Stack>
  );
}
