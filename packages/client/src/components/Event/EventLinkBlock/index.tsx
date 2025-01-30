import { Button, Card, Flex, Text } from '@mantine/core';
import classes from '../styles/event.module.css';

export default function EventLinksBlock() {
  const Label = () => (
    <Card className={classes.label}>
      <Text>Event Label</Text>
    </Card>
  )
    return (
        <Flex className={classes.linkBlock}>
          <Button>Link to Event</Button>
          <Label />
        </Flex>
    )
}
