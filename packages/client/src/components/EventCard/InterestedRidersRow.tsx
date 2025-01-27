import { Flex, Grid, Text } from "@mantine/core";
import classes from "./event.module.css";
import DismissButton from "../Shared/DismissButton";
import { MOBILE_BREAK_POINT } from "../../constants";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback } from "react";

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
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const numberOfRidersInterested = riders.length;
  const interestedLabelText =
    numberOfRidersInterested === 1
      ? `${numberOfRidersInterested} Rider Interested: `
      : `${numberOfRidersInterested} Riders Interested: `;

  const label = (
    <Flex justify={isMobile ? "flex-start" : "flex-end"} align="flex-end">
      <Text size="lg" fw="300" fs="italic" className={classes.registeredLabel}>
        {numberOfRidersInterested > 0 && interestedLabelText}
      </Text>
    </Flex>
  );

  const handleRemoveRider = useCallback(
    (rider: string) => removeRider(rider),
    [removeRider],
  );

  const content = (
    <>
      {numberOfRidersInterested > 0 &&
        riders.map((rider: string) => (
          <div key={rider} className={classes.interestedRiderFlex}>
            <Flex justify="flex-start" align="flex-end">
              <DismissButton clickHandler={() => handleRemoveRider(rider)} />
              <Text span fw="600" className={classes.interestedRiderText}>
                {rider}
              </Text>
            </Flex>
          </div>
        ))}
    </>
  );

  return (
    <>
      <Grid.Col span={isMobile ? 0 : 4}>{!isMobile && label}</Grid.Col>
      <Grid.Col
        p="16"
        span={isMobile ? 12 : 8}
        className={classes.lightSection}
      >
        <>
          {isMobile && label}
          {content}
        </>
      </Grid.Col>
    </>
  );
}
