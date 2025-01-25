import { useState } from "react";

import EventCardButtons from "./EventCardButtons";
import EventCardInput from "./EventCardInput";
import { Stack } from "@mantine/core";
import { useEventsContext } from "../../context/events-context";

type EventCardForm = {
  hasHousingUrl: boolean;
  handleSubmitHousing: (value: any) => void;
  handleSubmitInterestedRider: (value: any) => void;
};

/**
 * EventCardForm Component
 *
 * Renders a form row, containing a button to open the form/close the form, and a text input and submit button
 *
 * @param {EventCardForm} props
 */
export default function EventCardForm({
  hasHousingUrl,
  handleSubmitHousing,
  handleSubmitInterestedRider,
}: EventCardForm) {
  const eventsContext = useEventsContext();
  const { isSubmitting } = eventsContext;

  const [interestedRiderInputOpen, setInterestedRiderInputOpen] =
    useState<boolean>(false);
  const [housingUrlInputOpen, setHousingUrlInputOpen] =
    useState<boolean>(false);

  const handleClickOpen = (action: "rider" | "url") => {
    if (action === "rider") {
      setHousingUrlInputOpen(false);
      setInterestedRiderInputOpen(true);
    } else if (action === "url") {
      setInterestedRiderInputOpen(false);
      setHousingUrlInputOpen(true);
    }
  };

  const handleClickClose = () => {
    setInterestedRiderInputOpen(false);
    setHousingUrlInputOpen(false);
  };

  const handleClickSubmit = (value: any, action: "rider" | "url") => {
    if (action === "rider") {
      handleSubmitInterestedRider(value);
    } else if (action === "url") {
      handleSubmitHousing(value);
    }
    setInterestedRiderInputOpen(false);
    setHousingUrlInputOpen(false);
  };

  const validateHousingUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Stack align="center">
      {interestedRiderInputOpen && (
        <EventCardInput
          placeholder="Add Interested Rider"
          validate={() => true}
          submitHandler={(value) => handleClickSubmit(value, "rider")}
          dismissInput={handleClickClose}
        />
      )}
      {housingUrlInputOpen && (
        <EventCardInput
          placeholder="Add Housing Link"
          validate={validateHousingUrl}
          submitHandler={(value) => handleClickSubmit(value, "url")}
          dismissInput={handleClickClose}
        />
      )}
      {!interestedRiderInputOpen && !housingUrlInputOpen && (
        <EventCardButtons
          hasHousingUrl={hasHousingUrl}
          isSubmitting={isSubmitting}
          handleClickOpen={handleClickOpen}
        />
      )}
    </Stack>
  );
}
