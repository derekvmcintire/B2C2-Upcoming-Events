import React, { useMemo, useState } from 'react';
import { Table, Collapse, Card, Text, Button, Pill, Progress, Flex } from '@mantine/core';
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { EventType } from '../../types';
import EventCard from '../EventCard';
import { formatEventDate } from '../../utils/dates';
import { getEntriesByEventId } from '../../utils/findRegisteredRiders';
import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_BREAK_POINT } from '../../constants';
import { getHypeColor } from '../EventCard/utility';

const ExpandableTable = ({events, registrations, requestDataCallback}: {events: EventType[], registrations: any, requestDataCallback: any}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const eventIds = useMemo(() => {
    return events.map(event => event.eventId)
  }, events)

  const toggleRow = (id: any) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const rows = events.map((row) => {
    const { date } = row;
  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [weekday, dateString, year] = formattedDate.split(", ");

  const registeredNames = registrations
  ? getEntriesByEventId(registrations, Number(row.eventId))
  : [];

  const interestedRiders = row.interestedRiders?.length || 0;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const location = isMobile ? row.state : `${row.city}, ${row.state}`;

const hypeLevel =
  registeredNames.length + interestedRiders;

    return (
    <React.Fragment key={row.eventId} >
      <Table.Tr 
        style={{ cursor: 'pointer' }}
        onClick={() => toggleRow(row.eventId)}
      >
        <Table.Td ta="left">
          {expandedRows.has(row.eventId) ? 
            <FaChevronDown size={16} /> : 
            <FaChevronRight size={16} />
          }
        </Table.Td>
        <Table.Td ta="left" fw="600">{dateString}</Table.Td>
        <Table.Td ta="left">{row.name}</Table.Td>
        <Table.Td ta="left">{location}</Table.Td>
        <Table.Td ta="left">
          {hypeLevel}
          <Progress
        radius="xs"
        size="md"
        value={hypeLevel * 10}
        color={getHypeColor(hypeLevel)}
      />
          </Table.Td>

      </Table.Tr>
      <Table.Tr >
        <Table.Td colSpan={5} p={0} >
          <Collapse in={expandedRows.has(row.eventId)} >
          <EventCard
              key={row.eventId}
              event={row}
              registrations={registrations}
              requestDataCallback={requestDataCallback}
            />
          </Collapse>
        </Table.Td>
      </Table.Tr>
    </React.Fragment>
  )});

  return (
    <Card p="md">
      {!expandedRows.size ? (<Button variant="subtle" onClick={() => setExpandedRows(new Set(eventIds))}>Expand All</Button>) : (<Button variant="subtle" onClick={() => setExpandedRows(new Set())}>Collapse All</Button>)}
      
      
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Hype Level</Table.Th>

          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default ExpandableTable;