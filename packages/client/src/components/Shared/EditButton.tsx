import { Button } from "@mantine/core";
import classes from "./remove-button.module.css";
import { MdCreate } from "react-icons/md";

type EditButtonProps = {
  clickHandler: () => void;
};

/**
 * EditButton Component
 *
 * Renders a small button containing a pencil icon, used for editing existing fields
 *
 * @param {EditButtonProps} props
 */
export default function EditButton({ clickHandler }: EditButtonProps) {
  return (
    <Button
      className={classes.xButton}
      onClick={clickHandler}
      variant="transparent"
      size="compact-sm"
    >
      <MdCreate />
    </Button>
  );
}
