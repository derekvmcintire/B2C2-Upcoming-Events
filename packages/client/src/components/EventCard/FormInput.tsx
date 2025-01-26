import { Button, Flex, TextInput } from "@mantine/core";
import classes from "./event.module.css";
import DismissButton from "../Shared/DismissButton";
import { useFormInput } from "../../hooks/useFormInput";

type EventCardInputProps = {
  placeholder: string;
  submitLabel?: string;
  submitHandler: (e: any) => void;
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

  /**
   * Handles the click event for the submit button.
   * If there are no errors, it calls the submitHandler function with the inputValue,
   * resets the input value, and dismisses the input.
   */
  const handleClickSubmit = () => {
    if (error === "") {
      submitHandler(inputValue);
      reset();
      dismissInput();
    }
  };

  return (
    <Flex m="8" justify="center">
      <DismissButton clickHandler={dismissInput} />
      <TextInput
        size="xs"
        value={inputValue}
        onChange={handleChange}
        className={classes.formRowInput}
        placeholder={placeholder}
        error={error}
      />
      <Button size="xs" onClick={handleClickSubmit}>
        {submitLabel || "Submit"}
      </Button>
    </Flex>
  );
}
