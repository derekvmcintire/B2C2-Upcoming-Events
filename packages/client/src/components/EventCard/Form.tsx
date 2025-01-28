import { useCallback, useState } from "react";

import FormButtons from "./FormButtons";
import EventCardInput from "./FormInput";
import { Stack } from "@mantine/core";
import classes from "./event.module.css";

type EventCardForm = {
  hasHousingUrl: boolean;
  handleSubmitHousing: (value: string) => void;
  handleSubmitInterestedRider: (value: string) => void;
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

  const handleClickSubmit = useCallback(
    (value: string, action: "rider" | "url") => {
      if (action === "rider") {
        handleSubmitInterestedRider(value);
      } else if (action === "url") {
        handleSubmitHousing(value);
      }
      setInterestedRiderInputOpen(false);
      setHousingUrlInputOpen(false);
    },
    [handleSubmitHousing, handleSubmitInterestedRider],
  );

  const validateHousingUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const buttonsAreAvailable = !interestedRiderInputOpen && !housingUrlInputOpen;

  return (
    <Stack w="100%" align="center" className={classes.eventCardForm}>
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
      {buttonsAreAvailable && (
        <FormButtons
          hasHousingUrl={hasHousingUrl}
          handleClickOpen={handleClickOpen}
        />
      )}
    </Stack>
  );
}
