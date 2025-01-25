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

  const handleClickSubmit = () => {
    if (error === "") {
      submitHandler(inputValue);
      reset();
      dismissInput();
    }
  };

  return (
    <Flex justify="center">
      <DismissButton clickHandler={dismissInput} />
      <TextInput
        value={inputValue}
        onChange={handleChange}
        className={classes.formRowInput}
        placeholder={placeholder}
        error={error}
      />
      <Button onClick={handleClickSubmit}>{submitLabel || "Submit"}</Button>
    </Flex>
  );
}
