import { TextInput, NumberInput, Button, Card, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";

interface CarpoolFormProps {
  newCarName: string;
  newCarSeats: number;
  errors: { carName?: string; carSeats?: string };
  isUpdating: boolean;
  setNewCarName: (name: string) => void;
  setNewCarSeats: (seats: number) => void;
  addCar: () => void;
}

/**
 * CarpoolForm component for adding a new car to the carpool.
 *
 * @param newCarName - The name of the new car.
 * @param newCarSeats - The number of seats in the new car.
 * @param errors - Object containing error messages for car name and car seats.
 * @param isUpdating - Flag indicating if the form is currently updating.
 * @param setNewCarName - Function to set the new car name.
 * @param setNewCarSeats - Function to set the number of seats in the new car.
 * @param addCar - Function to add the new car to the carpool.
 * @returns The CarpoolForm component.
 */
export const CarpoolForm = ({
  newCarName,
  newCarSeats,
  errors,
  isUpdating,
  setNewCarName,
  setNewCarSeats,
  addCar,
}: CarpoolFormProps): JSX.Element => {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  return (
    <Card withBorder>
      <Flex
        direction={isMobile ? "column" : "row"}
        gap="md"
        align={isMobile ? "stretch" : "flex-end"}
      >
        <TextInput
          value={newCarName}
          onChange={(e) => setNewCarName(e.currentTarget.value)}
          error={errors.carName}
          placeholder="Car Name"
          style={{ flex: 1 }}
          disabled={isUpdating}
        />
        <NumberInput
          value={newCarSeats}
          onChange={(value) => setNewCarSeats(Number(value))}
          error={errors.carSeats}
          min={1}
          style={{ flex: 1 }}
        />
        <Button onClick={addCar} disabled={isUpdating}>
          Add Car
        </Button>
      </Flex>
    </Card>
  );
};
