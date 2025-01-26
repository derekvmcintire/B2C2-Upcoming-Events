import { Button, Flex } from "@mantine/core";
import { MdAdd } from "react-icons/md";

interface EventCardButtonProps {
  hasHousingUrl: boolean;
  handleClickOpen: (action: "rider" | "url") => void;
}
/**
 * Renders the buttons for the EventCard component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.hasHousingUrl - Indicates whether the event has a housing URL.
 * @param {Function} props.handleClickOpen - The click event handler for opening a dialog.
 * @returns {JSX.Element} The rendered component.
 */
export default function EventCardButtons({
  hasHousingUrl,
  handleClickOpen,
}: EventCardButtonProps): JSX.Element {
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
