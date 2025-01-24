import { Button } from "@mantine/core";
import classes from "./remove-button.module.css";
import { MdClose } from "react-icons/md";

type DismissButtonProps = {
  clickHandler: () => void;
};

/**
 * DismissButton Component
 *
 * Renders a small button containing an X icon, used for dismissal
 *
 * @param {DismissButtonProps} props
 */
export default function DismissButton({ clickHandler }: DismissButtonProps) {
  return (
    <Button
      className={classes.xButton}
      onClick={clickHandler}
      variant="subtle"
      size="compact-sm"
    >
      <MdClose />
    </Button>
  );
}
