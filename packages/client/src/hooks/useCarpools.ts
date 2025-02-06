import { useState } from "react";
import { Carpool } from "../types";
import { useEventContext } from "../context/event-context";
import { useEventUpdate } from "../hooks/useEventUpdate";

export const useCarpools = () => {
  const { event } = useEventContext();
  const { handleEventUpdate, isUpdating } = useEventUpdate();
  const { carpools: initialCarpools = [], eventId, eventType } = event;

  const [carpools, setCarpools] = useState<Carpool[]>(initialCarpools);
  const [newCarName, setNewCarName] = useState("");
  const [newCarSeats, setNewCarSeats] = useState<number>(0);
  const [riderInputs, setRiderInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{
    carName?: string;
    carSeats?: string;
  }>({});

  const validateCarForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!newCarName.trim()) {
      newErrors.carName = "Car name is required";
    } else if (
      carpools.some(
        (car) => car.name.toLowerCase() === newCarName.toLowerCase(),
      )
    ) {
      newErrors.carName = "A car with this name already exists";
    }

    if (newCarSeats <= 0) {
      newErrors.carSeats = "Seats must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const deleteCar = (carName: string) => {
    const updatedCarpools = carpools.filter((car) => car.name !== carName);
    setCarpools(updatedCarpools);
    handleEventUpdate({ eventId, eventType, carpools: updatedCarpools });
  };

  const claimSeat = (carName: string) => {
    const riderName = riderInputs[carName]?.trim() || "";

    if (!riderName) return;

    const updatedCarpools = carpools.map((car) => {
      if (car.name === carName) {
        const isRiderAlreadyInAnyCar = carpools.some((c) =>
          c.riders.includes(riderName),
        );

        if (isRiderAlreadyInAnyCar) return car;

        if (car.riders.length >= car.seats) return car;

        return {
          ...car,
          riders: [...car.riders, riderName],
        };
      }
      return car;
    });

    setCarpools(updatedCarpools);
    handleEventUpdate({ eventId, eventType, carpools: updatedCarpools });

    setRiderInputs((prev) => ({ ...prev, [carName]: "" }));
  };

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

  const handleRiderInputChange = (carName: string, value: string) => {
    setRiderInputs((prev) => ({
      ...prev,
      [carName]: value,
    }));
  };

  return {
    carpools,
    newCarName,
    newCarSeats,
    riderInputs,
    errors,
    isUpdating,
    setNewCarName,
    setNewCarSeats,
    addCar,
    deleteCar,
    claimSeat,
    leaveRide,
    handleRiderInputChange,
  };
};
