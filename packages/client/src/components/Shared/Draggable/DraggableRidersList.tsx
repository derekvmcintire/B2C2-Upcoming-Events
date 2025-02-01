import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Text, Box, Group } from '@mantine/core';
import classes from '../shared.module.css'

interface Rider {
  id: string;
  name: string;
}

interface RiderLists {
  interested: Rider[];
  committed: Rider[];
}

type ContainerId = keyof RiderLists;

interface DroppableContainerProps {
  id: ContainerId;
  items: Rider[];
  title: string;
  isOver?: boolean;
}

interface SortableRiderProps extends Rider {}

interface DraggableRiderProps {
  name: string;
}

const initialRiders: RiderLists = {
  interested: [
    { id: 'rider-1', name: 'John S.' },
    { id: 'rider-2', name: 'Emma W.' },
    { id: 'rider-3', name: 'Michael B.' },
  ],
  committed: [
    { id: 'rider-4', name: 'Sarah J.' },
    { id: 'rider-5', name: 'David L.' },
  ],
};

/**
 * A container component that allows items to be dropped into it.
 *
 * @component
 * @param {DroppableContainerProps} props - The component props.
 * @param {string} props.id - The unique identifier of the droppable container.
 * @param {Array<Item>} props.items - The items to be displayed in the droppable container.
 * @param {string} props.title - The title of the droppable container.
 * @returns {JSX.Element} The rendered droppable container component.
 */
const DroppableContainer = ({ id, items, title }: DroppableContainerProps): JSX.Element => {
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  return (
    <Box>
      <Text mb="xs">{title}</Text>
      <Paper 
        ref={setNodeRef}
        p="sm" 
        radius="md" 
        styles={() => ({
          root: {
            backgroundColor: isOver ? '#f8f9fa' : '#f1f3f5',
            minHeight: '200px',
            transition: 'background-color 0.2s',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }
        })}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map(rider => (
            <SortableRider key={rider.id} {...rider} />
          ))}
        </SortableContext>
        {items.length === 0 && (
          <Box 
            className={classes.draggableRidersBox}
          >
            Drop rider here
          </Box>
        )}
      </Paper>
    </Box>
  );
};

/**
 * SortableRider component represents a draggable rider item.
 *
 * @component
 * @param {SortableRiderProps} props - The props for the SortableRider component.
 * @param {string} props.id - The unique identifier of the rider.
 * @param {string} props.name - The name of the rider.
 * @returns {JSX.Element} The rendered SortableRider component.
 */
const SortableRider = ({ id, name }: SortableRiderProps): JSX.Element => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      shadow="xs"
      p="xs"
      withBorder
      styles={() => ({
        root: {
          cursor: 'grab',
          userSelect: 'none',
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: '#f8f9fa',
          },
          '&:active': {
            cursor: 'grabbing',
          }
        }
      })}
    >
      {name}
    </Paper>
  );
};

/**
 * DraggableRider component.
 *
 * @component
 * @param {DraggableRiderProps} props - The props for the DraggableRider component.
 * @param {string} props.name - The name of the rider.
 * @returns {JSX.Element} The rendered DraggableRider component.
 */
const DraggableRider= ({ name }: DraggableRiderProps): JSX.Element => {
  return (
    <Paper
      shadow="sm"
      p="xs"
      withBorder
      styles={() => ({
        root: {
          cursor: 'grabbing',
          userSelect: 'none',
          fontSize: '0.875rem',
        }
      })}
    >
      {name}
    </Paper>
  );
};

/**
 * DraggableRidersLists component represents a draggable list of riders.
 * It allows users to reorder and move riders between different lists.
 */
const DraggableRidersLists = (): JSX.Element => {
  const [riders, setRiders] = useState<RiderLists>(initialRiders);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overContainer, setOverContainer] = useState<ContainerId | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const container = event.over?.id as ContainerId;
    if (container && (container === 'interested' || container === 'committed')) {
      setOverContainer(container);
    }
  };

  const findContainer = (id: string): ContainerId => {
    if (riders.interested.find(item => item.id === id)) return 'interested';
    if (riders.committed.find(item => item.id === id)) return 'committed';
    return overContainer || 'interested';
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setOverContainer(null);
    const { active, over } = event;
    
    if (!active || !over) return;

    const sourceContainer = findContainer(active.id as string);
    const destinationContainer = (over.id === 'interested' || over.id === 'committed') 
      ? over.id 
      : findContainer(over.id as string);

    if (sourceContainer === destinationContainer) {
      // Handle reordering within the same list
      const items = [...riders[sourceContainer]];
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      if (newIndex !== -1) {
        setRiders({
          ...riders,
          [sourceContainer]: arrayMove(items, oldIndex, newIndex),
        });
      }
    } else {
      // Handle moving between lists
      const sourceItems = [...riders[sourceContainer]];
      const destinationItems = [...riders[destinationContainer]];
      const movedItem = sourceItems.find(item => item.id === active.id);
      
      if (movedItem) {
        setRiders({
          ...riders,
          [sourceContainer]: sourceItems.filter(item => item.id !== active.id),
          [destinationContainer]: [...destinationItems, movedItem],
        });
      }
    }
  };

  const activeRider = activeId ? 
    [...riders.interested, ...riders.committed].find(rider => rider.id === activeId) 
    : null;

  return (
    <Box p="sm">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Group align="stretch" grow>
          <DroppableContainer
            id="interested"
            items={riders.interested}
            title="Interested"
          />
          <DroppableContainer
            id="committed"
            items={riders.committed}
            title="Committed"
          />
        </Group>

        <DragOverlay dropAnimation={null}>
          {activeId && activeRider ? (
            <DraggableRider name={activeRider.name} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default DraggableRidersLists;