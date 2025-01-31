import { Button } from "@mantine/core";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import classes from "./shared.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

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
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const buttonIcon = opened ? (
    <MdKeyboardArrowDown />
  ) : (
    <MdKeyboardArrowRight />
  );

  const size = isMobile ? "xs" : "md";
  return (
    <Button
      ta="left"
      radius="0"
      size={size}
      leftSection={buttonIcon}
      className={classes.listCollapseButton}
      variant="transparent"
      w="100%"
      onClick={toggleFn}
    >
      {label}
    </Button>
  );
}
