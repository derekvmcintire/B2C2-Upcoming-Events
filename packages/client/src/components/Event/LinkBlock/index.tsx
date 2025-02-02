import { Button, Flex } from "@mantine/core";
import classes from "../styles/event.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";

/**
 * Renders a link block component for an event.
 */
export default function LinkBlock() {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const alignment = isMobile ? "center" : "right";

  const buttonSize = isMobile ? "compact-xs" : "compact-sm";

  return (
    <Flex className={classes.linkBlock} justify={alignment} align="center">
      <Button size={buttonSize}>Link to Event</Button>
    </Flex>
  );
}
