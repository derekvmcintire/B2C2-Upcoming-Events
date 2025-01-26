import { Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";

type AddButtonProps = {
  label: string;
  clickHandler: () => void;
  m?: number[]; // margin [top, right, bottom, left]
};

/**
 * AddButton Component
 *
 * Renders a small button containing a plus icon, used for adding content
 *
 * @param {AddButtonProps} props
 */
export default function AddButton({
  label,
  clickHandler,
  m = [8, 8, 8, 8],
}: AddButtonProps) {
  return (
    <Button
      variant="default"
      size="compact-sm"
      leftSection={<MdAdd size={14} />}
      onClick={clickHandler}
      mt={m[0]}
      mr={m[1]}
      mb={m[2]}
      ml={m[3]}
    >
      {label}
    </Button>
  );
}
