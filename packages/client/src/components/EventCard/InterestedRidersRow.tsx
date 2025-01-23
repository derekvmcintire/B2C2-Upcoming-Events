import { Flex, Grid, Text } from '@mantine/core';
import classes from './event.module.css';

export default function InterestedRidersRow({ riders }: { riders: string[]}) {
  const numberOfRidersInterested = riders.length;
  const interestedLabelText = numberOfRidersInterested === 1 ? `${numberOfRidersInterested} Rider Interested: ` : `${numberOfRidersInterested} Riders Interested: `

    return (
      <>
        <Grid.Col span={4}>
        <Flex justify="flex-end" align="flex-end">
          <Text size="lg" fw="600" fs="italic" className={classes.registeredLabel}>
            {numberOfRidersInterested > 0 && interestedLabelText}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={8}>
        <Flex justify="flex-start" align="flex-end">
              <Text
                size="lg"
                fw="600"
                className={classes.registeredLabel}
              >
                {numberOfRidersInterested > 0 ? riders.join(', ') : ("No B2C2 Riders Reg'd")}
              </Text>
            </Flex>
        </Grid.Col>
      </>
    )
}
