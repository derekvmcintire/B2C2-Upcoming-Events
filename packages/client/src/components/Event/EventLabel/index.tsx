import { Badge } from "@mantine/core";
import classes from "../styles/event.module.css";
import { Label } from "../../../types";
// import { useEventContext } from "../../../context/event-context";

interface LabelProps {
  label: Label;
}
export default function EventLabel({ label }: LabelProps) {
  // const eventContext = useEventContext();
  // const { event } = eventContext;
  // const { label = "race" } = event;

  return (
    <Badge
      color={label.color}
      radius="xs"
      size="xl"
      className={classes.eventLabel}
    >
      {label.text}
    </Badge>
  );
}
