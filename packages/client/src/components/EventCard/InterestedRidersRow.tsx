import { Flex, Grid, Text } from "@mantine/core";
import classes from "./event.module.css";
import DismissButton from "../Shared/DismissButton";

type InterestedRidersRowProps = {
  riders: string[];
  removeRider: (rider: string) => void;
};

/**
 * InterestedRidersRow Component
 *
 * Renders a row that contains a list of riders that are interested in this event
 *
 * @param {InterestedRidersRowProps} props
 */
export default function InterestedRidersRow({
  riders,
  removeRider,
}: InterestedRidersRowProps) {
  const numberOfRidersInterested = riders.length;
  const interestedLabelText =
    numberOfRidersInterested === 1
      ? `${numberOfRidersInterested} Rider Interested: `
      : `${numberOfRidersInterested} Riders Interested: `;

  return (
    <>
      <Grid.Col span={4}>
        <Flex justify="flex-end" align="flex-end">
          <Text
            size="lg"
            fw="600"
            fs="italic"
            className={classes.registeredLabel}
          >
            {numberOfRidersInterested > 0 && interestedLabelText}
          </Text>
        </Flex>
      </Grid.Col>
      <Grid.Col span={8}>
        <Flex justify="flex-start" align="flex-end">
          {numberOfRidersInterested > 0 &&
            riders.map((rider: string) => (
              <div key={rider}>
                <DismissButton clickHandler={() => removeRider(rider)} />
                <Text
                  span
                  size="lg"
                  fw="600"
                  className={classes.interestedRiderText}
                >
                  {rider}
                </Text>
              </div>
            ))}
        </Flex>
      </Grid.Col>
    </>
  );
}
