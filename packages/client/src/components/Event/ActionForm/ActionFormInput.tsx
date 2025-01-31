import { Button, Flex, TextInput } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useCallback } from "react";
import { MdArrowForward } from "react-icons/md";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";
import { useFormInput } from "../../../hooks/useFormInput";
import DismissButton from "../../Shared/DismissButton";

type EventCardInputProps = {
  placeholder: string;
  submitLabel?: string;
  submitHandler: (e: string) => void;
  dismissInput: () => void;
  validate: (value: string) => boolean;
};

/**
 * EventCardInput Component
 *
 * Renders a form row, containing a button to open the form/close the form, and a text input and submit button
 *
 * @param {EventCardInput} props
 */
export default function EventCardInput({
  placeholder,
  submitLabel,
  submitHandler,
  dismissInput,
  validate,
}: EventCardInputProps) {
  const {
    value: inputValue,
    error,
    handleChange,
    reset,
  } = useFormInput({
    validate: validate || (() => true),
  });

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
    }
  }, [submitHandler, reset, dismissInput, error, inputValue]);

  /**
   * Renders the default button label based on the value of `isMobile`.
   * If `isMobile` is true, it renders an arrow icon. Otherwise, it renders the string "Submit".
   * @returns The default button label.
   */
  const DefaultButtonLabel = () => (isMobile ? <MdArrowForward /> : "Submit");

  return (
    <Flex mt="8" mb="8" justify="center" align="center">
      <DismissButton xs clickHandler={dismissInput} withoutModal />
      <TextInput
        data-testid="event-card-form-input"
        size="xs"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        className={classes.actionFormInput}
      />
      <Button
        variant="outline"
        color="gray"
        c="gray"
        data-testid="event-card-form-submit"
        size="xs"
        onClick={handleClickSubmit}
      >
        {submitLabel || <DefaultButtonLabel />}
      </Button>
    </Flex>
  );
}
