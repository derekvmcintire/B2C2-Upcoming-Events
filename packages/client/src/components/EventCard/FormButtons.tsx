import { Button, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback } from "react";
import { MdAdd } from "react-icons/md";
import { MOBILE_BREAK_POINT } from "../../constants";

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
export default function FormButtons({
  hasHousingUrl,
  handleClickOpen,
}: EventCardButtonProps): JSX.Element {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  /**
   * Handles the click event for opening the "rider" form.
   */
  const handleClickOpenRider = useCallback(
    () => handleClickOpen("rider"),
    [handleClickOpen],
  );

  /**
   * Handles the click event for opening the housing URL.
   */
  const handleClickOpenHousingUrl = useCallback(
    () => handleClickOpen("url"),
    [handleClickOpen],
  );

  /**
   * Renders a button component for expressing interest in the event.
   * The button appearance and behavior may vary based on the device type.
   */
  const InterestedRiderButton = () =>
    isMobile ? (
      <Button
        variant="transparent"
        size="compact-xs"
        leftSection={<MdAdd size={14} />}
        onClick={handleClickOpenRider}
        m="8"
      >
        Interested
      </Button>
    ) : (
      <Button
        variant="default"
        size="compact-sm"
        leftSection={<MdAdd size={14} />}
        onClick={handleClickOpenRider}
        m="8"
      >
        I'm interested
      </Button>
    );

  /**
   * Renders the Housing button.
   * @returns The rendered Housing button component.
   */
  const HousingButton = () =>
    isMobile ? (
      <Button
        variant="transparent"
        size="compact-xs"
        leftSection={<MdAdd size={14} />}
        onClick={handleClickOpenHousingUrl}
        m="8"
      >
        Housing
      </Button>
    ) : (
      <Button
        variant="default"
        size="compact-sm"
        leftSection={<MdAdd size={14} />}
        onClick={handleClickOpenHousingUrl}
        m="8"
      >
        Housing
      </Button>
    );

  const justifiedValue = isMobile ? "center" : "flex-end";

  return (
    <Flex w="100%" pr="16" justify={justifiedValue} wrap="wrap">
      <InterestedRiderButton />
      {!hasHousingUrl && <HousingButton />}
    </Flex>
  );
}
