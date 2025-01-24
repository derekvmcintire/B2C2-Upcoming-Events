import { ChangeEvent, useState } from "react";
import { Button, Flex, Grid, Text, TextInput } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import classes from "./event.module.css";
import DismissButton from "../Shared/DismissButton";

type FormRowProps = {
  openedLabel: string;
  closedLabel: string;
  placeholder: string;
  isSubmitting: boolean;
  submitLabel?: string;
  submitHandler: (e: any) => void;
};

/**
 * FormRow Component
 *
 * Renders a form row, containing a button to open the form/close the form, and a text input and submit button
 *
 * @param {FormRowProps} props
 */
export default function FormRow({
  openedLabel,
  closedLabel,
  placeholder,
  isSubmitting,
  submitLabel,
  submitHandler,
}: FormRowProps) {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClickOpen = () => {
    setInputOpen(true);
  };

  const handleClickClose = () => {
    setInputOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleClickSubmit = () => {
    submitHandler(inputValue);
    setInputValue("");
    setInputOpen(false);
  };
  return (
    <>
      <Grid.Col span={4}>
        <Flex justify="flex-end" align="center">
          {inputOpen ? (
            <>
              <DismissButton clickHandler={handleClickClose} />
              <Text>{openedLabel}</Text>
            </>
          ) : (
            <Button
              leftSection={<MdAdd size={14} />}
              variant="default"
              onClick={handleClickOpen}
            >
              {closedLabel}
            </Button>
          )}
        </Flex>
      </Grid.Col>
      <Grid.Col span={8}>
        {isSubmitting && !inputOpen && <Text>Loading...</Text>}
        {inputOpen && (
          <Flex justify="flex-start">
            <TextInput
              value={inputValue}
              onChange={handleInputChange}
              className={classes.formRowInput}
              placeholder={placeholder}
            />
            <Button onClick={handleClickSubmit}>
              {submitLabel || "Submit"}
            </Button>
          </Flex>
        )}
      </Grid.Col>
    </>
  );
}
