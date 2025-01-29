import { Flex, Progress, Text } from "@mantine/core";
import { getHypeColor, getHypeLevel } from "../../utils/hype";
import { MdDeviceThermostat } from "react-icons/md";

interface HypometerProps {
  numberOfRegisteredRiders: number;
  numberOfInterestedRiders: number;
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
}: HypometerProps): JSX.Element {
  const hypeLevel: number = getHypeLevel(
    numberOfRegisteredRiders,
    numberOfInterestedRiders,
  );

  /**
   * Renders the hype level as text and a progress bar with dynamic coloring.
   */
  return (
    <div data-testid="hype">
      <Flex align="flex-start">
        <MdDeviceThermostat />
        <Text ta="left" mb="16">{`Hypometer Level ${hypeLevel}/100`}</Text>
      </Flex>
      <Progress
        radius="xs"
        size="xl"
        value={hypeLevel}
        color={getHypeColor(hypeLevel)}
      />
    </div>
  );
}
