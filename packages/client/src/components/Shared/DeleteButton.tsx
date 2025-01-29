import { Button, Flex, Modal, Stack, Text } from "@mantine/core";
import classes from "./shared.module.css";
import { MdDeleteForever } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";

type DeleteButtonProps = {
  clickHandler: () => void;
};

/**
 * A button component used for deleting items.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.clickHandler - The click event handler for the delete button.
 * @returns {JSX.Element} The rendered DeleteButton component.
 */
export default function DeleteButton({ clickHandler }: DeleteButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClick = () => {
    open();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete">
        {/* Modal content */}
        <Stack w="100%" align="center">
          <Text>Are you sure you want to do that?</Text>
          <Flex w="100%" justify="center">
            <Button m="16" onClick={close}>
              Nope!
            </Button>
            <Button m="16" onClick={clickHandler}>
              Yes, I do want to do that.
            </Button>
          </Flex>
        </Stack>
      </Modal>
      <Button
        className={classes.xButton}
        onClick={handleClick}
        variant="subtle"
        size="compact-sm"
      >
        <MdDeleteForever />
      </Button>
    </>
  );
}
