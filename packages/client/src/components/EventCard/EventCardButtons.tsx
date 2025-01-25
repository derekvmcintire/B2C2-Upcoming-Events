import { Button, Flex } from "@mantine/core";
import { MdAdd } from "react-icons/md";

interface EventCardButtonProps {
  hasHousingUrl: boolean;
  handleClickOpen: (action: "rider" | "url") => void;
}
export default function EventCardButtons({
  hasHousingUrl,
  handleClickOpen,
}: EventCardButtonProps) {
  return (
    <Flex justify="space-between" wrap="wrap">
      <Button
        variant="default"
        size="compact-sm"
        leftSection={<MdAdd size={14} />}
        onClick={() => handleClickOpen("rider")}
        m="8"
      >
        I'm interested
      </Button>
      {!hasHousingUrl && (
        <Button
          variant="default"
          size="compact-sm"
          leftSection={<MdAdd size={14} />}
          onClick={() => handleClickOpen("url")}
          m="8"
        >
          Housing
        </Button>
      )}
    </Flex>
  );
}
