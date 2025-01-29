import { Flex } from '@mantine/core';
import classes from "./shared.module.css";


export default function Loading() {
    return (
        <Flex data-testid="loading">
          <div data-testid="events-list"className={classes.loading}>Loading...</div>
        </Flex>
    )
}
