import { Badge } from "@mantine/core";
import classes from "../styles/event.module.css";
import { Label } from "../../../types";

interface LabelProps {
  labelConfig: Label;
}
export default function EventLabel({ labelConfig }: LabelProps) {
  return (
    <Badge
      color={labelConfig.color}
      radius="xs"
      size="xl"
      className={classes.eventLabel}
    >
      {labelConfig.text}
    </Badge>
  );
}
