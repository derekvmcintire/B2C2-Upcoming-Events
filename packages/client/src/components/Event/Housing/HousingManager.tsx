import { Card, Flex, Stack } from "@mantine/core";
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
import { isValidUrl } from "../../../utils/url";

interface HousingManagerProps {
  handleUpdateEvent: (data: UpdateEventData) => void;
}

/**
 * Renders the HousingLogistic component.
 *
 * @param handleUpdateEvent - Function to handle event updates.
 */
export default function HousingManager({
  handleUpdateEvent,
}: HousingManagerProps) {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventId, eventType, housingUrl } = event;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

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
      housingUrl: "",
    });

  return (
    <>
      {housingUrl && (
        <Flex w="100%" justify="flex-end" align="center">
          <a
            href={housingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.housingLink}
          >
            {!isMobile ? "Housing Information" : "Housing Info"}
          </a>
          <DismissButton xs clickHandler={handleRemoveHousing} />
        </Flex>
      )}
      <Stack gap="md" style={{ width: "80%", margin: "0 auto" }} mb="20">
        <SubTitle text="Housing" ta="center" />
        {!housingUrl && (
          <Card withBorder>
            <Stack gap={0} align="center">
              <ActionFormInput
                inputLabel="Enter a valid URL"
                placeholder="https://www..."
                submitLabel="Add URL"
                submitHandler={handleSubmitHousing}
                withoutDismiss
                validate={isValidUrl}
              />
            </Stack>
          </Card>
        )}
        <Stack>
          <Flex w="100%" justify="center">
            <HousingRidersBlock />
          </Flex>
          <InterestedRiderForm
            isHousing
            handleUpdateEvent={handleUpdateEvent}
            customLabel={"I'm Committed to Housing"}
            isCommitted
          />
          <InterestedRiderForm
            isHousing
            handleUpdateEvent={handleUpdateEvent}
            customLabel={"I'm Interested in Housing"}
          />
        </Stack>
      </Stack>
    </>
  );
}
