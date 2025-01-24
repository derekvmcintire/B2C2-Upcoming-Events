import { ChangeEvent, useState } from "react";
import { Button, Flex, Grid, Text, TextInput } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import classes from "./event.module.css";
import DismissButton from "../Shared/DismissButton";
import { useMediaQuery } from "@mantine/hooks";

type FormRowProps = {
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

  const isMobile = useMediaQuery("(max-width: 650px)");

  return (
    <>
      <Grid.Col span={isMobile ? 0 : 4}></Grid.Col>
      <Grid.Col span={isMobile ? 12 : 8}>
        <Flex justify="flex-start" align="center" className={classes.formSide}>
          {isSubmitting ? (<Text>Loading...</Text>) : 
            inputOpen ? (
              <>
                <DismissButton clickHandler={handleClickClose} />
                <TextInput
                  value={inputValue}
                  onChange={handleInputChange}
                  className={classes.formRowInput}
                  placeholder={placeholder}
                />
                <Button onClick={handleClickSubmit}>
                  {submitLabel || "Submit"}
                </Button>
              </>
            ) : (
              <Button
                variant="transparent"
                size="compact-md"
                leftSection={<MdAdd size={14} />}
                disabled={isSubmitting}
                onClick={handleClickOpen}
              >
                {closedLabel}
              </Button>
            )
          }

          

        </Flex>
      </Grid.Col>
    </>
  );
}
