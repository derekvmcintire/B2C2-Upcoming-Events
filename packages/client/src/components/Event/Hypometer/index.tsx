import { Box, Flex, Progress, Text } from "@mantine/core";
import { MdDeviceThermostat } from "react-icons/md";
import { getHypeColor, getHypeLevel } from "../../../utils/hype";

interface HypometerProps {
  numberOfRegisteredRiders: number;
  numberOfInterestedRiders: number;
  numberOfCommittedRiders?: number;
}

/**
 * A React component that calculates and displays the "hype level"
 * based on the number of riders. The hype level is visually represented
 * with a progress bar and dynamically colored based on the hype intensity.
 *
 * @param {HypometerProps} props - The props for the Hypometer component.
 * @returns {JSX.Element} The rendered Hypometer component.
 */
export default function Hypometer({
  numberOfRegisteredRiders,
  numberOfInterestedRiders,
  numberOfCommittedRiders = 0,
}: HypometerProps): JSX.Element {
  const hypeLevel: number = getHypeLevel(
    numberOfRegisteredRiders,
    numberOfInterestedRiders,
    numberOfCommittedRiders,
  );

  /**
   * Renders the hype level as text and a progress bar with dynamic coloring.
   */
  return (
    <Box mt="24">
      <Flex align="flex-start">
        <MdDeviceThermostat />
        <Text ta="left" mb="16">{`Hypometer Level ${hypeLevel}/100`}</Text>
      </Flex>
      <Progress
        data-testid="hype"
        radius="xs"
        size="xl"
        value={hypeLevel}
        color={getHypeColor(hypeLevel)}
      />
    </Box>
  );
}
