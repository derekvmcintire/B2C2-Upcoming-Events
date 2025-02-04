import { Button, Card, Flex, Stack } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useEventContext } from "../../../context/event-context";
import { UpdateEventData } from "../../../api/updateEvent";
import DismissButton from "../../Shared/DismissButton";
import HousingRidersBlock from "./HousingRidersBlock";
import SubTitle from "../../Shared/SubTitle";
import InterestedRiderForm from "../ActionForm";
import ActionFormInput from "../ActionForm/ActionFormInput";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";

interface HousingLogisticProps {
  handleUpdateEvent: (data: UpdateEventData) => void;
}

/**
 * Renders the HousingLogistic component.
 *
 * @param handleUpdateEvent - Function to handle event updates.
 */
export default function HousingLogistic({
  handleUpdateEvent,
}: HousingLogisticProps) {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventId, eventType, housingUrl } = event;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const buttonSize = isMobile ? "compact-xs" : "sm";

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

  return (
    <>
      {housingUrl && (
        <Flex w="100%" justify="flex-end" align="center">
          <Button variant="default" c="white" size={buttonSize} mr={8}>
            <a
              href={housingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.eventLink}
            >
              {!isMobile ? "Link to Housing Information" : "Housing Info"}
            </a>
          </Button>
          <DismissButton xs clickHandler={handleRemoveHousing} />
        </Flex>
      )}
      <Stack gap="md" style={{ width: "80%", margin: "0 auto" }} mb="20">
        <SubTitle text="Housing" ta="center" />
        {!housingUrl ? (
          <Card withBorder>
            <Stack align="center">
              <ActionFormInput
                placeholder="https://www..."
                submitLabel="Add URL"
                submitHandler={handleSubmitHousing}
                withoutDismiss
                validate={validateHousingUrl}
              />
            </Stack>
          </Card>
        ) : (
          <Stack>
            <Flex w="100%" justify="center">
              <HousingRidersBlock />
            </Flex>
            <InterestedRiderForm
              isHousing
              handleUpdateEvent={handleUpdateEvent}
              customLabel={"I'm Interested in Housing"}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
}
