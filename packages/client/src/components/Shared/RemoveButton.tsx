import { Button } from "@mantine/core";
import classes from "./remove-button.module.css";
import { MdClose } from "react-icons/md";

type RemoveButtonProps = {
  clickHandler: () => void;
};

export default function RemoveButton({ clickHandler }: RemoveButtonProps) {
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
