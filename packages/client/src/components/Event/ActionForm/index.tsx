import { useCallback, useState } from "react";

import { Stack } from "@mantine/core";
import ActionFormButtons from "./ActionFormButtons";
import ActionFormInput from "./ActionFormInput";

type ActionFormProps = {
  hasHousingUrl: boolean;
  handleSubmitHousing: (value: string) => void;
  handleSubmitInterestedRider: (value: string) => void;
};

/**
 * ActionFormProps Component
 *
 * Renders a form row, containing a button to open the form/close the form, and a text input and submit button
 *
 * @param {ActionFormProps} props
 */
export default function ActionForm({
  hasHousingUrl,
  handleSubmitHousing,
  handleSubmitInterestedRider,
}: ActionFormProps) {
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
    <Stack align="fex-start">
      {interestedRiderInputOpen && (
        <ActionFormInput
          placeholder="Add Interested Rider"
          validate={() => true}
          submitHandler={(value) => handleClickSubmit(value, "rider")}
          dismissInput={handleClickClose}
        />
      )}
      {housingUrlInputOpen && (
        <ActionFormInput
          placeholder="Add Housing Link"
          validate={validateHousingUrl}
          submitHandler={(value) => handleClickSubmit(value, "url")}
          dismissInput={handleClickClose}
        />
      )}
      {buttonsAreAvailable && (
        <ActionFormButtons
          hasHousingUrl={hasHousingUrl}
          handleClickOpen={handleClickOpen}
        />
      )}
    </Stack>
  );
}
