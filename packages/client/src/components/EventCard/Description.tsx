import { Button, Flex, Stack, Text, Textarea } from "@mantine/core";
import EditButton from "../Shared/EditButton";
import AddButton from "../Shared/AddButton";
import { useState, useCallback, useMemo } from "react";
import { EventType } from "../../types";
import DismissButton from "../Shared/DismissButton";
import { MdOutlineWarningAmber } from "react-icons/md";

interface DescriptionProps {
  event: EventType;
  submitFn: (value: string) => void;
}

/**
 * A React component for displaying and editing an event description.
 * Provides a form to edit and save the event's description with real-time validation.
 *
 * @param {DescriptionProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Description component.
 */
export default function Description({
  event,
  submitFn,
}: DescriptionProps): JSX.Element {
  const { description = "" } = event;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(description);

  /**
   * Handles the submission of the updated description.
   * Calls the `submitFn` provided as a prop and closes the edit form.
   */
  const handleClickSubmit = useCallback(() => {
    submitFn(value);
    setIsOpen(false);
  }, [submitFn, value]);

  const hasUnsavedChanges = value !== description;
  const isAbleToSave = hasUnsavedChanges && value !== "";

  /**
   * Memoized JSX for the input form to edit the event description.
   */
  const input = useMemo(
    () => (
      <>
        <Textarea
          w="100%"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Add event details."
          aria-label="Event description input"
        />
        <Flex w="90%" justify="left">
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
            clickHandler={() => setIsOpen(false)}
            aria-label="Cancel editing description"
          />
        </Flex>
      </>
    ),
    [value, handleClickSubmit, isAbleToSave],
  );

  /**
   * Memoized JSX for displaying the event description or controls to edit/add it.
   */
  const descriptionContent = useMemo(
    () =>
      value ? (
        <Stack gap={1} align="flex-start" mt="16">
          {hasUnsavedChanges && (
            <Flex>
              <MdOutlineWarningAmber color="orange" />
              <Text ml="8" size="xs" fs="italic">
                Unsaved changes
              </Text>
            </Flex>
          )}
          <Flex align="center">
            <Text size="xs" fs="italic" ta="left">
              Event Details
            </Text>
            <EditButton
              clickHandler={() => setIsOpen(true)}
              aria-label="Edit event description"
            />
          </Flex>
          <Text ta="left">{description || ""}</Text>
        </Stack>
      ) : (
        <AddButton
          label="Details"
          clickHandler={() => setIsOpen(true)}
          aria-label="Add event description"
          m={[8, 0, 8, 0]}
        />
      ),
    [value, description, hasUnsavedChanges],
  );

  /**
   * Renders either the input form (if editing) or the event description.
   */
  return <>{isOpen ? input : descriptionContent}</>;
}
