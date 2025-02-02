import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { RACE_CONFIG, RiderLists, SPECIAL_EVENT_CONFIG } from "./types";
import { RiderListsContainer } from "./RiderListsContainer";
import DraggableRider from "./DraggableRider";
import { useEventContext } from "../../../context/event-context";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useRiderLists } from "./hooks/useRiderLists";

interface DraggableRidersListsProps {
  isStatic?: boolean;
  eventListType: "race" | "special";
  registrations: string[];
}

const DraggableRidersLists = ({
  isStatic = false,
  eventListType,
  registrations = [],
}: DraggableRidersListsProps): JSX.Element => {
  const { event } = useEventContext();
  const {
    eventId,
    eventType,
    interestedRiders = [],
    committedRiders = [],
  } = event;

  const mappedInterestedRiders = interestedRiders.map((name) => ({
    id: name,
    name,
  }));
  const mappedCommittedRiders = committedRiders.map((name) => ({
    id: name,
    name,
  }));
  const mappedRegistrations = registrations.map((name) => ({ id: name, name }));

  const initialRiders: RiderLists = {
    interested: mappedInterestedRiders,
    committed: mappedCommittedRiders,
    registered: mappedRegistrations,
  };

  const config = eventListType === "race" ? RACE_CONFIG : SPECIAL_EVENT_CONFIG;
  const validContainers = [config.primaryList.id, config.secondaryList.id];

  const {
    riders,
    setRiders,
    handleRemoveInterestedRider,
    getMoveRiderUpdateData,
    handleSubmitEventUpdate,
  } = useRiderLists({
    eventId,
    eventType,
    initialRiders,
    interestedRiders,
    committedRiders,
  });

  const { activeId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragAndDrop({
      validContainers,
      riders,
      setRiders,
      onMoveRider: (sourceList, targetList, name) => {
        const updateData = getMoveRiderUpdateData(sourceList, targetList, name);
        handleSubmitEventUpdate(updateData);
      },
    });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const removeCommitted = (name: string) => {
    console.log("remove committed:", name);
  };

  const removeFns = {
    primary:
      config.primaryList.id === "committed"
        ? removeCommitted
        : handleRemoveInterestedRider,
    secondary:
      config.secondaryList.id === "committed"
        ? removeCommitted
        : handleRemoveInterestedRider,
  };

  const activeRider = activeId
    ? Object.values(riders)
        .flat()
        .find((rider) => rider.id === activeId)
    : null;

  if (isStatic) {
    return (
      <RiderListsContainer
        config={config}
        riders={riders}
        draggable={false}
        removeFns={removeFns}
      />
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <RiderListsContainer
        config={config}
        riders={riders}
        draggable={true}
        removeFns={removeFns}
      />

      <DragOverlay dropAnimation={null}>
        {activeId && activeRider ? (
          <DraggableRider name={activeRider.name} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DraggableRidersLists;
