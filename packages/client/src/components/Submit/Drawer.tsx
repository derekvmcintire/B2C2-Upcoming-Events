import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DrawerContent from "./DrawerContent";
import { MdFormatAlignJustify } from "react-icons/md";

export default function SubmissionDrawer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close}>
        {/* Drawer content */}
        <DrawerContent />
      </Drawer>

      <Button
        c="white"
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
