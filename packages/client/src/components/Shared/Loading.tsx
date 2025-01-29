import { Flex } from "@mantine/core";
import classes from "./shared.module.css";

export default function Loading() {
  return (
    <Flex>
      <div data-testid="loading" className={classes.loading}>
        Loading...
      </div>
    </Flex>
  );
}
