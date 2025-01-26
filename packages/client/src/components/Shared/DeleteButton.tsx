import { Button } from "@mantine/core";
import classes from "./remove-button.module.css";
import { MdDeleteForever } from "react-icons/md";

type DeleteButtonProps = {
  clickHandler: () => void;
};

/**
 * DeleteButton Component
 *
 * Renders a small button containing a pencil icon, used for deleteing existing fields
 *
 * @param {DeleteButtonProps} props
 */
export default function DeleteButton({ clickHandler }: DeleteButtonProps) {
  return (
    <Button
      className={classes.xButton}
      onClick={clickHandler}
      variant="subtle"
      size="compact-sm"
    >
      <MdDeleteForever />
    </Button>
  );
}
