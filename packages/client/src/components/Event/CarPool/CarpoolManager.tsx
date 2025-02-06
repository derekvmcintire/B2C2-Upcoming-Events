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
  Divider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MdClose, MdArrowForward } from "react-icons/md";
import { MOBILE_BREAK_POINT } from "../../../constants";
import SubTitle from "../../Shared/SubTitle";
import DismissButton from "../../Shared/DismissButton";
import { useEventContext } from "../../../context/event-context";
import { Carpool } from "../../../types";
import { useEventUpdate } from "../../../hooks/useEventUpdate";

/**
 * CarpoolManager component handles the management of carpools for an event.
 * It allows users to add, delete, and modify carpools, as well as claim and leave seats in the carpools.
 */
export default function CarpoolManager() {
  const { event } = useEventContext();
  const { carpools: initialCarpools = [], eventId, eventType } = event;

  const { handleEventUpdate, isUpdating } = useEventUpdate();

  const [carpools, setCarpools] = useState<Carpool[]>(initialCarpools);
  const [newCarName, setNewCarName] = useState("");
  const [newCarSeats, setNewCarSeats] = useState<number>(0);
  const [riderInputs, setRiderInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{
    carName?: string;
    carSeats?: string;
  }>({});

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  /**
   * Validates the car form and returns a boolean indicating whether the form is valid.
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validateCarForm = (): boolean => {
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

  /**
   * Adds a new car to the carpool list if the car form is valid.
   */
  const addCar = () => {
    if (validateCarForm()) {
      const newCar: Carpool = {
        name: newCarName.trim(),
        seats: newCarSeats,
        riders: [],
      };

      const updatedCarpools = [...carpools, newCar];

      setCarpools(updatedCarpools);
      setNewCarName("");
      setNewCarSeats(0);
      setErrors({});

      handleEventUpdate({ eventId, eventType, carpools: updatedCarpools });
    }
  };

  /**
   * Deletes a car from the carpools list and updates the event.
   * @param carName - The name of the car to be deleted.
   */
  const deleteCar = (carName: string) => {
    const updatedCarpools = carpools.filter((car) => car.name !== carName);
    setCarpools(updatedCarpools);
    handleEventUpdate({ eventId, eventType, carpools: updatedCarpools });
  };

  /**
   * Claims a seat in a car for a rider.
   *
   * @param carName - The name of the car.
   */
  const claimSeat = (carName: string) => {
    const riderName = riderInputs[carName]?.trim() || "";

    if (!riderName) {
      return;
    }

    const updatedCarpools = carpools.map((car) => {
      if (car.name === carName) {
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
    });

    setCarpools(updatedCarpools);
    handleEventUpdate({ eventId, eventType, carpools: updatedCarpools });

    // Clear the rider input for this car
    setRiderInputs((prev) => ({ ...prev, [carName]: "" }));
  };

  /**
   * Removes a rider from a carpool.
   * @param carName - The name of the carpool.
   * @param riderToRemove - The name of the rider to remove.
   */
  const leaveRide = (carName: string, riderToRemove: string) => {
    const updatedCarpools = carpools.map((car) =>
      car.name === carName
        ? {
            ...car,
            riders: car.riders.filter((rider) => rider !== riderToRemove),
          }
        : car,
    );

    setCarpools(updatedCarpools);
    handleEventUpdate({ eventId, eventType, carpools: updatedCarpools });
  };

  /**
   * Handles the input change for a specific car rider.
   * @param carName - The name of the car.
   * @param value - The new value for the input.
   */
  const handleRiderInputChange = (carName: string, value: string) => {
    setRiderInputs((prev) => ({
      ...prev,
      [carName]: value,
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

      {/* Car List */}
      <Flex
        gap="md"
        wrap={isMobile ? "nowrap" : "wrap"}
        direction={isMobile ? "column" : "row"}
      >
        {carpools.map((car) => {
          const isCarFull = car.riders.length >= car.seats;
          return (
            <Card
              key={car.name}
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
                      clickHandler={() => deleteCar(car.name)}
                      disabled={isUpdating}
                    />
                    <Text size="lg" fw={700}>
                      {car.name}
                    </Text>
                  </Flex>
                  <Divider />
                  <Text ta="left">
                    Seats: {car.riders.length}/{car.seats}
                  </Text>
                </Group>

                {/* Rider Name Input and Claim Seat */}
                <Group>
                  {!isCarFull ? (
                    <>
                      <TextInput
                        style={{ flex: 1, maxWidth: "150px" }}
                        placeholder="Enter your name"
                        value={riderInputs[car.name] || ""}
                        onChange={(e) =>
                          handleRiderInputChange(
                            car.name,
                            e.currentTarget.value,
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            claimSeat(car.name);
                          }
                        }}
                        disabled={isCarFull || isUpdating}
                      />
                      <ActionIcon
                        variant="filled"
                        size="md"
                        onClick={() => claimSeat(car.name)}
                        disabled={
                          !riderInputs[car.name] || isCarFull || isUpdating
                        }
                      >
                        <MdArrowForward />
                      </ActionIcon>
                    </>
                  ) : (
                    <Text w="100%" fw={600}>
                      Car Full
                    </Text>
                  )}
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
                        onClick={() => leaveRide(car.name, rider)}
                        disabled={isUpdating}
                      >
                        <MdClose size={12} />
                      </ActionIcon>
                    </Group>
                  ))}
                </Group>
              </Stack>
            </Card>
          );
        })}
      </Flex>
    </Stack>
  );
}
