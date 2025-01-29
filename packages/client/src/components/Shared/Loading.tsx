import { Flex } from "@mantine/core";
import classes from "./shared.module.css";

export default function Loading() {
  return (
    <div data-testid="loading" className={classes.loading}>
      Loading...
    </div>
  );
}
