import { Button, Flex } from '@mantine/core';
import classes from '../styles/event.module.css';

export default function EventLinksBlock() {

    return (
        <Flex className={classes.linkBlock} justify="flex-end" align="center">
          <Button size="md">Link to Event</Button>
        </Flex>
    )
}
