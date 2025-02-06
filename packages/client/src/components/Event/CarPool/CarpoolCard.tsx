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
import { MdArrowForward } from "react-icons/md";
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

/**
 * Renders a card component for a carpool event.
 *
 * @param car - The car object containing car details.
 * @param riderInput - The input value for the rider's name.
 * @param isUpdating - A flag indicating whether the carpool is being updated.
 * @param onDeleteCar - The function to handle deleting the car.
 * @param onClaimSeat - The function to handle claiming a seat in the car.
 * @param onLeaveRide - The function to handle leaving the carpool ride.
 * @param onRiderInputChange - The function to handle changes in the rider input.
 * @returns The JSX element representing the carpool card.
 */
export const CarpoolCard = ({
  car,
  riderInput,
  isUpdating,
  onDeleteCar,
  onClaimSeat,
  onLeaveRide,
  onRiderInputChange,
}: CarpoolCardProps): JSX.Element => {
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
