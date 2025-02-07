import { Alert, Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useCallback, useState } from "react";
import { MdArrowForward, MdOutlineWarning } from "react-icons/md";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";
import { useFormInput } from "../../../hooks/useFormInput";
import DismissButton from "../../Shared/DismissButton";

type ActionFormInputProps = {
  placeholder: string;
  submitLabel?: string;
  inputLabel?: string;
  submitHandler: (e: string) => void;
  dismissInput?: () => void;
  validate: (value: string) => boolean;
  withoutDismiss?: boolean;
};

/**
 * EventCardInput Component
 *
 * Renders a form row, containing a button to open the form/close the form, and a text input and submit button
 *
 * @param {EventCardInput} props
 */
export default function ActionFormInput({
  placeholder,
  submitLabel,
  inputLabel,
  submitHandler,
  dismissInput = () => {},
  validate,
  withoutDismiss = false,
}: ActionFormInputProps) {
  const {
    value: inputValue,
    error,
    handleChange,
    reset,
  } = useFormInput({
    validate: validate || (() => true),
  });

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  /**
   * Handles the click event for the submit button.
   * If there are no errors, it calls the submitHandler function with the inputValue,
   * resets the input value, and dismisses the input.
   */
  const handleClickSubmit = useCallback(() => {
    if (error === "") {
      submitHandler(inputValue);
      reset();
      dismissInput();
    } else {
      setShowAlert(true);
    }
  }, [submitHandler, reset, dismissInput, error, inputValue]);

  /**
   * Renders the default button label based on the value of `isMobile`.
   * If `isMobile` is true, it renders an arrow icon. Otherwise, it renders the string "Submit".
   * @returns The default button label.
   */
  const DefaultButtonLabel = () => (isMobile ? <MdArrowForward /> : "Submit");

  return (
    <Stack>
      {showAlert && (
        <Alert
          className={classes.alert}
          variant="light"
          color="red"
          title="Error"
          withCloseButton
          onClose={() => setShowAlert(false)}
          icon={<MdOutlineWarning />}
        >
          {error}
        </Alert>
      )}
      <Stack gap={0}>
        <Text w="100%" ta="left" size="xs" fw={500}>
          {inputLabel}
        </Text>
        <Flex justify="center" align="center">
          {!withoutDismiss && (
            <DismissButton xs clickHandler={dismissInput} withoutModal />
          )}
          <TextInput
            data-testid="event-card-form-input"
            size="xs"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={classes.actionFormInput}
          />
          <Button
            data-testid="event-card-form-submit"
            size="xs"
            onClick={handleClickSubmit}
          >
            {(!isMobile && submitLabel) || <DefaultButtonLabel />}
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
}
