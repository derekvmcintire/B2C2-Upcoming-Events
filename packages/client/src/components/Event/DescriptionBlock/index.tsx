import { Button, Flex, Stack, Text, Textarea } from "@mantine/core";
import { useState, useCallback } from "react";
import { MdOutlineWarningAmber } from "react-icons/md";
import classes from "../styles/event.module.css";
import { useEventContext } from "../../../context/event-context";
import DismissButton from "../../Shared/DismissButton";
import DeleteButton from "../../Shared/DeleteButton";
import EditButton from "../../Shared/EditButton";
import AddButton from "../../Shared/AddButton";
import { UpdateEventData } from "../../../api/updateEvent";

interface DescriptionProps {
  submitFn: (value: UpdateEventData) => void;
}

/**
 * A React component for displaying and editing an event description.
 * Provides a form to edit and save the event's description with real-time validation.
 *
 * @param {DescriptionProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Description component.
 */
export default function Description({
  submitFn,
}: DescriptionProps): JSX.Element {
  const eventContext = useEventContext();
  const { event } = eventContext;

  const { description = "", eventId, eventType } = event;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(description);

  /**
   * Handles the submission of the updated description.
   * Calls the `submitFn` provided as a prop and closes the edit form.
   */
  const handleClickSubmit = useCallback(() => {
    submitFn({
      eventId: eventId,
      eventType: eventType,
      description: value,
    });
    setIsOpen(false);
  }, [submitFn, value, eventId, eventType]);

  const hasUnsavedChanges = value !== description;
  const isAbleToSave = hasUnsavedChanges && value !== "";

  /**
   * Handles the delete action for the event card.
   * Clears the submitted value and resets the input value.
   */
  const handleDelete = () => {
    submitFn({
      eventId: eventId,
      eventType: eventType,
      description: "",
    });
    setValue("");
    setIsOpen(false);
  };

  /**
   * Handles the dismiss action for the event description.
   * If the text area input is empty and the user clicks the dismiss button,
   * it sets the value to the saved description.
   */
  const handleDismiss = () => {
    setIsOpen(false);
    setValue(description);
  };

  /**
   * Renders the input buttons for the event description.
   *
   * @returns The JSX element representing the input buttons.
   */
  const inputButtonsLeft = (
    <Flex w="100%" justify="left" align="center">
      <Button
        size="xs"
        variant="default"
        onClick={handleClickSubmit}
        disabled={!isAbleToSave}
        aria-label="Save event description"
      >
        Save
      </Button>
      <Button
        size="xs"
        ml="8"
        mr="8"
        variant="default"
        onClick={() => setValue("")}
        disabled={value === ""}
        aria-label="Clear event description"
      >
        Clear
      </Button>
      <DismissButton
        xs
        clickHandler={handleDismiss}
        withoutModal
        aria-label="Cancel editing description"
      />
    </Flex>
  );

  /**
   * The right-aligned container for input buttons.
   */
  const inputButtonsRight = description && (
    <Flex className={classes.deleteContainer} justify="right" align="center">
      <DeleteButton
        clickHandler={handleDelete}
        aria-label="Delete event description"
      />
    </Flex>
  );

  /**
   * Renders a label indicating unsaved changes.
   */
  const UnsavedChangesLabel = () => (
    <Flex align="flex-end" w="90%" h="40">
      {hasUnsavedChanges && (
        <Flex mr="16" align="center" w="100%" justify="flex-start">
          <MdOutlineWarningAmber color="orange" />
          <Text ta="right" ml="8" size="xs" fs="italic">
            Unsaved changes
          </Text>
        </Flex>
      )}
    </Flex>
  );

  /**
   * Renders the input field for event description.
   *
   * @returns The JSX element representing the input field.
   */
  const input = (
    <Stack gap={1} w="90%">
      <UnsavedChangesLabel />
      <Textarea
        w="100%"
        mb="8"
        autosize
        maxRows={8}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Add an event description."
        aria-label="Event description input"
      />
      <Flex w="100%" justify="space-between">
        {inputButtonsLeft}
        {inputButtonsRight}
      </Flex>
    </Stack>
  );

  /**
   * Renders the EditLabel component.
   */
  const EditLabel = () => (
    <Flex
      align="center"
      justify="flex-end"
      w="100%"
      className={classes.editLabel}
    >
      <Text size="sm" fs="italic" ta="left">
        Event Description
      </Text>
      <EditButton
        clickHandler={() => setIsOpen(true)}
        aria-label="Edit event description"
      />
    </Flex>
  );

  /**
   * Represents the content of the event description.
   * If a value is provided, it displays the event description along with an edit button.
   * If no value is provided, it displays an "Add" button to add the event description.
   */
  const descriptionContent = value ? (
    <Stack w="100%" h="100%" gap={1}>
      <EditLabel />
      <Flex className={classes.descriptionBlock}>
        <Text className={classes.descriptionTextContainer}>
          {description
            ? description.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))
            : ""}
        </Text>
      </Flex>
    </Stack>
  ) : (
    <AddButton
      label="Details"
      clickHandler={() => setIsOpen(true)}
      aria-label="Add event description"
      m={[8, 0, 8, 0]}
    />
  );

  /**
   * Renders either the input form (if editing) or the event description.
   */
  return (
    <Flex
      w="100%"
      h="100%"
      align="flex-start"
      justify="center"
      style={{ maxWidth: "600px" }}
    >
      {isOpen ? input : descriptionContent}
    </Flex>
  );
}
