import { Badge } from "@mantine/core";
import classes from "../styles/event.module.css";
import { LabelConfig } from "../../../types";

interface LabelProps {
  labelConfig: LabelConfig;
  xs?: boolean;
  noText?: boolean;
}
export default function EventLabel({
  labelConfig,
  xs = false,
  noText = false,
}: LabelProps) {
  return (
    <Badge
      color={labelConfig.color}
      size={xs ? "xs" : "lg"}
      className={classes.eventLabel}
    >
      {!noText && labelConfig.text}
    </Badge>
  );
}
