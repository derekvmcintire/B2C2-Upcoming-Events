import { Stack, Text } from "@mantine/core";
import classes from "../styles/event.module.css";
import ToggleInputForm from "../ActionForm/ToggleInputForm";
import { useEventContext } from "../../../context/event-context";

interface HousingLogisticProps {
  handleSubmitHousing: (value: string) => void;
}

export default function HousingLogistic({
  handleSubmitHousing,
}: HousingLogisticProps) {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { housingUrl } = event;
  
  const validateHousingUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Stack h="100%" className={classes.logisticCard}>
      <Text>Housing Logistics Go Here</Text>
      {!housingUrl && (
        <ToggleInputForm
          buttonConfig={{
            label: "Housing",
            testId: "housing-button"
          }}
          inputConfig={{
            placeholder: "Add Housing Link",
            validate: validateHousingUrl
          }}
          onSubmit={handleSubmitHousing}
        />
      )}
    </Stack>
  );
}
