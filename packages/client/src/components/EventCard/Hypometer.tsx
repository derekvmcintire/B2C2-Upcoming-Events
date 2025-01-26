import { Progress, Text } from "@mantine/core";

interface HypometerProps {
  numberOfRiders: number;
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
  numberOfRiders,
}: HypometerProps): JSX.Element {
  const hypeLevel: number = numberOfRiders * 10;

  /**
   * Determines the color of the progress bar based on the number of riders.
   *
   * @returns {string} The color name for the progress bar.
   */
  const getHypeColor = (): string => {
    if (numberOfRiders > 10) return "red";
    if (numberOfRiders > 8) return "orange";
    if (numberOfRiders > 5) return "yellow";
    if (numberOfRiders > 3) return "green";
    if (numberOfRiders > 1) return "blue";
    return "purple";
  };

  /**
   * Renders the hype level as text and a progress bar with dynamic coloring.
   */
  return (
    <>
      <Text ta="left" mb="16">{`Hypometer Level ${hypeLevel}/100`}</Text>
      <Progress
        radius="xs"
        size="xl"
        value={hypeLevel}
        color={getHypeColor()}
      />
    </>
  );
}
