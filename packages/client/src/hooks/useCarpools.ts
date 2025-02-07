import { useState } from "react";
import { Carpool } from "../types";
import { useEventContext } from "../context/event-context";
import { useEventUpdate } from "../hooks/useEventUpdate";

/**
 * Custom hook for managing carpools in an event.
 * Manages the state of carpools, new car form inputs, rider inputs, and errors.
 * Provides functions for adding a car, deleting a car, claiming a seat, leaving a ride, and handling rider input changes.
 *
 * @returns An object containing the carpools state, new car form inputs, rider inputs, errors, and various functions for managing carpools.
 */
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

  /**
   * Validates the car form and returns a boolean indicating whether the form is valid or not.
   * @returns A boolean indicating whether the car form is valid or not.
   */
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

  /**
   * Adds a new car to the list of carpools.
   * If the car form is valid, a new car object is created and added to the carpools list.
   * The carpools state is updated with the new list of carpools, and the form fields are reset.
   * Finally, the handleEventUpdate function is called to update the event with the updated carpools.
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
   * Deletes a car from the list of carpools.
   * @param carName - The name of the car to delete.
   */
  const deleteCar = (carName: string) => {
    const updatedCarpools = carpools.filter((car) => car.name !== carName);
    setCarpools(updatedCarpools);
    handleEventUpdate({ eventId, eventType, carpools: updatedCarpools });
  };

  /**
   * Claims a seat in a carpool for a given car name.
   *
   * @param carName - The name of the car to claim a seat in.
   */
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

  /**
   * Removes a rider from a specific car's riders list and updates the carpools.
   * @param carName - The name of the car.
   * @param riderToRemove - The name of the rider to be removed.
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
   * @param value - The new value for the car rider input.
   */
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
