import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DrawerContent from "./DrawerContent";
import { MdFormatAlignJustify } from "react-icons/md";
import classes from "./submit.module.css";

export default function SubmissionDrawer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close}>
        {/* Drawer content */}
        <DrawerContent />
      </Drawer>

      <Button
        className={classes.drawerButton}
        size="xl"
        variant="outline"
        onClick={open}
        leftSection={<MdFormatAlignJustify />}
      >
        Submit an Event
      </Button>
    </>
  );
}
