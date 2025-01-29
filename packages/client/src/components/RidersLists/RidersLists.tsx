import { Container, SimpleGrid } from "@mantine/core";
import InterestedRidersList from "./InterestedRidersList";
import RegisteredRidersList from "./RegisteredRidersList";
import classes from "./riders-lists.module.css";

type RidersListsProps = {
  riders: string[];
  registeredNames?: string[];
  removeRider: (rider: string) => void;
};

export default function RidersLists({
  riders,
  removeRider,
  registeredNames,
}: RidersListsProps) {
  return (
    <Container w="100%" className={classes.listsContainer}>
    <SimpleGrid cols={{ base: 1, sm: 2 }} w="100%">
      <InterestedRidersList riders={riders} removeRider={removeRider} />
      <RegisteredRidersList registeredNames={registeredNames} />
    </SimpleGrid>
    </Container>
  );
}
