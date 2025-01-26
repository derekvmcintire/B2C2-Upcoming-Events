import { Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";

type AddButtonProps = {
  label: string;
  clickHandler: () => void;
};

/**
 * AddButton Component
 *
 * Renders a small button containing a plus icon, used for adding content
 *
 * @param {AddButtonProps} props
 */
export default function AddButton({ label, clickHandler }: AddButtonProps) {
  return (
    <Button
      variant="default"
      size="compact-sm"
      leftSection={<MdAdd size={14} />}
      onClick={clickHandler}
      m="8"
    >
      {label}
    </Button>
  );
}
