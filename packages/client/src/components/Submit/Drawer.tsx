import { Button, Drawer, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DrawerContent from "./DrawerContent";
import { MdFormatAlignJustify } from "react-icons/md";
import classes from "./submit.module.css";

export default function SubmissionDrawer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex>
      <Drawer opened={opened} onClose={close}>
        {/* Drawer content */}
        <DrawerContent />
      </Drawer>

      <Button
        data-testid="sub-drawer-button"
        className={classes.drawerButton}
        size="md"
        variant="outline"
        onClick={open}
        leftSection={<MdFormatAlignJustify />}
      >
        <Text className={classes.drawerButton}>Submit an Event</Text>
      </Button>
    </Flex>
  );
}
