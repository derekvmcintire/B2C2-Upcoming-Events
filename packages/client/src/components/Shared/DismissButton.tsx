import { useDisclosure } from "@mantine/hooks";
import { Button, Flex, Modal, Stack, Text } from "@mantine/core";
import classes from "./shared.module.css";
import { MdClose } from "react-icons/md";

type DismissButtonProps = {
  clickHandler: () => void;
  withoutModal?: boolean;
  xs?: boolean;
  disabled?: boolean;
  position?: "right" | "left";
};

/**
 * DismissButton component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.clickHandler - The click handler function.
 * @param {boolean} [props.withoutModal=false] - Flag indicating whether to show the modal or not.
 * @returns {JSX.Element} The DismissButton component.
 */
export default function DismissButton({
  clickHandler,
  withoutModal = false,
  xs = false,
  disabled = false,
  position = "right",
}: DismissButtonProps): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClick = () => (withoutModal ? clickHandler() : open());

  const handleClickYes = () => {
    close();
    clickHandler();
  };

  const size = xs ? "compact-xs" : "compact-s";

  return (
    <>
      <Modal opened={opened} onClose={close} title="Dismiss">
        {/* Modal content */}
        <Stack w="100%" align="center">
          <Text>Are you sure you want to do that?</Text>
          <Flex w="100%" justify="center">
            <Button m="16" onClick={close}>
              Nope!
            </Button>
            <Button m="16" onClick={handleClickYes}>
              Yes, I do want to do that.
            </Button>
          </Flex>
        </Stack>
      </Modal>
      <Button
        className={classes.xButton}
        onClick={handleClick}
        variant="subtle"
        size={size}
        disabled={disabled}
        mr={position === "left" ? "0" : "8"}
      >
        <MdClose />
      </Button>
    </>
  );
}
