import { Progress, Text } from "@mantine/core";

interface HypometerProps {
  numberOfRiders: number
}
export default function Hypometer({
  numberOfRiders,
}: HypometerProps) {

  const hypeLevel = numberOfRiders * 10;

  const getHypeColor = () => {
    if (numberOfRiders > 10) return "red";
    if (numberOfRiders > 8) return "orange";
    if (numberOfRiders > 5) return "yellow";
    if (numberOfRiders > 3) return "green";
    if (numberOfRiders > 1) return "blue";
    return "purple";
  };
  
  return (
    <>
      <Text ta="left" mb="16">{`Hypometer Level ${hypeLevel}/100`}</Text>
      <Progress radius="xs" size="xl" value={hypeLevel} color={getHypeColor()} />
    </>
  );
}
