import { Paper } from "@mantine/core";

interface DraggableRiderProps {
  name: string;
}

const DraggableRider = ({ name }: DraggableRiderProps): JSX.Element => {
  return (
    <Paper
      shadow="sm"
      p="xs"
      withBorder
      styles={() => ({
        root: {
          cursor: "grabbing",
          userSelect: "none",
          fontSize: "0.875rem",
        },
      })}
    >
      {name}
    </Paper>
  );
};

export default DraggableRider;
