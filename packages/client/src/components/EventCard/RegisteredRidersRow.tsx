import { Flex, Grid, Text } from "@mantine/core";
import classes from "./event.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

type RegisteredRidersRowProps = {
  registeredNames?: string[];
};

/**
 * RegisteredRidersRow Component
 *
 * Renders a row that contains a list of riders that are registered for this event
 *
 * @param {RegisteredRidersRowProps} props
 */
export default function RegisteredRidersRow({
  registeredNames = [],
}: RegisteredRidersRowProps) {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const numberOfRidersRegistered = registeredNames.length;
  const registeredLabelText =
    numberOfRidersRegistered === 1
      ? `${numberOfRidersRegistered} B2C2 Rider Reg'd: `
      : `${numberOfRidersRegistered} B2C2 Riders Reg'd: `;

  const contentClassName =
    numberOfRidersRegistered > 0
      ? classes.registeredName
      : classes.registeredLabel;

  /**
   * Renders the label component for the registered riders row.
   *
   * @returns The JSX element representing the label component.
   */
  const label = (
    <Flex justify={isMobile ? "flex-start" : "flex-end"} align="flex-end">
      <Text className={classes.registeredLabel}>
        {numberOfRidersRegistered > 0 && registeredLabelText}
      </Text>
    </Flex>
  );

  /**
   * Renders the content of the RegisteredRidersRow component.
   *
   * @returns The JSX element representing the content.
   */
  const content = (
    <Flex justify="flex-start" align="flex-end">
      <Text className={contentClassName}>
        {numberOfRidersRegistered > 0
          ? registeredNames.join(", ")
          : "No B2C2 Riders Reg'd"}
      </Text>
    </Flex>
  );

  return (
    <>
      <Grid.Col span={isMobile ? 0 : 4}>{!isMobile && label}</Grid.Col>
      <Grid.Col span={isMobile ? 12 : 8}>
        <>
          {isMobile && label}
          {content}
        </>
      </Grid.Col>
    </>
  );
}
