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

  return (
    <Stack gap={0} className={classes.riderListStack}>
      <Text ta="left">{`${riders.length} ${label}`}</Text>
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
              <Text className={textClass} ta="left" span fw="600">
                {rider}
              </Text>
            </Flex>
          </div>
        ))}
    </Stack>
  );
}
