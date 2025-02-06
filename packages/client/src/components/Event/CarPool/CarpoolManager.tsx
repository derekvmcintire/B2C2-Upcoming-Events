import { Stack, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../../constants";
import SubTitle from "../../Shared/SubTitle";
import { useCarpools } from "../../../hooks/useCarpools";
import { CarpoolForm } from "./CarpoolForm";
import { CarpoolCard } from "./CarpoolCard";

export default function CarpoolManager() {
  const {
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
  } = useCarpools();

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  return (
    <Stack gap="md" style={{ width: "80%", margin: "0 auto" }}>
      <SubTitle text="Carpool" ta="center" />

      <CarpoolForm
        newCarName={newCarName}
        newCarSeats={newCarSeats}
        errors={errors}
        isUpdating={isUpdating}
        setNewCarName={setNewCarName}
        setNewCarSeats={setNewCarSeats}
        addCar={addCar}
      />

      <Flex
        gap="md"
        wrap={isMobile ? "nowrap" : "wrap"}
        direction={isMobile ? "column" : "row"}
      >
        {carpools.map((car) => (
          <CarpoolCard
            key={car.name}
            car={car}
            riderInput={riderInputs[car.name] || ""}
            isUpdating={isUpdating}
            onDeleteCar={() => deleteCar(car.name)}
            onClaimSeat={() => claimSeat(car.name)}
            onLeaveRide={(rider) => leaveRide(car.name, rider)}
            onRiderInputChange={(value) =>
              handleRiderInputChange(car.name, value)
            }
          />
        ))}
      </Flex>
    </Stack>
  );
}
