import { Badge } from "@mantine/core";
import classes from "../styles/event.module.css";
import { Label } from "../../../types";

interface LabelProps {
  labelConfig: Label;
  xs?: boolean;
}
export default function EventLabel({ labelConfig, xs = false }: LabelProps) {
  return (
    <Badge
      color={labelConfig.color}
      size={xs ? "xs" : "lg"}
      className={classes.eventLabel}
    >
      {labelConfig.text}
    </Badge>
  );
}
