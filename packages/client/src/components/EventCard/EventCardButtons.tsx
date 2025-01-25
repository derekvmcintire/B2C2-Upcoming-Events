import { Button, Flex } from "@mantine/core";
import { MdAdd } from "react-icons/md";

interface EventCardButtonProps {
  hasHousingUrl: boolean;
  isSubmitting: boolean;
  handleClickOpen: (action: "rider" | "url") => void;
}
export default function EventCardButtons({
  hasHousingUrl,
  isSubmitting,
  handleClickOpen,
}: EventCardButtonProps) {
  return (
    <Flex justify="space-between">
      <Button
        variant="default"
        leftSection={<MdAdd size={14} />}
        disabled={isSubmitting}
        onClick={() => handleClickOpen("rider")}
        m="16"
      >
        Add Interested Rider
      </Button>
      {!hasHousingUrl && (
        <Button
          variant="default"
          leftSection={<MdAdd size={14} />}
          disabled={isSubmitting}
          onClick={() => handleClickOpen("url")}
          m="16"
        >
          Add Link to Housing
        </Button>
      )}
    </Flex>
  );
}
