import React from "react";
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

export const CarpoolForm: React.FC<CarpoolFormProps> = ({
  newCarName,
  newCarSeats,
  errors,
  isUpdating,
  setNewCarName,
  setNewCarSeats,
  addCar,
}) => {
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
