import { useState } from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Card,
  Group,
  Stack,
  Text,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MdClose, MdCheck } from "react-icons/md";
import { MOBILE_BREAK_POINT } from "../../../constants";
import SubTitle from "../../Shared/SubTitle";

export type Carpool = {
  id: string;
  name: string;
  seats: number;
  riders: string[];
};

export default function CarpoolManager() {
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [newCarName, setNewCarName] = useState("");
  const [newCarSeats, setNewCarSeats] = useState<number>(0);
  const [riderInputs, setRiderInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{
    carName?: string;
    carSeats?: string;
  }>({});

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const validateCarForm = () => {
    const newErrors: typeof errors = {};

    // Validate car name
    if (!newCarName.trim()) {
      newErrors.carName = "Car name is required";
    } else if (
      carpools.some(
        (car) => car.name.toLowerCase() === newCarName.toLowerCase(),
      )
    ) {
      newErrors.carName = "A car with this name already exists";
    }

    // Validate car seats
    if (newCarSeats <= 0) {
      newErrors.carSeats = "Seats must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addCar = () => {
    if (validateCarForm()) {
      const newCar: Carpool = {
        id: `car-${Date.now()}`,
        name: newCarName.trim(),
        seats: newCarSeats,
        riders: [],
      };

      setCarpools((prev) => [...prev, newCar]);
      setNewCarName("");
      setNewCarSeats(0);
      setErrors({});
    }
  };

  const deleteCar = (carId: string) => {
    setCarpools((prev) => prev.filter((car) => car.id !== carId));
  };

  const claimSeat = (carId: string) => {
    const riderName = riderInputs[carId]?.trim() || "";

    if (!riderName) {
      return;
    }

    setCarpools((prev) =>
      prev.map((car) => {
        if (car.id === carId) {
          // Check if rider already exists in any car
          const isRiderAlreadyInAnyCar = carpools.some((c) =>
            c.riders.includes(riderName),
          );

          if (isRiderAlreadyInAnyCar) {
            return car;
          }

          // Check if there are available seats
          if (car.riders.length >= car.seats) {
            return car;
          }

          return {
            ...car,
            riders: [...car.riders, riderName],
          };
        }
        return car;
      }),
    );

    // Clear the rider input for this car
    setRiderInputs((prev) => ({ ...prev, [carId]: "" }));
  };

  const leaveRide = (carId: string, riderToRemove: string) => {
    setCarpools((prev) =>
      prev.map((car) =>
        car.id === carId
          ? {
              ...car,
              riders: car.riders.filter((rider) => rider !== riderToRemove),
            }
          : car,
      ),
    );
  };

  const handleRiderInputChange = (carId: string, value: string) => {
    setRiderInputs((prev) => ({
      ...prev,
      [carId]: value,
    }));
  };

  return (
    <Stack gap="md" style={{ width: "80%", margin: "0 auto" }}>
      <SubTitle text="Carpool" ta="center" />
      {/* Car Creation Form */}
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
          />
          <NumberInput
            value={newCarSeats}
            onChange={(value) => setNewCarSeats(Number(value))}
            error={errors.carSeats}
            min={1}
            style={{ flex: 1 }}
          />
          <Button onClick={addCar}>Add Car</Button>
        </Flex>
      </Card>

      {/* Car List */}
      <Flex
        gap="md"
        wrap={isMobile ? "nowrap" : "wrap"}
        direction={isMobile ? "column" : "row"}
      >
        {carpools.map((car) => (
          <Card
            key={car.id}
            withBorder
            style={{
              flex: isMobile ? "0 0 100%" : "0 1 calc(33.333% - 16px)",
              minWidth: 300,
            }}
          >
            <Stack>
              <Group justify="space-between">
                <Text size="lg" fw={700}>
                  {car.name}
                </Text>
                <Group>
                  <Text>
                    Seats: {car.riders.length}/{car.seats}
                  </Text>
                  <Button
                    size="compact-xs"
                    color="red"
                    onClick={() => deleteCar(car.id)}
                  >
                    Delete Car
                  </Button>
                </Group>
              </Group>

              {/* Rider Name Input and Claim Seat */}
              <Group>
                <TextInput
                  style={{ flex: 1 }}
                  label="Your Name"
                  placeholder="Enter your name"
                  value={riderInputs[car.id] || ""}
                  onChange={(e) =>
                    handleRiderInputChange(car.id, e.currentTarget.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      claimSeat(car.id);
                    }
                  }}
                />
                <ActionIcon
                  variant="filled"
                  color="green"
                  size="lg"
                  onClick={() => claimSeat(car.id)}
                  disabled={
                    !riderInputs[car.id] || car.riders.length >= car.seats
                  }
                >
                  <MdCheck size={20} />
                </ActionIcon>
              </Group>

              {/* Riders List */}
              <Group>
                {car.riders.map((rider) => (
                  <Group key={rider} gap="xs" align="center">
                    <Text>{rider}</Text>
                    <ActionIcon
                      variant="light"
                      color="red"
                      size="xs"
                      onClick={() => leaveRide(car.id, rider)}
                    >
                      <MdClose size={12} />
                    </ActionIcon>
                  </Group>
                ))}
              </Group>
            </Stack>
          </Card>
        ))}
      </Flex>
    </Stack>
  );
}
