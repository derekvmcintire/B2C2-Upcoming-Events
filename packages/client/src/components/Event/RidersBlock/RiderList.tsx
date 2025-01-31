import { Divider, Flex, Stack, Text } from "@mantine/core";
import DismissButton from "../../Shared/DismissButton";
import classes from "../styles/event.module.css";

interface RiderListProps {
  riders: string[];
  removeFn: (rider: string) => void;
  label: string;
  isRegisteredList?: boolean;
}

export default function RiderList({
  riders,
  removeFn,
  label,
  isRegisteredList = false,
}: RiderListProps) {
  const textClass = isRegisteredList
    ? classes.registeredRiderText
    : classes.defaultRiderText;

  const formatName = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[1][0]}.`; // First name + Last initial
    }
    return name; // If there's only one name, return as is
  };

  return (
    <Stack gap={1} className={classes.riderListStack}>
      <Text className={classes.riderListLabel}>{`${riders.length} ${label}`}</Text>
      <Divider mb="8" w="100%" />
      {riders.length > 0 &&
        riders.map((rider: string) => (
          <div key={rider} className={classes.interestedRiderFlex}>
            <Flex justify="flex-start" align="center">
              <DismissButton
                xs
                clickHandler={() => removeFn(rider)}
                position="left"
              />
              <Text className={textClass} span fw="600">
                {formatName(rider)}
              </Text>
            </Flex>
          </div>
        ))}
    </Stack>
  );
}
