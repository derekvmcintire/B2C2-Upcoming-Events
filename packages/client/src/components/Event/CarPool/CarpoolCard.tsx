import React from "react";
import {
  Card,
  Stack,
  Group,
  Flex,
  Text,
  TextInput,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { MdClose, MdArrowForward } from "react-icons/md";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";
import DismissButton from "../../Shared/DismissButton";

interface CarpoolCardProps {
  car: {
    name: string;
    seats: number;
    riders: string[];
  };
  riderInput: string;
  isUpdating: boolean;
  onDeleteCar: () => void;
  onClaimSeat: () => void;
  onLeaveRide: (rider: string) => void;
  onRiderInputChange: (value: string) => void;
}

export const CarpoolCard: React.FC<CarpoolCardProps> = ({
  car,
  riderInput,
  isUpdating,
  onDeleteCar,
  onClaimSeat,
  onLeaveRide,
  onRiderInputChange,
}) => {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const isCarFull = car.riders.length >= car.seats;

  return (
    <Card
      withBorder
      style={{
        flex: isMobile ? "0 1 100%" : "0 1 calc(33.333% - 16px)",
        minWidth: 200,
        border: isCarFull ? "1px solid #ff8a65" : "",
      }}
    >
      <Stack align="left">
        <Group justify="left">
          <Flex w="100%" align="center">
            <DismissButton
              xs
              position="left"
              clickHandler={onDeleteCar}
              disabled={isUpdating}
            />
            <Text size="lg" fw={700}>
              {car.name}
            </Text>
          </Flex>
          <Divider />
          <Text ta="left">
            {!isCarFull ? "Seats:" : "Car Full:"} {car.riders.length}/
            {car.seats}
          </Text>
        </Group>

        {!isCarFull && (
          <Group>
            <TextInput
              style={{ flex: 1, maxWidth: "150px" }}
              placeholder="Enter your name"
              value={riderInput}
              onChange={(e) => onRiderInputChange(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onClaimSeat();
                }
              }}
              disabled={isCarFull || isUpdating}
            />
            <ActionIcon
              variant="filled"
              size="md"
              onClick={onClaimSeat}
              disabled={!riderInput || isCarFull || isUpdating}
            >
              <MdArrowForward />
            </ActionIcon>
          </Group>
        )}

        <Group>
          {car.riders.map((rider) => (
            <Group key={rider} gap="xs" align="center">
              <Text>{rider}</Text>
              <DismissButton xs clickHandler={() => onLeaveRide(rider)} />
            </Group>
          ))}
        </Group>
      </Stack>
    </Card>
  );
};
