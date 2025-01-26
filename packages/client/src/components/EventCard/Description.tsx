import { Button, Flex, Text, Textarea } from "@mantine/core";
import EditButton from "../Shared/EditButton";
import AddButton from "../Shared/AddButton";
import { useState } from "react";
import { EventType } from "../../types";

interface DescriptionProps {
  event: EventType;
  submitFn: (value: string) => void;
}
export default function Description({ event, submitFn }: DescriptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  console.log(event);

  const handleClickSubmit = () => {
    submitFn(value);
    setIsOpen(false);
  };

  const input = (
    <>
      <Textarea
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Add an event description"
      />
      <Button size="xs" variant="default" onClick={handleClickSubmit}>
        Save
      </Button>
    </>
  );

  const descriptionContent = value ? (
    <Flex>
      <Text ta="left">{value}</Text>
      <EditButton
        clickHandler={() => {
          setIsOpen(true);
        }}
      />
    </Flex>
  ) : (
    <AddButton
      label="Description"
      clickHandler={() => {
        setIsOpen(true);
      }}
    />
  );

  return <>{isOpen ? input : descriptionContent}</>;
}
