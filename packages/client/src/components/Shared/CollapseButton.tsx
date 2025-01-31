import { Button, Flex, Text } from "@mantine/core";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import classes from "./shared.module.css";

interface CollapseButtonProps {
  label: string;
  opened: boolean;
  toggleFn: () => void;
}

export default function CollapseButton({
  label,
  opened,
  toggleFn,
}: CollapseButtonProps) {
  const buttonIcon = opened ? (
    <MdKeyboardArrowDown />
  ) : (
    <MdKeyboardArrowRight />
  );

  return (
    <Button
      ta="left"
      radius="0"
      leftSection={buttonIcon}
      className={classes.listCollapseButton}
      variant="transparent"
      w="100%"
      onClick={toggleFn}
    >
      <Flex justify="flex-start" align="flex-end">
        <Text size="lg" fw="300" fs="italic" className={classes.collapseLabel}>
          {label}
        </Text>
      </Flex>
    </Button>
  );
}
