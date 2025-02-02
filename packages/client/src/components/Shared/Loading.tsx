import { Flex } from "@mantine/core";
import classes from "./shared.module.css";

/**
 * Renders a loading component.
 * @returns The loading component.
 */
export default function Loading() {
  return (
    <Flex>
      <div data-testid="loading" className={classes.loading}>
        Loading...
      </div>
    </Flex>
  );
}
